import React from 'react';
import {Text, Dimensions, View, StyleSheet, Image, Button} from 'react-native';
import colors from '../../../../res/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../../res/images';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function BetHeader({post}) {
const windowWidth = Dimensions.get('window').width;
  return (
    <View style={Styles.container}>
        <View style={Styles.nameContainer}>
            <View style={{flex:2}}>
                <Image
                source={{uri: 'https://picsum.photos/id/1025/4951/3301'}}
                style={Styles.personImage} />
            </View>  
            <View style={{flex:8, flexDirection:"column",marginLeft:10}}>
                <View>
                    <Text style={Styles.TextboxU}>{post.first_name + ' ' + post.last_name } <Text style={Styles.TextboxM}>selected<Text style={Styles.TextboxL}> {post.odd_type_name}</Text></Text></Text>
                </View>
                <View style={{flexDirection:"row", justifyContent:'flex-start',alignItems:'center'}}>
                    <Icon name="clock" size={20} color="lightgray"/>
                    <Text style={Styles.placeName} > {post.created_date} </Text>
                </View>
            </View>
            <View style={{flex:1, alignItems:'center'}}>
                <Menu>
                    <MenuTrigger>
                        <Image source={images.dot}  style={{width:5,height:5,marginBottom:2}}/>
                        <Image source={images.dot}  style={{width:5,height:5,marginBottom:2}}/>
                        <Image source={images.dot}  style={{width:5,height:5,marginBottom:2}}/>
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={{width:100,height:80,borderRadius:10,borderColor:'#E8E8E8',borderWidth:1}} >
                        <MenuOption  onSelect={() => alert(`Unfollow`)}>  
                            <Text style={{color: 'gray',fontSize:15,letterSpacing:0.5,marginLeft:10,fontFamily:"BigShouldersText-Black"}}>Unfollow</Text>
                            </MenuOption>
                            <MenuOption>
                            <View style={{height:1,backgroundColor:'lightgray'}}>
                            </View>
                            </MenuOption>
                            <MenuOption onSelect={() => alert(`Share`)} >
                            <Text style={{color: 'gray',fontSize:15,letterSpacing:0.5,marginLeft:10,fontFamily:"BigShouldersText-Black",marginTop:-5}}>Share</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex:1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin:10
  },
  personImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginLeft:10,  
  },
  personName: {
    color: colors.text,
    marginStart: 10,
   
    fontSize:12,
    fontWeight: 'bold',
  },
  placeName: {
    color: "lightgray",
    marginStart:5,
    fontSize:14,
    fontFamily:"BigShouldersText-Black"
  },
  iconMore: {
    height: 15,
    width: 15,
  },
  TextboxU: {
    color: '#000',
    fontSize:17,
    fontFamily:"BigShouldersText-Black",
    marginBottom:5,
    letterSpacing:0.3,
    marginTop:-7
  },
  TextboxM: {
    color: 'gray',
  },
  TextboxL: {
    color: '#5365A2',
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});
