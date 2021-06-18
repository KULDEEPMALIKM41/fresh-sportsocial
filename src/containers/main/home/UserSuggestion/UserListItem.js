import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function UserListItem({item}) {
  return (

  <View>
    <View style={Styles.container}>

       <TouchableOpacity > 
         <View style={{height:90,alignItems:'center'}}>
          <Image
              source={{uri: item.src}}
              style={{width: 75, height: 60, borderRadius: 0}}
            />
             <Text style={Styles.userText}> {item.key} </Text>
          </View>
          <View style={{alignItems:'center'}}>
              <Text style={Styles.follow}>Follow </Text>
          </View>

      </TouchableOpacity>
    </View>
    <View style={{backgroundColor: 'gray', height: 4,flex:1,marginTop:5, }} />
          <View style={{margin:10}}></View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width:75,
    marginStart: 10,
    marginEnd: 5,
    marginTop:5,
    marginBottom: 0,
    alignItems: 'center',
  },
  userText: {
    color: 'white',
    fontSize: 10,
    marginTop: 5,
    width:75,
    alignItems:'center'
  },
  follow: {
    color: '#3385ff',
    fontSize: 10,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});
