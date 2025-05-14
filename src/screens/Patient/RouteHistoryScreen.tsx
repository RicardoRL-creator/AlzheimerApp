import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useMonitoring } from '../../contexts/MonitoringContext';

const RouteHistoryScreen = () => {
  const { routeRecords } = useMonitoring();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Localização</Text>
      <FlatList
        data={routeRecords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text>{new Date(item.timestamp).toLocaleString()}</Text>
            <Text>{`${item.latitude.toFixed(6)}, ${item.longitude.toFixed(6)}`}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum registro disponível.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recordItem: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
  },
});

export default RouteHistoryScreen;
