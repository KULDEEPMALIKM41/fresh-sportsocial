import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import images from '../../res/images';
import {Image} from 'react-native';
import palette from '../../res/palette';
import colors from '../../res/colors';
import homeNavigator from './home/homeNavigator';
import activityNavigator from './activity/activityNavigator';
import BetingNavigator from './beting/BetingNavigator'

export default function TabNavigator({navigation}) {
  const Tab = createBottomTabNavigator();
  return (
    <React.Fragment>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          showIcon: true,
          style: {
            backgroundColor: colors.bottomBackGround,
            borderTopColor: colors.seperatorLineColor,
          },
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? images.home_selected : images.home_selected;
            } else if (route.name === 'Betting') {
              iconName = focused ? images.flash : images.flash;
            } else if (route.name === 'MyBets') {
              iconName = focused ? images.grid : images.grid;
            } else if (route.name === 'Menu') {
              iconName = focused ? images.list3 : images.list3;
            }

            return <Image style={palette.header.image} source={iconName} />;
          },
        })}>
        <Tab.Screen name="Betting" component={BetingNavigator} />
        <Tab.Screen name="Home" component={homeNavigator} />
        
        <Tab.Screen name="MyBets" component={activityNavigator} />
        <Tab.Screen name="Menu" component={activityNavigator} />
      </Tab.Navigator>
    </React.Fragment>
  );
}
