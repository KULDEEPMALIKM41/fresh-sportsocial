import React, {useState} from 'react';
import {Alert, TouchableOpacity, Image, View, StyleSheet,Button,Text, ActivityIndicator, Dimensions, Animated, AppRegistry} from 'react-native';
import images from '../../../../res/images';
import { max } from 'react-native-reanimated';
// import addCommentNavigator from '../../addComment/addCommentNavigator';
import AutoHeightImage from 'react-native-auto-height-image';
import PostVideos from './PostVideos'

function tapToLike(likeIcon) {
  if (likeIcon % 2 === 0) {
    return images.redHeart;
  } else {
    return images.like;
  }
}
function tapToBookmark(bookmarkIcon) {
  if (bookmarkIcon % 2 === 0) {
    return images.bookmarkWhite;
  } else {
    return images.bookmark;
  }
}


export default function PostActions({post, navigation}) {
  const [likeIcon, setLikeIcon] = React.useState(1);
  const [bookmarkIcon, setBookmarkIcon] = React.useState(1);
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={Styles.container}>
      {post.images_path || post.videos_path ? 
      <Text  style={{maxHeight:60, color: '#fff', padding:5}}>
      {post.post_data}
      </Text>:
      <Text  style={Styles.Textbox}>
      {post.post_data}
      </Text>
      }
      { 
      post.images_path ?
        <>
        <AutoHeightImage
        style={{marginBottom:10}}
        width={windowWidth-5}
        source={{uri:post.images_path}}
        fallbackSource={images.notfound}
        onLoadEnd={() => setLoading(false)}
        resizeMode="contain"
      />
      {loading && < ActivityIndicator style={{
        // position: 'absolute',
        width:windowWidth,
        height:300,
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }} size="large" color="skyblue" animating={loading}/>}
      </>      
      : null
      }
      { 
      post.videos_path ?
      <PostVideos source={post.videos_path}/>
        : null
      }
      {/* <Text style={Styles.Textbox}>
            Match Name Here    
      </Text>
      <Text  style={Styles.Textbox}>
            Market Name 
      </Text>
      <Text  style={Styles.Textbox}>
            Odds Selected 
      </Text> */}
      {/* <View style={{flexDirection: 'row', justifyContent: 'flex-start',paddingBottom:10}}>
      <Text style={Styles.Textbox}>
            Placed on  
      </Text>
       <Text></Text>
     </View> */}
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop:10}}>
        <TouchableOpacity onPress={() => setLikeIcon(likeIcon + 1)}>
          <Image source={tapToLike(likeIcon)} style={Styles.actionIcons} />
         
        </TouchableOpacity>
        <Text style={Styles.TextboxU}>
             30  
         </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
          <Image source={images.comment} style={Styles.actionIcons} />
        </TouchableOpacity>
    
        <Text style={Styles.TextboxU}>
             30  
         </Text>
        <TouchableOpacity >
          <Image source={tapToBookmark(bookmarkIcon)} style={Styles.actionIcons} />
        </TouchableOpacity>
        <Text style={Styles.TextboxU}>
             30  
         </Text>
        <TouchableOpacity onPress={() => console.log('Pressed Comment')}>
          <Image source={images.direct_message} style={Styles.actionIcons}   />
        </TouchableOpacity>
       
        {/* <TouchableOpacity onPress={() => console.log('share')}>
          <Image source={images.share} style={Styles.actionIcons} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => console.log('share1')}>
          <Image source={images.share2} style={Styles.actionIcons} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => console.log('share2')}>
          <Image source={images.share1} style={Styles.actionIcons} />
        </TouchableOpacity> */}
   {/* <View style={{position: 'absolute', right: 15, marginTop:-10,}} >
      <Button
        // Some properties given to Button
        title="Place Bet"
        // onPress={() => Alert.alert(
        //     'Place bet here')}
      />
      </View> */}
      </View>
      <View style={{backgroundColor: 'gray', height: 4, flex: 1, marginTop:10 }} />
      {/* <TouchableOpacity onPress={() => setBookmarkIcon(bookmarkIcon + 1)}>
        <Image
          source={tapToBookmark(bookmarkIcon)}
          style={Styles.actionIcons}
        />
      </TouchableOpacity> */}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    //paddingStart: 20,
    marginTop: 0,
  },
  actionIcons: {
    width: 23,
    height: 23,
    marginStart: 22,
  },
  Textbox: {
    padding:15,
    minHeight:60,
    color: '#fff',
  },
  TextboxU: {
    paddingLeft:5,
    textDecorationLine: 'underline',
    color: '#3385ff',
  },
});