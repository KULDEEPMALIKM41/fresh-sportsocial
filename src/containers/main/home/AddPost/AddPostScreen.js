import React, {useState} from 'react';
import {View,Alert,Text,TextInput,ScrollView,Button, StatusBar,
  Image,StyleSheet,TouchableOpacity, Dimensions, ActivityIndicator, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform} from 'react-native';
import {createPost} from '../../../../services/auth_curd'
import colors from '../../../../res/colors';
import {launchImageLibrary} from 'react-native-image-picker';
import AutoHeightImage from 'react-native-auto-height-image';
import PostVideos from '../post/PostVideos'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import images from '../../../../res/images';

export default function AddPostScreen({navigation}) {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [commentText, setCommentText] = useState('');
  const [textInputHeight, setTextInputHeight] = useState(208);
  const [images_path, setImagesPath] = useState(null);
  const [videos_path, setVideosPath] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(null);
  const androidStatusBar = 0;
  const iosStatusBar = StatusBar.currentHeight + 50;

  React.useEffect(() => {
    checkAuth()
  },[]);

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
              Create Post
            </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.addPostBackButton} onPress={()=> navigation.goBack()}>
            <Image onPress={()=> navigation.goBack()} source={images.backButton}  style={{width:12, height:12}} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <>
        {
          uploading ?
          <TouchableOpacity
            style={styles.headerRightContainer}>
            <Text style={styles.headerTitleStyle}>POST</Text>
          </TouchableOpacity>:
           <TouchableOpacity
           style={styles.headerRightContainer}
           onPress={() => savePost()}>
           <Text onPress={() => savePost()} style={styles.headerTitleStyle}>POST</Text>
         </TouchableOpacity>
        }
        </>
      ),
    });
  }, [navigation, commentText, uploading, images_path, videos_path]);


  const checkAuth = async () => {
    let value = await AsyncStorage.getItem('userData')
    if (value){
      value = JSON.parse(value).first_name + ' ' + JSON.parse(value).last_name
      setName(value)
    }else{
      setName(null)
    }
  }

  const removeMultiMedia = () => {
    setImagesPath(null)
    setVideosPath(null)
    setTextInputHeight(208)
  }
  const selectVideoImage = () => {
    setVideosPath(null)
    setImagesPath(null)
    setTextInputHeight(208)
    const options = {
      width: 300,
      quality: 0.2,
      mediaType:'mixed',
      videoQuality:'low',
    };
    launchImageLibrary(options, (response) => {
      console.log(response)
      if (response.assets) {
        if (response.assets[0].duration){
          setVideosPath(response.assets[0])
          setTextInputHeight(750)
        }else{
          setImagesPath(response.assets[0])
          setTextInputHeight(750)
        }
      }
    })
  }


  const simpleAlertHandler = () => {
    //function to make simple alert
    Alert.alert('Coming soon !');
   };


  const savePost = async () => {
    if (commentText || images_path || videos_path){
    setUploading(true)
    let value = await AsyncStorage.getItem('userData')
    if (value){
      let token = JSON.parse(value).token
      let formData = new FormData()

      if (images_path){
        let imgs = {
          uri: images_path.uri,
          name: images_path.fileName,
          type: images_path.type,
        }
        formData.append( 
          "images_path", imgs,
        );
      }
      
      if (videos_path){
        let vds = {
          uri: videos_path.uri,
          name: videos_path.fileName,
          type: 'video/mp4',
        }
        formData.append( 
          "videos_path", vds,
        );
      }
      
      
      if (commentText){
        formData.append( 
          "post_data", commentText,
        );
      }
      
      createPost(formData, token).then(async (response) => { 
        setCommentText('')
        setUploading(false)
        try {
          await AsyncStorage.setItem(
            'reload',
            '1'
          );
        } catch (error) {
          console.log(error)
        }
        navigation.goBack()
      }, (error) => { 
        // setLoading(false)
        setUploading(false)
        console.log(error)
        Alert.alert('', JSON.stringify(error.response))
       });
    }
  }
  }

  return (
    <>
      <View style={{flex:1, backgroundColor:"#fff"}}>
        <ScrollView>
          <View style={{flex:1, minHeight:screenHeight}}>
            <View style = {styles.pagePrivacy} >
              <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                <Image
                source={{uri: 'https://picsum.photos/id/1025/4951/3301'}}
                style={styles.personImage}
                onPress={simpleAlertHandler}
                />
              </View>
              <View style={{flexDirection:'column', flex:4}}>
                <View style={{justifyContent:'center', flex:.8}}>
                  <Text style={styles.textStyle}>
                      {name}
                  </Text>
                </View>
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                  <View style={{ borderColor:'gray', marginRight:25, borderWidth:1, borderRadius:5, paddingHorizontal:20, height:24}}>
                    <RNPickerSelect 
                        items={[
                            {
                              label:' Public',
                              value:'public'
                          }
                        ]}
                        value={'public'}
                        style={{inputIOS: {
                          fontSize: 16,
                          paddingStart:5,
                          fontFamily:"BigShouldersText-Black",
                          letterSpacing:.5,
                          color: 'black',
                          }, inputAndroid: {
                              fontSize: 14,
                              paddingVertical:0,
                              fontFamily:"BigShouldersText-Black",
                              letterSpacing:.5,
                              color: 'black',
                          }}}
                        onValueChange={(value) => console.log(value)}
                        useNativeAndroidPickerStyle={false}
                    />
                  </View>
                  <View style={{ borderColor:'gray', marginRight:25, borderWidth:1, borderRadius:5, paddingHorizontal:16, height:24}}>
                    <RNPickerSelect 
                      items={[
                        {
                          label:'+ Album',
                          value:'album'
                          }
                        ]}
                      value={'album'}
                      style={{inputIOS: {
                          fontSize: 16,
                          paddingStart:5,
                          fontFamily:"BigShouldersText-Black",
                          letterSpacing:.5,
                          color: 'black',
                          }, inputAndroid: {
                            fontSize: 14,
                            paddingVertical:0,
                            fontFamily:"BigShouldersText-Black",
                            letterSpacing:.5,
                            color: 'black',
                        }}}
                      onValueChange={(value) => console.log(value)}
                      useNativeAndroidPickerStyle={false}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex:1}}>
              <View style={{flex:1, marginHorizontal:5}}>
                <TextInput
                  style={{flex:1, textAlignVertical: "top", fontSize:24, borderRadius:10}}
                  multiline={true}
                  placeholderTextColor={'gray'}
                  value={commentText}
                  autoCorrect={true}
                  onChangeText={text=> setCommentText(text)}
                  placeholder="What's on your mind ?... "
                />
              </View>
              {images_path != null || videos_path !=null ? 
              <View style={{flex:3}}>
              {images_path != null ?
              <AutoHeightImage
                style={{marginBottom:10}}
                width={screenWidth}
                source={{uri:images_path.uri}}
                resizeMode="contain"
              />      
              : null}
              {videos_path ?
              <PostVideos source={videos_path.uri}/>
              : null}
              <View style={styles.multiMediaRemover}>
                <TouchableOpacity onPress={removeMultiMedia}>
                  <Icon name="times-circle" size={30} color="skyblue" />
                </TouchableOpacity>
              </View>
              </View>
              :null}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => selectVideoImage()}>
          <Text style={styles.buttomButton}>Add Photo/Video</Text>
        </TouchableOpacity>
      </View>
      {uploading && <View style={styles.videoBufferCover}>
      <ActivityIndicator size="large" color="skyblue" animating={uploading}/>
      <Text style={{color:'white'}}>Uploading...</Text>
      </View>}
    </>
  )
}

const styles = StyleSheet.create({
  addPostBackButton:{
    backgroundColor:'rgba(1,41,50, 0.5)',
    padding:6,
    borderRadius:15,
    height:25,
    width:25,
    marginHorizontal:10
  },
  headerTitleStyle:{
    color: 'white',
    fontSize: 19,
    letterSpacing:1,
    textAlign:'left',
    fontFamily:"BigShouldersText-Black"
  },
  headerRightContainer: {
    backgroundColor:'rgba(1,41,50, 0.5)',
    paddingHorizontal: 10,
    paddingVertical:3,
    marginRight:2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10
  },
  pagePrivacy:{
    flexDirection: 'row',
    height:60,
    marginTop:10
  },
  textStyle:{
    color: 'black',
    fontSize:18,
    fontFamily:"BigShouldersText-Black",
    letterSpacing:.6
  },
  personImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#5c5cd6',
    justifyContent: 'center',
    paddingVertical:10
  },
  buttomButton: {
    color: '#fff',
    fontFamily:"BigShouldersText-Black",
    fontSize:20
  },
  multiMediaRemover: {
    alignItems:'flex-end',
    justifyContent:"flex-start",
    position:"absolute",
    left:0,
    right:5,
    backgroundColor: 'transparent'
  },
  videoBufferCover: {
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    left:0,
    top:0,
    right:0,
    bottom:0,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
})
//     return (
//       <>
//   <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "padding"} keyboardVerticalOffset={Platform.OS === 'ios' ? 127 : 0} style={{flex:1,backgroundColor:'black'}}>
//   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//   <View>
//   <View>
 
//     <View style = {styles.container} >
//       <TouchableOpacity onPress={simpleAlertHandler}>
//          <Image
//             source={{uri: 'https://picsum.photos/id/1025/4951/3301'}}
//             style={styles.personImage}
//             onPress={simpleAlertHandler}
//           />
//           </TouchableOpacity>
//             <Text style = {styles.text}  onPress={simpleAlertHandler} >
//               {name}
//             </Text>
//          </View>
 
    
// <View style={{flexDirection:'row',marginTop:-10,height:20,alignContent:'center',justifyContent:'center', marginBottom:'2%'}}>
//       <View style={{ flex:0.26,backgroundColor:'white',borderRadius:3, height:20 }}>
//           <RNPickerSelect 
//             items={[
//               {
//                 label:'Public',
//                 value:'public'
//               }
//             ]}
//             value={'public'}
//             style={{inputIOS: {
//               fontSize: 16,
//               paddingStart:5,
//               color: 'black',
//             }, inputAndroid: {
//               fontSize: 14,
//               paddingStart:5,
//               paddingTop:0,
//               marginBottom:-10,
//               color: 'black',
//             }}}
//             onValueChange={(value) => console.log(value)}
//             useNativeAndroidPickerStyle={false}
//         />
//         </View>
//         <View style={{ flex:0.3,backgroundColor:'white',marginLeft:10,borderRadius:3, }}>
//         <RNPickerSelect 
//             items={[
//               {
//                 label:'+ Album',
//                 value:'album'
//               }
//             ]}
//             value={'album'}
//             style={{inputIOS: {
//               fontSize: 16,
//               paddingStart:5,
//               color: 'black',
//             }, inputAndroid: {
//               fontSize: 16,
//               paddingStart:5,
//               paddingTop:0,
//               marginBottom:-10,
//               color: 'black',
//             }}}
//             onValueChange={(value) => console.log(value)}
//             useNativeAndroidPickerStyle={false}
//         />
//         </View>
//      </View>
//   <ScrollView>
//   <View style={styles.welcome3}>
//     <TextInput  multiline={true}
//     style={{color:"#fff",width:'100%',
//               justifyContent:'flex-start',textAlignVertical: "top",fontSize:14
//   }}
//       placeholderTextColor={'gray'}
//       value={commentText}
//       autoCorrect={true}
//       height={screenHeight-textInputHeight}
//       onChangeText={text=> setCommentText(text)}
//        placeholder="What's on your mind ?... " />
//   </View>
//   <View>
//   {images_path != null ?
//         <>
//         <AutoHeightImage
//         style={{marginBottom:10}}
//         width={screenWidth}
//         source={{uri:images_path.uri}}
//         resizeMode="contain"
//       />
//       <View style={styles.multiMediaRemover}>
//       <TouchableOpacity onPress={removeMultiMedia}>
//             <Icon name="times-circle" size={30} color="skyblue" />
//       </TouchableOpacity>
//       </View>
//       </>      
//       : null}
//   {videos_path ?
//       <PostVideos source={videos_path.uri}/>
//         : null}
//       <View style={styles.multiMediaRemover}>
//         <TouchableOpacity onPress={removeMultiMedia}>
//             <Icon name="times-circle" size={30} color="skyblue" />
//         </TouchableOpacity>
//       </View>
//   </View>
//   </ScrollView>
//   </View>
//   <View style={{
//     backgroundColor:"gray",
//     bottom:Platform.OS === 'ios' ? 35 : 0,

//     position:'absolute',
//     width:"100%"
//   }}> 
//   <Button
//   color={"blue"}
//   title="Add Photo/Video"
//   onPress={() => selectVideoImage()}
//   />
//   </View>
//   </View>
//   </TouchableWithoutFeedback>
//   </KeyboardAvoidingView>
//   {uploading && <View style={styles.videoBufferCover}>
//   <ActivityIndicator size="large" color="skyblue" animating={uploading}/>
//   <Text style={{color:'white'}}>Uploading...</Text>
//   </View>}
//   </>
//       );



   
// const styles = StyleSheet.create({
//   welcome2: {
//     width:'100%',                         
//     backgroundColor: 'black',
//     justifyContent:'flex-start',
//     fontSize: 20,
//     paddingTop: 0,
//     height:'auto',
//   },
//   welcome3: {
//     paddingHorizontal:'2%',
//     backgroundColor:'black',
//     width:'100%',
//     fontSize: 20,
//     height:'auto' 
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent:'center',
//     padding: 10,
//     paddingTop:15,
//   },
//   personImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 30,
//     margin:10,
//     marginTop:35
//   },
 
//   container: {
//     flexDirection: 'row',
//     height:50,
//     alignItems: 'center',
//     bottom:0
//  },
//  text: {
//    paddingLeft:5,
//     color: 'white',
//     fontSize:16,
//     fontWeight:'bold'
//   },
//  textfieldbutton:{
//   paddingLeft:10,
//   marginTop:-10,
//   color: 'gray',
//   fontSize:12,
//   fontWeight:'bold',
//   },  
//   container2: {
//     paddingLeft:55,
//     flexDirection: 'row',
//     paddingBottom:0,
//     marginTop:-10,
//     backgroundColor: 'black',
//   },
//    textStyle: {
//     color: '#fff',
//     fontSize: 20,
//     paddingLeft: 15,
//     paddingTop:12,
//     fontWeight:'bold'
//    },
//   itemStyle: {
//     fontSize: 8,
//   },
//   pickerStyle: {
//     padding:0,
//     width: "120%",
//     height: 20,
//     color: "black",
//     fontSize:8,
//   },
//   textStyle: {
//     fontSize: 8,
//   },
//   headerRightContainer: {
//     padding: 5,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   videoBufferCover: {
//     alignItems:"center",
//     justifyContent:"center",
//     position:"absolute",
//     left:0,
//     top:0,
//     right:0,
//     bottom:0,
//     backgroundColor: 'rgba(52, 52, 52, 0.8)'
//   },
//   multiMediaRemover: {
//     alignItems:'flex-end',
//     justifyContent:"flex-start",
//     position:"absolute",
//     left:0,
//     right:5,
//     backgroundColor: 'transparent'
//   }
// });