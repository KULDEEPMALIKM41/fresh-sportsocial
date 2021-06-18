import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import AuthNavigator from '../auth/AuthNavigator';

export default function MainNavigator({navigation}) {
  const [auth, setAuth] = useState(false);
  const checkAuth = async () => {
    let value = await AsyncStorage.getItem('userData')
    if (value){
      setAuth(true);
    }else{
      setAuth(false);
    }
  }

  useEffect(() => {
    checkAuth();
  });
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        auth={auth}
      />
      {auth ? null : 
      <Drawer.Screen
      name="Login"
      component={AuthNavigator}
    />}
    </Drawer.Navigator>
  );
}
