 
import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Platform, StatusBar ,Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../res/images';
import { getMatches } from '../../../services/auth_curd';
import HeaderScreen from './HeaderScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function MatchScreen({navigation, route}) { 
    const item = route.params.item
    // console.log(item)
    const matches = [];
    const androidStatusBar = 0;
    const iosStatusBar = StatusBar.currentHeight + 50;
    const [matches_data, setMatches_data] = React.useState(matches)
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTransparent: false,
        headerStatusBarHeight: Platform.OS === 'android' ? androidStatusBar : iosStatusBar,
        headerStyle: {
            backgroundColor: 'rgba(1,41,93, 0.8)'
          },
        headerLeft: () => (
          <TouchableOpacity style={styles.matchBackButton} onPress={()=> navigation.goBack()}>
              <Image onPress={()=> navigation.goBack()} source={images.backButton}  style={{width:12, height:12}} />
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <View style={{flexShrink: 1, width:windowWidth*0.45, marginStart:Platform.OS === 'ios' ? -50 : 0,}}>
              <Text style={styles.headerTitleStyle}>
              {item.name}
              </Text>
          </View>
        ),
        headerRight: () => (
          <HeaderScreen navigation={navigation} />
        ) 
      });
    }, [navigation]);

    React.useEffect(() => {
      getMatchData()
    },[]);

    const getMatchData = () => {
      console.log('get matches...');
      getMatches(item.id).then((response) => {
        console.log(response.data.matches);
        setMatches_data(response.data.matches);
      }, (error) => { 
        console.log(error.response);
       });
    }
    const months = {
      1:'Jan',
      2:'Feb',
      3:'March',
      4: 'April',
      5:'May',
      6:'June',
      7:'July',
      8:'Aug',
      9:'Sept',
      10:'Oct',
      11:'Nov',
      12:'Dec'
    };
    const getTime = (dates, times) => {
      let hourstr = '';
      let datestr = months[parseInt(dates.substr(5, 2), 10)] + ' ' + dates.substr(8, 2);
      let hourint = parseInt(times.substr(0, 2), 10);
      if(hourint == 0){
        hourstr = '12:'+ times.substr(3, 2) + ' AM';
      }else if(hourint > 12){
        hourstr = hourint - 12;
        if(hourstr < 10){
          hourstr = '0' + hourstr + ':' + times.substr(3, 2) + ' PM';
        }else{
          hourstr = hourstr + ':' + times.substr(3, 2) + ' PM';
        }
      }else{
        if(hourint < 10){
          // console.log(hourint);
          hourstr = '0' + hourint + ':' + times.substr(3, 2) + ' AM';
        }else{
          hourstr = hourint + ':' + times.substr(3, 2) + ' AM';
        }
      }
      let timestr = datestr + ' - ' +  hourstr;
      return timestr;
    }

    const Item = ({item}) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Markets', {item})}>
        <View style={styles.listItem}>
          <View style={{flex:1,flexDirection:'row', padding:10,}}>
            {/* <Image source={{uri:item.photo}}  style={{width:60, height:60,}} /> */}
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <View>
              <Icon name="futbol" size={45} color="darkblue" />
              </View>
            </View>
            <View style={styles.matchesNameContainer}>
              <Text style={styles.matchesTextStyle}>{item.name}</Text>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <View>
                <Icon name="futbol" size={45} color="darkblue" />
              </View>
            </View>
          </View>
          <View style={{height:1, backgroundColor:'lightgray'}}></View>
          <View style={{paddingHorizontal:10, paddingVertical:2,flexDirection:'row',}}>
            <View style={{flex:1, alignItems:'flex-start'}}>
              <Text style={{fontFamily:"BigShouldersText-Black", color:'gray', fontSize:12}}>{getTime(item.match_date, item.match_time)}</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
              <Text style={{fontFamily:"BigShouldersText-Black", color:'gray', fontSize:12}}>MNT Bank Stadium</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
      );
    }

    return (
        <View style={styles.container}>
            <View style={{paddingTop:5, backgroundColor:'rgba(1,41,93, 0.8)', flexDirection:'row'}} >
              <View style={{flex:2, alignItems:'center', margin:10}}>
                <Text style={styles.matchTitle}> FAVORITE GAMES </Text>
              </View>
              <View style={{flex:1.5, alignItems:'center', margin:10}}>
                <View style={{borderWidth:.2, borderColor:'white', backgroundColor:'rgba(1,41,50, 0.5)', borderRadius:50}}>
                  <Text style={[styles.matchTitle,{color:'white'}]}> TOP GAMES </Text>
                </View>
              </View>
              <View style={{flex:1.5, alignItems:'center', margin:10}}>
                <Text style={styles.matchTitle}> ALL GAMES </Text>
              </View>
            </View>

            {
              matches_data.length ? 
              <FlatList
              style={{flex:1, marginTop:10}}
              data={matches_data}
              renderItem={({ item }) => <Item item={item}/>}
              keyExtractor={item => item.id}
              /> : 
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator size="large" color="blue" /> 
              <Text style={{color:"blue", fontSize:18}}>Loading...</Text>
             </View>
           }
        </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray'
  },
  listItem:{
    marginBottom:10,
    backgroundColor:"#FFF",
    width:"100%",
    alignSelf:"center",
  },
  headerTitleStyle:{
    color: 'white',
    fontSize: 19,
    // letterSpacing:1,
    textAlign:'left',
    fontFamily:"BigShouldersText-Black",
    marginLeft:-15,
    marginTop:-4
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
  matchesNameContainer:{
    flex:4,
    flexShrink: 1,
    alignItems:'center',
    // paddingStart:15,
    // paddingRight:15,
    justifyContent:'center'
  },
  matchesTextStyle:{
    fontSize:20,
    margin:10,
    letterSpacing:.5,
    fontFamily:"BigShouldersText-Black",
    // color:'gray',
  },
  matchTitle:{
    color:'lightgray',
    // padding:10,
    marginHorizontal:13,
    marginVertical:4,
    fontSize:12,
    fontFamily:"BigShouldersText-Black",
    letterSpacing:.5,
  },
  matchBackButton:{
    backgroundColor:'rgba(1,41,50, 0.5)',
    padding:6,
    borderRadius:15,
    height:25,
    width:25,
    marginLeft:10
  }
});