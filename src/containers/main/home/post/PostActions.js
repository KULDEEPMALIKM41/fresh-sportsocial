import React, {useState} from 'react';
import {Alert, TouchableOpacity, Image, View, StyleSheet,Button,Text, ActivityIndicator, Dimensions, Animated, AppRegistry} from 'react-native';
import images from '../../../../res/images';
import { max } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AutoHeightImage from 'react-native-auto-height-image';
import PostVideos from './PostVideos'
import { createLike } from '../../../../services/auth_curd';
import AsyncStorage from '@react-native-community/async-storage';

function tapToBookmark(bookmarkIcon) {
  if (bookmarkIcon % 2 === 0) {
    return images.bookmarkWhite;
  } else {
    return images.bookmark;
  }
}


export default function PostActions({post, navigation}) {
  const [likeIcon, setLikeIcon] = React.useState(0);
  const [likeCount, setLikeCount] = React.useState(post.post_like.length);
  const [commentCount, setCommentCount] = React.useState(post.posts_comment.length);
  const [bookmarkIcon, setBookmarkIcon] = React.useState(1);
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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
      {post.images_path || post.videos_path ? 
      post.post_data ?
      <Text  style={{color: '#333333',fontSize:17,fontFamily:"BigShouldersText-Black",letterSpacing:0.5, padding:10,marginLeft:10}}>
      {post.post_data}
      </Text>: null :
      <Text  style={Styles.Textbox}>
      {post.post_data}
      </Text>
      }
      { 
      post.images_path ?
        <>
        <AutoHeightImage
        style={{margin:10,}}
        width={windowWidth*0.95}
        source={{uri:post.images_path}}
        fallbackSource={images.notfound}
        onLoadEnd={() => setLoading(false)}
        resizeMode="contain"
      />
      {loading && < ActivityIndicator style={{
        width:windowWidth*0.2,
        height:300,
        alignSelf: 'center',
        justifyContent: 'center'
      }} size="large" color="skyblue" animating={loading}/>}
      </>      
      : null
      }
      { 
      post.videos_path ?
      <PostVideos 
      style={{margin:10,padding:10}}
      source={post.videos_path}/>
        : null
      }
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
          <Image source={tapToBookmark(bookmarkIcon)} style={Styles.actionIcons} />
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
  Textbox: {
    marginLeft:15,
    paddingLeft:10,
    marginTop:10,
    color: '#000',
    fontFamily:"BigShouldersText-Black",
    fontSize:16
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
  TextboxU: {
    paddingLeft:5,
    textDecorationLine: 'underline',
    color: '#3385ff',
  },
});