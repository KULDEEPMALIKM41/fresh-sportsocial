import React from 'react';
import {Alert, TouchableOpacity, Image, View, StyleSheet, Text} from 'react-native';
import images from '../../../../res/images';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createLike } from '../../../../services/auth_curd';
import AsyncStorage from '@react-native-community/async-storage';

export default function PostActions({post, navigation}) {
  const [likeIcon, setLikeIcon] = React.useState(post.is_liked);
  const [likeCount, setLikeCount] = React.useState(post.post_like.length);
  const [commentCount, setCommentCount] = React.useState(post.posts_comment.length);

  const tapToLike = async (flage) => {
    let value = await AsyncStorage.getItem('userData')
      if (value){
      saveLike(value);
      if (flage) {
        setLikeCount(likeCount + 1)
        setLikeIcon(1)
      } else {
        setLikeCount(likeCount - 1)
        setLikeIcon(0)
      }
    }else{
      navigation.navigate('Login');
    }
  }

  const saveLike = async (value) => {
    if (value){
      let token = JSON.parse(value).token
      let data = {"post_id":post.id}
      createLike(token, data).then((response) => { 
        console.log('action done')
      }, (error) => { 
        Alert.alert('', JSON.stringify(error.response))
      });
    }
  }


  return (
    <View style={Styles.container}>
      <View style={{flexDirection:'row',marginBottom:10}}>
      <Text  style={Styles.L1Textbox}>{likeCount} Likes </Text>
      <Text  style={Styles.C1Textbox}>{commentCount} Comments </Text>
      </View>
     <View style={{backgroundColor: '#b3b3b3', height: 1 }} />
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop:10,marginBottom:10}}>
        <TouchableOpacity onPress={() => tapToLike(!likeIcon)}>
          {likeIcon ? 
            <Image source={images.redHeart} style={Styles.actionIcons} /> :
            <Image source={images.like} style={Styles.actionIcons} /> 
          }
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => setModalVisible(true)}> */}
        <TouchableOpacity onPress={() => navigation.navigate('Comments', {post, setCommentCount})}>
        <Icon name="comment-dots" size={27} color="#b3b3b3" style={Styles.actionIcons}/>
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={images.bookmark} style={Styles.actionIcons} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor:"#fff",
  },
  actionIcons: {
    width: 27,
    height: 25,
    marginStart: 22,
  },
  L1Textbox: {
    marginLeft:15,
    paddingLeft:10,
    marginTop:10,
    color: '#b3b3b3',
    fontFamily:"BigShouldersText-Black",
    fontSize:12
  },
  C1Textbox: {
    marginLeft:5,
    marginTop:10,
    color: '#b3b3b3',
    fontWeight:'bold',
    fontSize:12
  },
});