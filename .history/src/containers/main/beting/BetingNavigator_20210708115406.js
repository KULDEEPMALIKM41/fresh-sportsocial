import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SportScreen from './SportScreen';
import LeagueScreen from './LeagueScreen';
import MarketScreen from './MarketScreen';
import MatchScreen from './MatchScreen';
// import OddsScreen from './OddsScreen';
import PlacebetScreen from './PlacebetScreen';

export default function BetingNavigator({navigation}) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      console.log(e);
  });
    return unsubscribe;
  }, [navigation]);
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sports"
        component={SportScreen}
      />
       <Stack.Screen
        name="Leagues"
        component={LeagueScreen}
      />
      <Stack.Screen
        name="Matches"
        component={MatchScreen}
      />
      <Stack.Screen
        name="Markets"
        component={MarketScreen}
      />
      <Stack.Screen
        name="Placebet"
        component={PlacebetScreen}
      />
    </Stack.Navigator>
  );
}
