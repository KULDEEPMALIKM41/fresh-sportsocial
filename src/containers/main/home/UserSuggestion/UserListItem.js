import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function UserListItem({item}) {
  return (

  
    <View style={Styles.container}>
       <TouchableOpacity > 
         <View style={{alignItems:'center',marginTop:15}}>
           <Image
              source={{uri: item.src}}
              style={{width: 125, height: 125, borderRadius:15}}
            />
             <Text style={Styles.userText}> {item.key} </Text>
             <Text style={{color:'#666666',justifyContent:'center',alignSelf:'center'}}> 10 mutual friends </Text>
         </View>
          <View style={{alignItems:'center', borderWidth:1,borderColor:"gray", borderRadius:15,marginBottom:20,marginTop:10}}>
            <Text style={Styles.follow}>Follow </Text>
          </View>
       </TouchableOpacity>
    </View>
  
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginStart:15,
    marginRight:10,
    alignItems: 'center',
  },
  userText: {
    color: '#000',
    fontSize: 16,
    marginTop: 5,
    // width:120,
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
  },
  follow: {
    color: 'gray',
    fontSize: 12,
    margin:5   
  },
});
