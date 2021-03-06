import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyBetsScreen from './MyBetsScreen';
import colors from '../../../res/colors';
import {Text} from 'react-native';

export default function MyBetsNavigator({navigation}) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      // Prevent default behavior
      // e.preventDefault();
      // navigation.toggleDrawer();
      // navigation.goBack()
      console.log(e)
  });
  
    return unsubscribe;
  }, [navigation]);
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyBets"
        component={MyBetsScreen}
      />
    </Stack.Navigator>
  );
}
