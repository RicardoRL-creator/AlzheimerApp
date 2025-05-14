import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRelationship } from '../../contexts/RelationshipContext';

const RequestLinkScreen = () => {
  const [assistedId, setAssistedId] = useState('');
  const { requestLink } = useRelationship();

  const handleRequest = () => {
    if (assistedId.trim()) {
      requestLink(assistedId.trim());
      setAssistedId('');
      alert('Solicitação enviada.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitar Vínculo</Text>
      <TextInput
        style={styles.input}
        placeholder="ID da Pessoa Assistida"
        value={assistedId}
        onChangeText={setAssistedId}
        autoCapitalize="none"
      />
      <Button title="Enviar Solicitação" onPress={handleRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default RequestLinkScreen;
