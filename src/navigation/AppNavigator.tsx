import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe suas telas placeholder aqui
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Caregiver/HomeScreen';

// Defina os tipos para os parâmetros de rota
export type RootStackParamList = {
  Login: undefined; // A tela de Login não recebe parâmetros
  Home: undefined;  // A tela Home não recebe parâmetros
  // Adicione outras telas e seus parâmetros aqui
  // Exemplo: Profile: { userId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" // Define a tela inicial
        screenOptions={{
          headerShown: false, // Opcional: esconde o header padrão para um visual mais limpo
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Adicione outras Stack.Screen para mais telas aqui conforme for desenvolvendo */}
        {/* 
          Exemplos de outras telas que você pode adicionar:
          <Stack.Screen name="PatientDashboard" component={PatientDashboardScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="GeofenceSettings" component={GeofenceSettingsScreen} />
          <Stack.Screen name="EmergencyContacts" component={EmergencyContactsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} /> 
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
