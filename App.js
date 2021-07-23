import AppNavigator from './src/AppNavigator';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
//import { SafeAreaProvider } from 'react-native-safe-area-context';



function App() {
  return (
  //<SafeAreaProvider>
  <MenuProvider>
    <NavigationContainer>{<AppNavigator />}</NavigationContainer>
  </MenuProvider>
  //</SafeAreaProvider>
  );
}

export default App;
