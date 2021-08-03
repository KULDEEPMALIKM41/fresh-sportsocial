import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Text, ActivityIndicator} from 'react-native';
import images from '../../../../res/images';
import AutoHeightImage from 'react-native-auto-height-image';
import PostVideos from './PostVideos'

export default function PostContent({post, navigation}) {
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;


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
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor:"#fff",
  },
  Textbox: {
    marginLeft:15,
    paddingLeft:10,
    marginTop:10,
    color: '#000',
    fontFamily:"BigShouldersText-Black",
    fontSize:16
  },
});