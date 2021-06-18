import AppNavigator from './src/AppNavigator';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import { SafeAreaProvider } from 'react-native-safe-area-context';



function App() {
  return (
  //<SafeAreaProvider>
    <NavigationContainer>{<AppNavigator />}</NavigationContainer>
  //</SafeAreaProvider>
  );
}

export default App;
