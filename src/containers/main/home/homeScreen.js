import React, {useState} from 'react';
import {SafeAreaView, FlatList, View, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import Post from './post/Post';
import colors from '../../../res/colors';
import UserContainer from './UserSuggestion/UserContainer';
import palette from '../../../res/palette';
import {getPost} from '../../../services/auth_curd';
import AsyncStorage from '@react-native-community/async-storage';

export default function homeScreen({navigation}) {
  const users = [
    {
      key: 'Friends of friend',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
    {
      key: 'Tipster follwed by friends',
      hasStory: true,
      src: 'https://picsum.photos/600',
    },
    {
      key: 'Tipsters ',
      hasStory: true,
      src: 'https://picsum.photos/600',
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

  const checkAuth = async () => {
    let value = await AsyncStorage.getItem('userData');
    if (value){
      value = JSON.parse(value).first_name + ' ' + JSON.parse(value).last_name;
      setName(value);
    }else{
      setName(null);
    }
  }

  const getPostData = async () => {
      getPost(page, 'token').then((response) => {
        let data = response.data.data.data.data;
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
    console.log(page,'-----------------')
    getPostData();
  //   const unsubscribe = navigation.addListener('focus', (e) => {
  //     checkAuth();
  //     setData(firstData);
  //     setLoading(true);
  //     if (page == 1){
  //       getPostData();
  //     }else{
  //       setPage(1);
  //     }
  // }
  // );
  
  //   return unsubscribe;
  }, [navigation, page]);

  const loadMoreData = () => {
      setPage(page+1)
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor: colors.background}}>
    <FlatList
        ListHeaderComponent={() => (
          <View style={{marginBottom:10}}>
              <View style={Styles.container}>
                <Text style={{textAlign:'center',justifyContent:'center', color: '#fff',}}>{name ? 'Hi' : null} {name} {name ? '\n' : null} Post your pics and Mind</Text>
                <Image
              source={{uri: 'https://picsum.photos/600'}}
              style={Styles.personImage}
            />
             
               <View style={Styles.container2}>
            
          <TouchableOpacity style={Styles.buttonContainer} onPress={() => name ? navigation.navigate('AddPost') : navigation.navigate('Login')}>
            <Text style={Styles.postText}>Add Post</Text>
          </TouchableOpacity>
               </View>   
            </View>
          </View>
            )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => (
            item.users ?   
            <UserContainer users={item.users}/>
            :
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
    width: 35,
    height: 35,
    borderRadius: 0,
    marginLeft:10,
    marginTop:-10,
  },
  container:{
    height:'auto',
    justifyContent: 'center',
    paddingBottom:20,
    paddingTop:10,
    backgroundColor:'gray'
   },
    container2:{
      maxHeight:30,
      flexDirection: 'row',
      justifyContent:'center',
      marginTop:-20,
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
});