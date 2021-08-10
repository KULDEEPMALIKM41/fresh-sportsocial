import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import images from '../../res/images';
import {Image, View, Text, Platform} from 'react-native';
import palette from '../../res/palette';
import colors from '../../res/colors';
import homeNavigator from './home/homeNavigator';
import activityNavigator from './activity/activityNavigator';
import BetingNavigator from './beting/BetingNavigator'
import MyBetsNavigator from './myBets/MyBetsNavigator';

export default function TabNavigator({navigation}) {
  const Tab = createBottomTabNavigator();
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false,
          showIcon: true,
          style: {
            backgroundColor: colors.bottomBackGround,
            borderTopColor: colors.seperatorLineColor,
            height:Platform.OS === 'android' ? 65 : 93,
            overflow:'hidden'
          },
        }}
        screenOptions={({route}) => ({
          tabBarButton: [
            "Betting",
          ].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,

          tabBarIcon: ({focused}) => {
            let iconName;
            let labelColor;
            if (route.name === 'Home') {
              if (focused){ return (
                <View style={{backgroundColor:'lightgray', padding:10, borderRadius:35}}>
                  <View style={{backgroundColor:'#5365A2', padding:15, borderRadius:30}}>
                      <Image style={palette.header.image} source={images.home} />
                  </View>
                </View>
              ) }else{ return (
                <View style={{backgroundColor:'lightgray', padding:10, borderRadius:35}}>
                  <View style={{backgroundColor:'black', padding:15, borderRadius:30}}>
                      <Image style={palette.header.image} source={images.home} />
                  </View>
                </View>
              )}
            } else if (route.name === 'My Bets') {
              iconName = focused ? images.mybets_selected : images.mybets;
              labelColor = focused ? "#5365A2" : "gray";
            } else if (route.name === 'Score') {
              iconName = focused ? images.score_selected : images.score;
              labelColor = focused ? "#5365A2" : "gray";
            } else if (route.name === 'Profile') {
              iconName = focused ? images.profile_selected : images.profile;
              labelColor = focused ? "#5365A2" : "gray";
            } else if (route.name === 'Menu') {
              iconName = focused ? images.more_selected : images.more;
              labelColor = focused ? "#5365A2" : "gray";
            }

            return (
            <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
              <Image style={palette.header.image} source={iconName} />
              <Text style={{marginStart:2, fontSize:9, marginBottom:-10, marginTop:5, fontFamily:'BigShouldersText-Black', color:labelColor}}>{route.name.toUpperCase()}</Text>
            </View>
            );
          },
        })}>
        
        <Tab.Screen name="My Bets" component={MyBetsNavigator} />
        <Tab.Screen name="Profile" component={activityNavigator} />
        <Tab.Screen name="Home" component={homeNavigator} />
        <Tab.Screen name="Score" component={activityNavigator} />
        <Tab.Screen name="Menu" component={activityNavigator} />
        <Tab.Screen name="Betting" component={BetingNavigator} 
          options={{
            tabBarVisible:false
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
}
