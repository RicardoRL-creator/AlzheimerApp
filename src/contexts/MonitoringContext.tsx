import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as Location from 'expo-location';
import { SafeZone, RouteRecord } from '../types';

interface MonitoringContextType {
  // Lista de zonas seguras onde não há monitoramento
  safeZones: SafeZone[];
  // Registros de rota coletados fora das zonas seguras
  routeRecords: RouteRecord[];
  // Estado do monitoramento (ativo/inativo)
  isMonitoring: boolean;
  // Inicia o monitoramento de localização
  startMonitoring: () => void;
  // Interrompe o monitoramento
  stopMonitoring: () => void;
  // Adiciona uma zona segura
  addSafeZone: (zone: SafeZone) => void;
  // Remove uma zona segura pelo ID
  removeSafeZone: (id: string) => void;
}

// Contexto para compartilhar funções de monitoramento entre componentes
const MonitoringContext = createContext<MonitoringContextType | undefined>(undefined);

// Provider para gerenciamento de zonas seguras e histórico de localização
export const MonitoringProvider = ({ children }: { children: ReactNode }) => {
  // Estado para armazenar zonas seguras definidas pelo usuário
  const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  // Estado para armazenar registros de localização fora das zonas seguras
  const [routeRecords, setRouteRecords] = useState<RouteRecord[]>([]);
  // Estado que indica se o monitoramento está ativo
  const [isMonitoring, setIsMonitoring] = useState(false);
  // Referência à inscrição atual de monitoramento de localização
  const [subscription, setSubscription] = useState<Location.LocationSubscription | null>(null);

  // Adiciona uma nova zona segura à lista
  const addSafeZone = (zone: SafeZone) => {
    setSafeZones((prev) => [...prev, zone]);
  };

  // Remove uma zona segura específica pelo seu ID
  const removeSafeZone = (id: string) => {
    setSafeZones((prev) => prev.filter((z) => z.id !== id));
  };

  // Inicia o monitoramento de localização em tempo real
  // Registra a posição a cada 60 segundos quando fora das zonas seguras
  const startMonitoring = async () => {
    if (isMonitoring) return;
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;
    const sub = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 60000, distanceInterval: 0 },
      (loc: Location.LocationObject) => {
        const record: RouteRecord = {
          id: String(Date.now()),
          timestamp: Date.now(),
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
        setRouteRecords((prev) => [...prev, record]);
      }
    );
    setSubscription(sub);
    setIsMonitoring(true);
  };

  // Encerra o monitoramento de localização e cancela a inscrição
  const stopMonitoring = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
    setIsMonitoring(false);
  };

  return (
    <MonitoringContext.Provider value={{ safeZones, routeRecords, isMonitoring, startMonitoring, stopMonitoring, addSafeZone, removeSafeZone }}>
      {children}
    </MonitoringContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de monitoramento
export const useMonitoring = () => {
  const context = useContext(MonitoringContext);
  if (!context) throw new Error('useMonitoring deve ser usado dentro de MonitoringProvider');
  return context;
};
