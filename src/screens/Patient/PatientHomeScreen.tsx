import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const PatientHomeScreen = () => {
  const { user, switchRole, role } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pessoa Assistida - Home</Text>
      <Text>Usuário atual: {user?.nome} ({role})</Text>
      <Button title="Entrar como Cuidador" onPress={() => switchRole('cuidador')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default PatientHomeScreen;
