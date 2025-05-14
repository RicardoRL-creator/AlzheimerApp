import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList, Dimensions } from 'react-native';
import MapView, { Circle, Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { useMonitoring } from '../../contexts/MonitoringContext';
import { SafeZone } from '../../types';

// SafeZoneScreen exibe um mapa para definição de zonas seguras de monitoramento
// Permite adicionar, visualizar e remover zonas seguras
const SafeZoneScreen = () => {
  const { safeZones, addSafeZone, removeSafeZone } = useMonitoring();

  // Estados para coordenadas e raio da nova zona segura
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [radius, setRadius] = useState('');
  const [region, setRegion] = useState<Region | null>(null);

  // Solicita permissão de localização e define região inicial do mapa
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // Atualiza campos de latitude e longitude ao tocar no mapa
  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLat(latitude.toString());
    setLon(longitude.toString());
  };

  // Cria e adiciona uma nova zona segura com os valores fornecidos
  const handleAdd = () => {
    const zone: SafeZone = {
      id: String(Date.now()),
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      radius: parseInt(radius, 10),
    };
    addSafeZone(zone);
    setLat('');
    setLon('');
    setRadius('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zonas Seguras</Text>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          onPress={handleMapPress}
        >
          {safeZones.map((zone) => (
            // Desenha círculo representando zona segura
            <Circle
              key={zone.id}
              center={{ latitude: zone.latitude, longitude: zone.longitude }}
              radius={zone.radius}
              fillColor="rgba(0,128,0,0.3)"
              strokeColor="rgba(0,128,0,0.8)"
            />
          ))}
          {lat && lon && (
            // Exibe marcador na posição selecionada antes de adicionar
            <Marker coordinate={{ latitude: parseFloat(lat), longitude: parseFloat(lon) }} />
          )}
        </MapView>
      )}

      {/* Lista de zonas seguras existentes com opção de remoção */}
      <FlatList
        data={safeZones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.zoneItem}>
            <Text>{`${item.latitude.toFixed(6)}, ${item.longitude.toFixed(6)} - ${item.radius}m`}</Text>
            <Button title="Remover" onPress={() => removeSafeZone(item.id)} />
          </View>
        )}
      />

      {/* Campos para adicionar nova zona segura */}
      <Text style={styles.subtitle}>Adicionar Zona</Text>
      <TextInput
        placeholder="Latitude"
        value={lat}
        onChangeText={setLat}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Longitude"
        value={lon}
        onChangeText={setLon}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Raio (m)"
        value={radius}
        onChangeText={setRadius}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Adicionar Zona" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  map: { width: Dimensions.get('window').width - 32, height: 200, marginBottom: 16 },
  subtitle: { fontSize: 18, marginTop: 16, marginBottom: 8 },
  zoneItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 4 },
});

export default SafeZoneScreen;
