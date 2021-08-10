 
import React from 'react';
import {ImageBackground, Dimensions, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Platform, StatusBar, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../res/images';
import { getLeages } from '../../../services/auth_curd';
import HeaderScreen from './HeaderScreen';

const windowHeight = Dimensions.get('window').height;

export default function LeagueScreen({navigation, route}) { 
    const item = route.params.item
    const leagues = [];
    const androidStatusBar = 0;
    const iosStatusBar = StatusBar.currentHeight + 50;
    const [leagues_data, setLeagues_data] = React.useState(leagues)
    React.useLayoutEffect(() => {
      navigation.setOptions({
        title:'',
        headerStatusBarHeight: Platform.OS === 'android' ? androidStatusBar : iosStatusBar,
        headerTransparent: true,
        headerLeft: () => (
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.leagueBackButton} onPress={()=> navigation.goBack()}>
              <Image onPress={()=> navigation.goBack()} source={images.backButton}  style={{width:12, height:12}} />
            </TouchableOpacity>
            <View style={styles.leagueHeaderIcon}>
              <Icon name="futbol" size={19} color="darkblue" />
            </View>
            <Text style={styles.headerTitleStyle}>
            {item.name}
            </Text>
          </View>
        ),
        // headerTitle: () => (
        //   <View style={{flexDirection:'row'}}>
        //     <View style={styles.leagueHeaderIcon}>
        //       <Icon name="futbol" size={19} color="darkblue" />
        //     </View>
        //     <Text style={styles.headerTitleStyle}>
        //     {item.name}
        //     </Text>
        //   </View>
        // ),
        headerRight: () => (
          <HeaderScreen navigation={navigation} />
        ) 
      });
    }, [navigation]);

    React.useEffect(() => {
      getLeagueData()
    },[]);

    const getLeagueData = () => {
      console.log('get leagues...');
      getLeages(item.id).then((response) => {
        // console.log(response.data.data);
        setLeagues_data(response.data.data);
      }, (error) => { 
        console.log(error.response);
       });
    }
    const Item = ({item}) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Matches', {item})}>
        <View style={styles.listItem}>
          {/* <Image source={{uri:item.photo}}  style={{width:60, height:60,}} /> */}
          <View style={{justifyContent:'center'}}>
            <View style={styles.leaguesIcon}>
            <Icon name="futbol" size={45} color="darkblue" />
            </View>
          </View>
          <View style={styles.leaguesNameContainer}>
            <Text style={styles.leaguesTextStyle}>{item.name.toUpperCase()}</Text>
          </View>
        </View>
        </TouchableOpacity>
      );
    }

    return (
      <ImageBackground source={images.sports_background} style={styles.backgroundStyle} >
      <View style={styles.container}>
        {
          leagues_data.length ? 
          <FlatList
          style={{flex:1, marginTop:Platform.OS ==='ios' ? 110 : 60}}
          data={leagues_data}
          ListHeaderComponent={() => (
            <View>
                <Text style={styles.leagueTitle}> Select League </Text>
            </View>
          )}
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
    width:"90%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:20,
  },
  headerTitleStyle:{
    color: 'white',
    fontSize: 19,
    letterSpacing:1,
    textAlign:'left',
    fontFamily:"BigShouldersText-Black",
    marginTop: Platform.OS === 'ios' ? 0 : -4
  },
  headerBell:{
    marginHorizontal:10,
    paddingTop:6
  },
  headerBalanceContainer:{
    marginHorizontal:10,
    paddingHorizontal:17,
    backgroundColor:'white',
    borderRadius:25
  },
  balanceTitle:{
    fontSize:10,
    color:'gray',
    letterSpacing:1,
    fontFamily:"BigShouldersText-Black",
    alignSelf:'center'
  },
  balanceValue:{
    fontSize:14,
    letterSpacing:1,
    fontFamily:'BigShouldersText-Black',
    marginTop:-5
  },
  leaguesIcon:{
    backgroundColor:"#eaeef2",
    padding:15,
    borderRadius:50,
    height:75,
    width:75,
  },
  leagueHeaderIcon:{
    backgroundColor:"#eaeef2",
    padding:3,
    borderRadius:15,
    height:25,
    width:25,
    marginRight:10,
    marginStart:30
  },
  leaguesNameContainer:{
    flexShrink: 1,
    alignItems:'flex-start',
    paddingStart:15,
    // paddingRight:15,
    justifyContent:'center'
  },
  leaguesTextStyle:{
    fontSize:20,
    margin:10,
    letterSpacing:.5,
    fontFamily:"BigShouldersText-Black",
    color:'gray',
  },
  leagueTitle:{
    color:'white',
    padding:10,
    margin:10,
    fontSize:23,
    fontFamily:"BigShouldersText-Black",
    letterSpacing:.5,
  },
  leagueBackButton:{
    backgroundColor:'rgba(1,41,50, 0.5)',
    padding:6,
    borderRadius:15,
    height:25,
    width:25,
    marginHorizontal:10
  }
});