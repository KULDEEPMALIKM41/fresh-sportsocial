import React, {useState} from 'react';
import {View,Alert,Text,FlatList,ScrollView,
        Image,StyleSheet,TouchableOpacity, KeyboardAvoidingView,
        Dimensions,
        LogBox, StatusBar} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import images from '../../../../res/images';
import { createComment } from '../../../../services/auth_curd';
import AsyncStorage from '@react-native-community/async-storage';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function CommentScreen({navigation, route}) {
    const post = route.params.post
    const setCommentCount = route.params.setCommentCount
    const androidStatusBar = 0;
    const iosStatusBar = StatusBar.currentHeight + 50;
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    let flatList = null
    const initComments = post.posts_comment
    const [comments, setComments] = useState(initComments)
    const [commentText, setCommentText] = useState('')

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerStatusBarHeight: Platform.OS === 'android' ? androidStatusBar : iosStatusBar,
      headerStyle: {
        backgroundColor: '#5365A2'
      },
      headerTitle: () => (
        <View style={{flexShrink: 1, width:200, marginStart:Platform.OS === 'ios' ? -50 : 0}}>
            <Text style={styles.headerTitleStyle}>
              Comments
            </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.commentBackButton} onPress={()=> navigation.goBack()}>
            <Image onPress={()=> navigation.goBack()} source={images.backButton}  style={{width:12, height:12}} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


 const postComment = async() => {
    if (commentText != ''){
      let value = await AsyncStorage.getItem('userData')
      if (value){
        let token = JSON.parse(value).token
        let data = {"post_id":post.id, comment:commentText};
        setCommentText('')
        createComment(token, data).then((response) => { 
          console.log('action done', response.data.data);
          setComments(...[response.data.data])
          post.posts_comment = response.data.data
          setCommentCount(post.posts_comment.length )
          // flatList.scrollToStart({animated: true});
        }, (error) => { 
          Alert.alert('', JSON.stringify(error.response))
        });

      }
      // let lastCommentText = commentText
      // let lastComments = comments
      // post.posts_comment.push({
      //   id:Math.random(),
      //   name: 'Mary',
      //   comment:lastCommentText,
      //   src: 'https://picsum.photos/600',
      // })
      // lastComments.push({
      //   id:Math.random(),
      //   name: 'Mary',
      //   comment:lastCommentText,
      //   src: 'https://picsum.photos/600',
      // })
      // setCommentCount(lastComments.length )
      // setComments(...[lastComments])
      // setCommentText('')
    }
  };

  return (
    <>
      <View style={{flex:1, backgroundColor:"#fff"}}>
        <View style={{flex:1, marginBottom:10}}>
          <FlatList
            ref={ref => flatList = ref}
            // onLayout={() => flatList.scrollToStart({animated: true})}
            indicatorStyle={'white'}
            data={comments} 
            renderItem={({item}) => (
              <View style = {styles.pageComments} >
                <View style={{alignItems:'center', justifyContent:'flex-start', flex:1}}>
                  <Image
                  source={{uri: 'https://picsum.photos/id/1025/4951/3301'}}
                  style={styles.personImage}
                  />
                </View>
                <View style={{flex:5}}>
                  <View style={{backgroundColor:'#d6d9dc59', alignSelf: 'flex-start', paddingBottom:8, paddingTop:3, paddingHorizontal:10, borderRadius:15}}>
                    <View style={{alignItems:'flex-start', justifyContent:'flex-start'}}>
                      <Text style={styles.textStyle}>
                          {item.first_name + ' ' + item.last_name}
                      </Text>
                    </View>
                    <View style={{alignItems:'flex-start', justifyContent:'flex-start'}}>
                        <Text style={{fontSize:16}}>
                        {item.comment}
                        </Text>
                    </View>
                  </View>
                </View>
              </View>
              )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={{flexDirection:'row', marginHorizontal:15}}>
          <View style={{flex:7}}>
            <TextInput
              style={styles.InputContainer}
              multiline={true}
              placeholderTextColor={'lightgray'}
              value={commentText}
              onChangeText={text=> setCommentText(text)}
              placeholder="Write a comment... "
            />
          </View>
          <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
            <TouchableOpacity onPress={postComment}>
              <Image
                style={{height:35, width:35}}
                source={images.bookmark}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  headerTitleStyle:{
    color: 'white',
    fontSize: 19,
    letterSpacing:1,
    textAlign:'left',
    fontFamily:"BigShouldersText-Black"
  },
    commentBackButton:{
    backgroundColor:'rgba(1,41,50, 0.5)',
    padding:6,
    borderRadius:15,
    height:25,
    width:25,
    marginHorizontal:10
  },
  pageComments:{
    flexDirection: 'row',
    // height:60,
    marginTop:10,
    marginHorizontal:10
  },
  textStyle:{
    color: 'black',
    fontSize:18,
    fontFamily:"BigShouldersText-Black",
    letterSpacing:.6
  },
  personImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  InputContainer: {
    borderColor:'lightgray',
    borderWidth:1,
    marginBottom:5,
    borderRadius:25,
    paddingStart:20,
  },
})

