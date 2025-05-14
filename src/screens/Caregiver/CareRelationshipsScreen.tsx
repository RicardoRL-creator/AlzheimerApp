import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRelationship } from '../../contexts/RelationshipContext';
import { useAuth } from '../../contexts/AuthContext';

const CareRelationshipsScreen = () => {
  const { user } = useAuth();
  const { relationships } = useRelationship();
  const approved = relationships.filter(
    (r) => r.caregiverId === user?.id && r.status === 'approved'
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pessoas Assistidas Vinculadas</Text>
      <FlatList
        data={approved}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>Sem pessoas assistidas vinculadas.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>ID: {item.assistedId}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  item: { marginBottom: 8 },
});

export default CareRelationshipsScreen;
