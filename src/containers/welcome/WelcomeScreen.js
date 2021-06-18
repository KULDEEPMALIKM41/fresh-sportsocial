import {
    View,
    StyleSheet,
    Image,
  } from 'react-native';
import React from 'react';
import images from '../../res/images';
import DrawerNavigator from '../main/DrawerNavigator';  
export default function WelcomeScreen({navigation}) {
  const [switcher, setSwitcher] = React.useState(false);
  setTimeout(async () => {
    setSwitcher(true);
  }, 2000);
  return switcher ?
    <DrawerNavigator navigation={navigation}/> :
  (
    <View style={Styles.container}>
      <View style={Styles.logoContainer}>
      <Image source={images.app_logo} style={{height: 75, width:325}} />
      </View>
    </View>
  );
}
  
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  }
});