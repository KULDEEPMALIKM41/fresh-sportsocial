 
import React from 'react';
import {ImageBackground, Dimensions, StyleSheet, Text, View, FlatList, Platform, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../res/images';
import { getSports } from '../../../services/auth_curd';
import HeaderScreen from './HeaderScreen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SportScreen({navigation}) { 
    const sports = [];
    const androidStatusBar = 0;
    const iosStatusBar = StatusBar.currentHeight + 50;
    const [sports_data, setSports_data] = React.useState(sports)
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        title:'',
        headerStatusBarHeight: Platform.OS === 'android' ? androidStatusBar : iosStatusBar,
        headerTransparent: true,
        headerLeft: () => (
          <Text style={styles.headerTitleStyle}>
          Select Sports
          </Text>
        ),
        headerRight: () => (
         <HeaderScreen navigation={navigation} />
        ) 
      });
    }, [navigation]);


   

    React.useEffect(() => {
      getSportsData()
    },[]);

    const getSportsData = () => {
      console.log('get sports...');
      getSports().then((response) => {
        setSports_data(response.data.data);
      }, (error) => { 
        console.log(error.response);
       });
    }

    const Item = ({item}) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Leagues', {item})}>
        <View style={styles.listItem}>
          {/* <Image source={{uri:item.photo}}  style={{width:60, height:60,}} /> */}
          <View style={styles.sportsIcon}>
          <Icon name="futbol" size={45} color="darkblue" />
          </View>
          <View style={styles.sportsNameContainer}>
            <Text style={styles.sportsTextStyle}>{item.name.toUpperCase()}</Text>
          </View>
        </View>
        </TouchableOpacity>
      );
    }

    return (
      <ImageBackground source={images.sports_background} style={styles.backgroundStyle} >
      <View style={styles.container}>
        {
          sports_data.length ? 
          <FlatList
          style={{flex:1, marginTop:Platform.OS ==='ios' ? 110 : 60}}
          data={sports_data}
          renderItem={({ item }) => <Item item={item}/>}
          keyExtractor={item => item.id}
        /> :
        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size="large" color="skyblue" /> 
         <Text style={{color:"white", fontSize:18}}>Loading...</Text>
        </View>
        }
        </View>
      </ImageBackground>
    );
  }

const styles = StyleSheet.create({
  backgroundStyle:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height:windowHeight
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(1,41,93, 0.5)'
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"85%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:20
  },
  sportsIcon:{
    backgroundColor:"#eaeef2",
    padding:15,
    borderRadius:50,
    height:75,
    width:75
  },
  sportsNameContainer:{
    alignItems:'flex-start',
    paddingStart:20,
    justifyContent:'center'
  },
  sportsTextStyle:{
    fontSize:25,
    margin:10,
    letterSpacing:1,
    fontFamily:"BigShouldersText-Black",
    color:'gray'
  },
  headerTitleStyle:{
    color: 'white',
    fontSize: 19,
    letterSpacing:1,
    left:15,
    fontFamily:"BigShouldersText-Black"
  },
});