import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import images from '../../res/images';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

StatusBar.setBarStyle('light-content');

export default function AuthNavigator({navigation}) {
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
          title:'',
          headerTransparent: false,
          headerStyle: {
              backgroundColor: '#5365A2'
            },
          headerLeft: () => (
            <TouchableOpacity style={styles.authBackButton} onPress={()=> navigation.goBack()}>
                <Image onPress={()=> navigation.goBack()} source={images.backButton}  style={{width:12, height:12}} />
            </TouchableOpacity>
          ), 
          headerRight: () => (
            <TouchableOpacity style={{right:25}}>
                <Image onPress={()=> navigation.goBack()} source={images.appIcon}  style={{width:30, height:30}} />
            </TouchableOpacity>
          ), 
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

styles = StyleSheet.create({
  authBackButton:{
    backgroundColor:'rgba(1,41,50, 0.5)',
    padding:6,
    borderRadius:15,
    height:25,
    width:25,
    marginStart:10
  },
})