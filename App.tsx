import 'react-native-gesture-handler'; // Deve ser o primeiro import
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native'; // Removido View, Text, StyleSheet pois serão gerenciados pelo AppNavigator
import AppNavigator from './src/navigation/AppNavigator';
import { supabase } from './src/services/supabase/client';
// import { AuthProvider } from './src/contexts/AuthContext'; // Descomente se for usar AuthContext

export default function App() {
  useEffect(() => {
    supabase.auth.getSession()
      .then((result) => {
        console.log('Supabase session:', result);
      })
      .catch((err) => {
        console.error('Erro ao conectar ao Supabase:', err);
      });
  }, []);

  return (
    // <AuthProvider> // Descomente se for usar AuthContext
    <>
      <StatusBar barStyle="default" />
      <AppNavigator />
    </>
    // </AuthProvider> // Descomente se for usar AuthContext
  );
}

// Não precisamos mais de styles aqui, pois o conteúdo principal virá do AppNavigator
