import 'react-native-gesture-handler'; // Deve ser o primeiro import obrigatoriamente
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native'; // Componente para controle da barra de status do dispositivo
import AppNavigator from './src/navigation/AppNavigator';
import { supabase } from './src/services/supabase/client';
import { AuthProvider } from './src/contexts/AuthContext';
import { MonitoringProvider } from './src/contexts/MonitoringContext';
import { RelationshipProvider } from './src/contexts/RelationshipContext';
import { enableScreens } from 'react-native-screens';

// Ativa otimização de telas nativas para melhor performance de navegação
// Deve ser chamado antes de qualquer componente de navegação
enableScreens();

export default function App() {
  useEffect(() => {
    // Verifica se o cliente Supabase foi inicializado corretamente com as credenciais
    // É executado apenas na montagem inicial do componente
    if (supabase) {
      supabase.auth.getSession()
        .then((result) => console.log('Sessão Supabase:', result))
        .catch((err) => console.error('Erro ao conectar ao Supabase:', err));
    } else {
      console.log('Cliente Supabase não configurado.');
    }
  }, []);

  return (
    // Providers são aninhados para compartilhar estado global em toda a aplicação
    // AuthProvider: gerencia informações de autenticação e perfil de usuário
    <AuthProvider>
      {/* RelationshipProvider: gerencia vínculos entre cuidadores e pessoas assistidas */}
      <RelationshipProvider>
        {/* MonitoringProvider: gerencia dados de localização e zonas seguras */}
        <MonitoringProvider>
          <StatusBar barStyle="default" />
          {/* AppNavigator: componente principal de navegação baseado no perfil do usuário */}
          <AppNavigator />
        </MonitoringProvider>
      </RelationshipProvider>
    </AuthProvider>
  );
}
