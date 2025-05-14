// ponto de entrada do aplicativo Expo e React Native
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent garante que o app seja registrado corretamente, seja via Expo ou compilação nativa
registerRootComponent(App);
