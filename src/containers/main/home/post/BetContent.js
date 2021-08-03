import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Text, ActivityIndicator} from 'react-native';
import images from '../../../../res/images';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function BetContent({post, navigation}) {
// console.log(post);
  return (
    <View style={Styles.container}>
        <View style={{flex:1,flexDirection:'row',marginBottom:5}}>
            <View style={{marginStart:20}}>
                <Icon name="futbol" size={20} color="darkblue" />
            </View>
            <View style={Styles.MatchContainer}>
                <Text style={Styles.matchesTextStyle}>{
                (post.match_name !== undefined) ? post.match_name.split('vs')[0].substring(0,3).toUpperCase() : ''
                }
                </Text>
                <Text style={{color:'#666666',  marginHorizontal:10}}>@</Text>
                <Text style={Styles.matchesTextStyle}>
                {
                    (post.match_name !== undefined) ? post.match_name.split('vs')[1].substring(0,4).toUpperCase() : ''
                }
                </Text>
            </View>
            <View>
                <Icon name="futbol" size={20} color="darkblue" />
            </View>
        </View>
        <View style={{marginStart:20}}>
            <Text style={Styles.otherTextStyle}>{post.odd_type_name}</Text>
            <Text style={Styles.otherTextStyle}>Odds Selected <Text style={{color:"green"}}>+{post.value}</Text></Text>
            <Text>Placed on <Text style={{textDecorationLine: 'underline', color:'black'}}>Bet365</Text></Text>
        </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor:"#fff",
  },
  MatchContainer:{
    flexShrink: 1,
    flexDirection:'row',
    justifyContent:'center',
    marginHorizontal:10,
  },
  matchesTextStyle:{
    fontSize:14,
    letterSpacing:.5,
    fontFamily:"BigShouldersText-Black",
    alignItems:'center'
  },
  otherTextStyle:{
    fontSize:14,
    color:'black',
    fontWeight:'bold',
    alignItems:'center',
    marginBottom:3
  },
});