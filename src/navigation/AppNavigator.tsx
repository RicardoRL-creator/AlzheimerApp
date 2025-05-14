// Arquivo de navegação principal: define as rotas do aplicativo conforme o perfil do usuário autenticado
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Caregiver/HomeScreen';
import PatientHomeScreen from '../screens/Patient/PatientHomeScreen';
import SafeZoneScreen from '../screens/Patient/SafeZoneScreen';
import RouteHistoryScreen from '../screens/Patient/RouteHistoryScreen';
import RelationshipScreen from '../screens/Patient/RelationshipScreen';
import RequestLinkScreen from '../screens/Caregiver/RequestLinkScreen';
import CareRelationshipsScreen from '../screens/Caregiver/CareRelationshipsScreen';

// Definição dos tipos de parâmetros para as rotas do aplicativo
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  PatientHome: undefined;
  SafeZone: undefined;
  RouteHistory: undefined;
  Relationship: undefined;
  Request: undefined;
  Relationships: undefined;
};

// Criação do navegador de pilha (Stack) para transição entre telas
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  // Obtém o perfil atual do usuário do contexto de autenticação
  const { role } = useAuth();

  // Redireciona para a tela inicial adequada conforme o perfil do usuário
  return (
    <NavigationContainer>
      <Stack.Navigator
        // Define a tela inicial baseada no perfil: Home para cuidador, PatientHome para pessoa assistida
        initialRouteName={role === 'pessoa_assistida' ? 'PatientHome' : 'Home'}
        screenOptions={{ headerShown: true }}
      >
        {/* Tela de login (não utilizada no fluxo atual mas mantida para referência) */}
        <Stack.Screen name="Login" component={LoginScreen} />
        
        {/* Telas para perfil de Cuidador */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Request" component={RequestLinkScreen} />
        <Stack.Screen name="Relationships" component={CareRelationshipsScreen} />
        
        {/* Telas para perfil de Pessoa Assistida */}
        <Stack.Screen name="PatientHome" component={PatientHomeScreen} />
        <Stack.Screen name="SafeZone" component={SafeZoneScreen} />
        <Stack.Screen name="RouteHistory" component={RouteHistoryScreen} />
        <Stack.Screen name="Relationship" component={RelationshipScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
