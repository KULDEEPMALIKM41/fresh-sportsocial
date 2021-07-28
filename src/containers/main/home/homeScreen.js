import React, {useState} from 'react';
import {SafeAreaView, Modal, Dimensions, FlatList, View, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Image, Button, Touchable} from 'react-native';
import Post from './post/Post';
import colors from '../../../res/colors';
import UserContainer from './UserSuggestion/UserContainer';
import palette from '../../../res/palette';
import {getPost} from '../../../services/auth_curd';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import SportContainer from './SportsStory/SportContainer';
import { getSports } from '../../../services/auth_curd';
import GestureRecognizer from 'react-native-swipe-gestures';
import images from '../../../res/images';
import CommentScreen from './Comments/CommentScreen'
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function homeScreen({navigation}) {
  const users = [
    {
      key: 'Kuldeep mali',
      hasStory: true,
      src: 'https://picsum.photos/400',
    },
    {
      key: 'Kartik Shukla',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
    {
      key: 'Manoj Trivedi',
      hasStory: true,
      src: 'https://picsum.photos/700',
    },
    {
      key: 'Tipsterss',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
    {
      key: 'Tipstersss',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
    {
      key: 'Tipster follw',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
  ];
  const firstData = [];

  const [name, setName] = useState(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(firstData);
  const [loading, setLoading] = useState(true);
  // const [modalVisible, setModalVisible] = useState(false);
  const sports = [];
  const [sports_data, setSports_data] = React.useState(sports)

  const checkAuth = async () => {
    let value = await AsyncStorage.getItem('userData');
    if (value){
      value = JSON.parse(value).first_name + ' ' + JSON.parse(value).last_name;
      setName(value);
    }else{
      setName(null);
    }
  }

  const getSportsData = () => {
    console.log('get sports...');
    getSports().then((response) => {
      setSports_data(response.data.data);
    }, (error) => { 
      console.log(error.response);
     });
  }
  const getPostData = async () => {
      getPost(page, 'token').then((response) => {
        console.log('page--------------------------', page)
        let data = response.data.data.data;
        if (data.length){
          data.push({"id": page*1000, users:users});
          setData(oldArray => [...oldArray, ...data]);
        }
        else{
          setLoading(false);
        }
      }, (error) => { 
        console.log(error.response);
       });
  }

  React.useEffect(() => {
    checkAuth();
    getSportsData()
    getPostData();
    const unsubscribe = navigation.addListener('focus', (e) => {
      checkAuth();
      // setData(firstData);
      // setLoading(true);
      // if (page == 1){
      //   getPostData();
      // }else{
      //   setPage(1);
      // }
  }
  );
  
    return unsubscribe;
  }, [navigation, page]);

  const loadMoreData = () => {
      setPage(page+1)
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#E8E8E8"}}>
      {/* <GestureRecognizer
          onSwipeDown={ () => setModalVisible(!modalVisible)}
        >
      <Modal
      style={{backgroundColor:'black'}}
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        
        }}
      >
          <View style={Styles.centeredView}>
            <View style={{height:screenHeight-25, width:screenWidth, borderTopLeftRadius:15, backgroundColor:'black', borderTopRightRadius:15}}>
              <CommentScreen/>
            </View>
          </View>
      </Modal>
      </GestureRecognizer> */}
      <FlatList
          ListHeaderComponent={() => (
            <View style={{marginBottom:10,backgroundColor:'#5365A2'}}>
              <View style={{height:50,flex:1,backgroundColor:'#5365A2'}}></View>
              <View style={{height:60,backgroundColor:'#E8E8E8'}}>
                <View style={{flex:1}}>
                  <View style={{ position: 'absolute', top:-35,left:5, height:85, zIndex: 1}}>
                   {
                     sports_data.length ?  <SportContainer navigation={navigation} sports_data={sports_data} /> :
                   <View style={{flexDirection:'row'}}>
                   <View style={{marginHorizontal:8, alignContent:'center',alignItems:'center',width:70,height:70,borderRadius:30,overflow: 'hidden'}} >
                     <Image source ={images.story_loader} style={{width:70,height:70}} />
                    </View>
                    <View style={{marginHorizontal:8, alignContent:'center',alignItems:'center',width:70,height:70,borderRadius:30,overflow: 'hidden'}} >
                     <Image source ={images.story_loader} style={{width:70,height:70}} />
                    </View>
                    <View style={{marginHorizontal:8, alignContent:'center',alignItems:'center',width:70,height:70,borderRadius:30,overflow: 'hidden'}} >
                     <Image source ={images.story_loader} style={{width:70,height:70}} />
                    </View>
                    <View style={{marginHorizontal:8, alignContent:'center',alignItems:'center',width:70,height:70,borderRadius:30,overflow: 'hidden'}} >
                     <Image source ={images.story_loader} style={{width:70,height:70}} />
                    </View>
                   </View> 
                   }
                  </View>
                </View>
              </View>
                <View style={Styles.container}>
                 <TouchableOpacity  onPress={() => name ? navigation.navigate('AddPost') : navigation.navigate('Login')}>
                  <View style={{flexDirection:'row'}}>
                    <Image
                      source={{uri: 'https://picsum.photos/600'}}
                      style={Styles.personImage}/> 
                    <View style={{flexDirection:'column'}}>
                    <Text style={{paddingLeft:15,justifyContent:'flex-start', color:'gray',alignSelf:'flex-start', fontSize:18,fontWeight:'bold',letterSpacing:0.5}}>{name ? 'Hi' : null} {name} {name ? '\n' : null}</Text>
                    <Text style={{marginTop:-20,paddingLeft:15,justifyContent:'flex-start', color:'lightgray', alignSelf:'flex-start',fontSize:18,fontWeight:'bold',letterSpacing:0.5}}>What's on your mind?</Text>
                    </View>
                  </View>
                 
                    <View style={{flexDirection:'row',justifyContent:'flex-start',marginTop:15}}>
                      <View style={{width:'35%',flexDirection:'row',marginLeft:12}}>
                        <Icon name="camera" size={20}/>
                        <Text style={{paddingLeft:10,justifyContent:'center', color:'gray',alignSelf:'center',fontFamily:"BigShouldersText-Black",fontSize:12}}>ADD PHOTO</Text>
                      </View>  
                      <View style={{width:'65%',borderLeftWidth:1,flexDirection:'row',paddingLeft:30}}>
                        <Icon name="video" size={20}/>
                        <Text style={{paddingLeft:10,justifyContent:'center', color:'gray',alignSelf:'center',fontFamily:"BigShouldersText-Black",fontSize:12}}>ADD VIDEO</Text>
                      </View>  
                                
                    </View>
                </TouchableOpacity> 
               </View>
            </View>
          )}
            keyExtractor={(item) => item.id.toString()}
              renderItem={({item, index}) => (
                item.users ?   
                 <UserContainer users={item.users}/>
                // null
                :
                // <Post post={item} navigation={navigation} setModalVisible={setModalVisible}/> 
                <Post post={item} navigation={navigation}/> 
              )}
            data={data}
            onEndReached={() => loadMoreData()}
            onEndReachedThreshold={.5}
            ListFooterComponent={() => (
              <View style={{marginBottom:30}}>
                {loading ?
                <ActivityIndicator size="large" color="skyblue" />:
                <Text style={{color:'white', alignSelf:'center'}}>No more data available.</Text>}
              </View>
            )}
        />
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  headerLeftContainer: palette.header.headerLeftContainer,
  headerLeftImage: palette.header.headerLeftImage,
  headerRightContainer: palette.header.headerRightContainer,
  headerRightImage: palette.header.headerRightImage,

  personImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginLeft:10,  
  },
  container:{
    flex:1,
    paddingBottom:20,
    padding:10,
    margin:10,
    backgroundColor:'#fff',
    borderRadius:10,
    
  },
  buttonContainer: {
   width:'60%',
   marginTop: 5,
   alignItems:'center',
   backgroundColor: '#0088f8',
   justifyContent: 'center',
   marginStart: 10,
   height:35
  },
  postText: {
    alignContent:'center',
    color: 'white',
  },
  header: {
    backgroundColor:'red',
    width: 50,
    height: 50,  
  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   // marginTop: 68,
  //   backgroundColor:'black'
  // },
});