import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
// import images from '../../../../res/images';
import colors from '../../../../res/colors';
// import PostImage from './PostImage';

export default function PostHeader({post}) {
  return (
    <View style={Styles.container}>
      <View style={Styles.nameContainer}>
        <Image
          source={{uri: 'https://picsum.photos/id/1025/4951/3301'}}
          style={Styles.personImage}
        />
        <View  style={{flexDirection: 'row', justifyContent: 'flex-start',paddingBottom:10}}>
          {/* <Text style={Styles.personName}>Your Friends </Text>
          <Text style={Styles.TextboxU}>JackVagabond </Text>
          <Text style={Styles.personNames}>selected </Text>
          <Text style={Styles.TextboxU}>Market Name</Text> */}
          <Text style={Styles.TextboxU}>{' ' + post.first_name + ' ' + post.last_name + ' '}</Text>
          <Text style={Styles.personNames}>created a post. </Text>
        </View>
      </View>
      <Text style={Styles.placeName} > {post.created_date} </Text>
      
      {/* <View>
        
        <TouchableOpacity>
          <Image source={images.more} style={Styles.iconMore} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 0,
    // marginBottom: 6,
    marginStart: 10,
    // marginEnd: 0,
    // alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  personImage: {
    width: 30,
    height: 30,
    borderRadius: 0,
  },
  personName: {
    color: colors.text,
    marginStart: 10,
    fontSize:12,
    // fontWeight: 'bold',
  },
  personNames: {
    color: colors.text,
 
    fontSize:12,
    // fontWeight: 'bold',
  },
  placeName: {
    color: colors.text,
    marginStart: 40,
    marginTop:-10,
    fontSize:12,
  },
  iconMore: {
    height: 15,
    width: 15,
  },
  TextboxU: {
    textDecorationLine: 'underline',
    color: '#3385ff',
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});
