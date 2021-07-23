import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import UserListItem from './UserListItem';
import colors from '../../../../res/colors';

export default function UserContainer({users}) {

  return (
    <View style={{backgroundColor:'#fff',marginBottom:15,height:'auto'}}>
       <Text style={{color:'#000',fontWeight:'bold',fontSize:18,marginTop:15,paddingLeft:10}}> Suggested Friends </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        indicatorStyle={'white'}
        horizontal={true}
        data={users} 
        renderItem={({item}) => (
          <UserListItem item={item} />
        )}
        keyExtractor={(item) => item.key}
      />
      <View style={Styles.sperator}></View>
    </View>
  );
}

const Styles = StyleSheet.create({
  sperator: {
    backgroundColor: colors.seperatorLineColor,
    height: 0.2,
  },
});
