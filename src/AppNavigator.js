import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import WelcomeScreen from './containers/welcome/WelcomeScreen'

StatusBar.setBarStyle('light-content');

export default function AppNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          headerTransparent: true,
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}