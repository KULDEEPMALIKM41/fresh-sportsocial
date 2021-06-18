import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

StatusBar.setBarStyle('light-content');

export default function AuthNavigator() {
  const androidStatusBar = 0;
  const iosStatusBar = StatusBar.currentHeight + 50;

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerStatusBarHeight: Platform.OS === 'android' ? androidStatusBar : iosStatusBar,
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          headerTransparent: true,
          title: '',
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerStatusBarHeight: Platform.OS === 'android' ? androidStatusBar : iosStatusBar,
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          title: '',
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerStatusBarHeight: Platform.OS === 'android' ? androidStatusBar : iosStatusBar,
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#fff',
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}
