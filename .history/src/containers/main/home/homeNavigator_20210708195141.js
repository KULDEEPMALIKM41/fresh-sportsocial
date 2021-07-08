import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import homeScreen from './homeScreen';
import PostCamera from './PostCamera/PostCamera';
import CommentScreen from './Comments/CommentScreen';
import LoadingScreen from './Loading/LoadingScreen';
import AddPostScreen from './AddPost/AddPostScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Text,
  Platform
} from 'react-native';
import palette from '../../../res/palette';
import images from '../../../res/images';
import colors from '../../../res/colors';

export default function ({navigation}) {
  const [Auth, setAuth] = useState(false);
  const androidStatusBar = 0;
  const iosStatusBar = StatusBar.currentHeight + 50;
   
  React.useEffect(() => {
    checkAuth();
    const unsubscribe = navigation.addListener('focus', (e) => {
      checkAuth();
  });
  
    return unsubscribe;
  }, [navigation]);

  const checkAuth = async () => {
    let value = await AsyncStorage.getItem('userData');
    if (value){
      setAuth(true);
    }else{
      setAuth(false);
    }
  }

  const Logout = async () => {
    await AsyncStorage.removeItem('userData')
    await checkAuth()
    navigation.toggleDrawer();
    navigation.toggleDrawer();
    navigation.navigate('Loading');
    // setTimeout(() => {navigation.goBack()}, 1000)
  }
  
  const Stack = createStackNavigator();
  StatusBar.setBarStyle('light-content');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={homeScreen}
        options={({navigation}) => ({
          headerStatusBarHeight: Platform.OS === 'android' ? androidStatusBar : iosStatusBar,
          headerStyle: {
            backgroundColor: colors.bottomBackGround,
            shadowColor: colors.seperatorLineColor,
            //marginTop:100,
          },
          headerLeft: () => (
            <View onPress={() => navigation.navigate('PostCamera')}>
              <TouchableOpacity
                style={Styles.headerLeftContainer}
                onPress={() => navigation.navigate('PostCamera')}>
                <Image
                  onPress={() => navigation.navigate('PostCamera')}
                  source={images.add}
                  style={Styles.headerLeftImage}
                />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <>
              { Auth ?
              <TouchableOpacity
              style={Styles.headerRightContainer}
              onPress={() => Logout()}>
              <Image
              onPress={() => Logout()}
              source={images.logout}
              style={Styles.headerRightImage}
            />
            <Text onPress={() => Logout()} style={{color:'white', fontSize:10, marginBottom:-3}}> Logout</Text>
            </TouchableOpacity>
             :
            <TouchableOpacity
            style={Styles.headerRightContainer}
            onPress={() => navigation.navigate('Login')}>
            <Image
              onPress={() => navigation.navigate('Login')}
              source={images.login}
              style={Styles.headerRightImage}
            />
            <Text onPress={() => navigation.navigate('Login')} style={{color:'white', fontSize:10}}> Login</Text>
          </TouchableOpacity>
          }
            </>
          ),
          headerTitle: (
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color:'white', fontSize:21, fontWeight:"600"}}> Sports Social </Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: {alignSelf: 'center'},
        })}
      />
      <Stack.Screen
        name="Comments"
        component={CommentScreen}
        options={{
          headerStatusBarHeight: Platform.OS === 'android' ? androidStatusBar : iosStatusBar,
          gestureDirection: 'horizontal-inverted',
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:'black',
          },
          headerTitle: (
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color:'white', fontSize:21, fontWeight:"600"}}> Comments </Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: {alignSelf: 'center'},
        }} 
        />
      <Stack.Screen
        name="PostCamera"
        component={PostCamera}
        options={{
          headerTintColor: '#fff',
          headerStatusBarHeight: Platform.OS === 'android' ? androidStatusBar : iosStatusBar, 
          gestureDirection: 'horizontal-inverted'
        }}
      />
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{
          title:'',
          headerTransparent: true,
        }} 
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        />
    </Stack.Navigator>
  );
}

const Styles = StyleSheet.create({
  headerLeftContainer: palette.header.headerLeftContainer,
  headerLeftImage: palette.header.headerLeftImage,
  headerRightContainer: palette.header.headerRightContainer,
  headerRightImage: palette.header.headerRightImage,
});
