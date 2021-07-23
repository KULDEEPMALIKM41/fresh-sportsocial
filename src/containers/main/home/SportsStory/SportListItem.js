import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SportListItem({item, navigation}) {

  return (
    <TouchableOpacity key={item.id} onPress={() =>  navigation.navigate("Betting", {item})}>
    <View style={{paddingHorizontal:10,flexDirection:'column',marginTop:0}}>
        <View style={{borderWidth:1,borderColor:"#fff",borderRadius:30,padding:5,backgroundColor:'#fff'}}>
            <Icon name="futbol" size={50} color="blue"/>
        </View>
        <View >
            <Text style={{alignSelf:'center',justifyContent:'center',fontFamily:"BigShouldersText-Black",letterSpacing:0.5}}>{item.name}</Text>
        </View>
    </View>
    </TouchableOpacity>
  );
}

