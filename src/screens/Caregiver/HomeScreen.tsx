import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../contexts/AuthContext';

// Exemplo de tela Home para o Cuidador
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user, switchRole, role } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caregiver Home Screen</Text>
      <Text>Usuário atual: {user?.nome} ({role})</Text>
      <Button title="Entrar como Pessoa Assistida" onPress={() => switchRole('pessoa_assistida')} />
      <Button title="Solicitar vínculo" onPress={() => navigation.navigate('Request')} />
      <Button title="Ver Pessoas Assistidas" onPress={() => navigation.navigate('Relationships')} />
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

export default HomeScreen;
