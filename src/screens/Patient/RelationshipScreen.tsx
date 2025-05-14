import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useRelationship } from '../../contexts/RelationshipContext';
import { useAuth } from '../../contexts/AuthContext';

const RelationshipScreen = () => {
  const { relationships, approveLink, rejectLink } = useRelationship();
  const { user, switchRole } = useAuth();

  const pending = relationships.filter(
    (r) => r.assistedId === user?.id && r.status === 'pending'
  );
  const approved = relationships.filter(
    (r) => r.assistedId === user?.id && r.status === 'approved'
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitações Pendentes</Text>
      <FlatList
        data={pending}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>Nenhuma solicitação pendente.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Cuidado solicitado por: {item.caregiverId}</Text>
            <View style={styles.buttons}>
              <Button title="Aprovar" onPress={() => approveLink(item.id)} />
              <Button title="Rejeitar" onPress={() => rejectLink(item.id)} />
            </View>
          </View>
        )}
      />
      <Text style={styles.title}>Cuidadores Vinculados</Text>
      <FlatList
        data={approved}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>Sem cuidadores vinculados.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>ID Cuidador: {item.caregiverId}</Text>
          </View>
        )}
      />
      <Button title="Voltar" onPress={() => switchRole('cuidador')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
  item: { marginBottom: 12 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', width: 200, marginTop: 4 },
});

export default RelationshipScreen;
