import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView} from 'react-native';
import { Dimensions } from 'react-native';
import images from '../../../res/images';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getOdds } from '../../../services/auth_curd';
import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MatchScreen({navigation, route}) {
  const item = route.params.item
  // console.log(item)
  const [selected, setSelected] = React.useState([])
  const [odds_data, setOdds_data] = React.useState(false)
  const [token, setToken] = React.useState(null)
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

  const checkAuth = async () => {
    console.log('checking...');
    let value = await AsyncStorage.getItem('userData');
    if (value){
      value = JSON.parse(value).token
      setToken(value);
    }else{
      setToken(null);
    }
  }

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerStyle: {
          backgroundColor: 'rgba(1,41,93, 0.8)'
        },
      headerLeft: () => (
        <TouchableOpacity style={styles.oddsBackButton} onPress={()=> navigation.goBack()}>
            <Image onPress={()=> navigation.goBack()} source={images.backButton}  style={{width:12, height:12}} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={{flexShrink: 1, width:200}}>
            <Text style={styles.headerTitleStyle}>
            Top Games
            </Text>
        </View>
      ), 
    });
  }, [navigation]);

  React.useEffect(() => {
    getOddsData()
    const unsubscribe = navigation.addListener('focus', (e) => {
      checkAuth();
      }
    );
    return unsubscribe
  },[]);

  const getOddsData = () => {
    console.log('get odds...');
    getOdds(item.id).then((response) => {
      // console.log(response.data.data);
      setOdds_data(response.data.data);
    }, (error) => { 
      console.log(error.response);
     });
  }

  const updateStatus = (keyName, index, selected) => {
    let temp_selected = []
    console.log('hello', selected);
    let temp_odds_data  = odds_data;
    temp_odds_data.odds_list[keyName][index]['selected'] = !selected;
    // setOdds_data(false);
    setOdds_data({...temp_odds_data});
    for (let key of Object.keys(temp_odds_data.odds_list)){
      for (let item of temp_odds_data.odds_list[key]){
        if (item.selected){
            temp_selected.push(item)
        }
      }
    }
    setSelected([...temp_selected])
    console.log(temp_selected)
  }

  return (

  <View style={styles.container}>
  { odds_data ?
  <>
  <ScrollView >
  <View style={{flex:1,flexDirection:'row', padding:10, height:100, marginTop:10, backgroundColor:'white'}}>
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <View>
      <Icon name="futbol" size={45} color="darkblue" />
      </View>
    </View>
    <View style={styles.matchesNameContainer}>
      <Text style={styles.matchesTextStyle}>{odds_data.name}</Text>
    </View>
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <View>
        <Icon name="futbol" size={45} color="darkblue" />
      </View>
    </View>
  </View>
  <View style={{paddingHorizontal:15, height:35,flexDirection:'row',}}>
    <View style={{flex:1, alignItems:'flex-start', justifyContent:'center'}}>
      <Text style={{fontFamily:"BigShouldersText-Black", color:'gray', fontSize:12}}>{getTime(item.match_date, item.match_time)}</Text>
    </View>
    <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
      <Text style={{fontFamily:"BigShouldersText-Black", color:'gray', fontSize:12}}>MNT Bank Stadium</Text>
    </View>
  </View>
   {/* <View style={{flex:1,width:'95%',height:windowHeight*0.11,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignSelf:'center'}}>
      <View style={styles.listItem}> 
        <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={styles.teamlogo} />
        <Text style={styles.team1}>HUE</Text>
      </View>
      <View style={{justifyContent:'center',alignSelf:'center'}}>
        <Text style={styles.team1text}>@</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.team2text}>AHD</Text>
        <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={styles.teamlogo} /> 
      </View> 
  </View>
    <View style={{height:23,backgroundColor:'#e6e6e6',flexDirection:'row'}}> 
          <Text style={styles.date}>May 18 - 10:00 pm</Text>
          <Text style={styles.place}>MNT Bank Stadium</Text>
    </View>

    */}

    <View style={styles.containers}>
      <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', alignItems:'center', marginTop:10}}>
      <View>
        <Text style={styles.market}>Market Name</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Image source={{uri: "https://picsum.photos/600"}}  style={{ zIndex:1,width:30, height:30,borderColor:'#fff',borderWidth:2,borderRadius:10}} />
        <Image source={{uri: "https://picsum.photos/200"}}  style={{ width:30, height:30,borderColor:'#fff',borderWidth:2,borderRadius:10,right:15}} />
          <View style={styles.container3}>
            <Text style={styles.oddsfonts_light}>+2</Text>
          </View>
      </View>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity>
          <Text style={{color:'blue',fontFamily:'BigShouldersText-Black',borderBottomWidth:2,borderColor:'blue'}}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color:'#666666',fontFamily:'BigShouldersText-Black'}}>SPORTSBOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color:'#666666',fontFamily:'BigShouldersText-Black'}}>TIPSTER</Text>
        </TouchableOpacity>
      </View>
      {Object.keys(odds_data.odds_list).length ?
        Object.keys(odds_data.odds_list).map(function(keyName, keyIndex) {
          return (
            <View key={keyIndex} style={styles.container5}>
            <View style={{height:40,justifyContent:'center'}}>
                <Text style={styles.market}>{keyName}</Text>
            </View>
            <View style={{width:'95%',flexDirection:'row',flexWrap:'wrap', justifyContent:'space-around', marginBottom:0}}> 
            {
              odds_data.odds_list[keyName].map(function(value, index) {
                return (
                  <TouchableOpacity key={index}  style={value.selected ? styles.odd_box_blue : styles.odd_box_white} onPress={()=> updateStatus(keyName, index, value.selected)}>
                    <Text style={value.selected ? styles.oddsfonts_light : styles.oddsfonts_gray}>{value.display_name}</Text>
                    <Text style={value.selected ? styles.oddsfonts_light_b : styles.oddsfonts_dark_b}>{value.value}</Text>
                    <Text style={value.selected ? styles.oddsfonts_light_small : styles.oddsfonts_blue}>Bet365</Text>
                  <View style={{flexDirection:'row',marginTop:15,justifyContent:'center',marginBottom:windowHeight*-0.028}}>
                    <Image source={{uri: "https://picsum.photos/600"}}  style={styles.odd_img} />
                    <View style={{width:30, height:30,borderColor:'#fff',borderWidth:2,borderRadius:10,right:10,backgroundColor:'gray',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
                      <Text style={styles.oddsfonts_light}>+2</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                )
            })
            }
            </View>
            </View>
          )
      })
      : null}
      <View style={{marginTop:25}}/>
      </View>

   </ScrollView>
  {selected.length ?
  <TouchableOpacity style={styles.buttonContainer} onPress={() => token ? navigation.navigate('Placebet') : navigation.navigate('Login')}>
    <Text style={styles.buttomButton}>Continue</Text>
  </TouchableOpacity> :
  <TouchableOpacity style={styles.disableButtonContainer}>
  <Text style={styles.disableButtomButton}>Continue</Text>
</TouchableOpacity>
  }
  </> : null }
  </View>
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#5c5cd6',
    justifyContent: 'center',
    paddingVertical:14
  },
  buttomButton: {
    color: '#fff',
    fontFamily:"BigShouldersText-Black",
    fontSize:20
  },
  disableButtonContainer: {
    alignItems: 'center',
    // backgroundColor: '#5c5cd6',
    backgroundColor: '#98AFC7',
    justifyContent: 'center',
    paddingVertical:14
  },
  disableButtomButton: {
    color: 'lightgray',
    fontFamily:"BigShouldersText-Black",
    fontSize:20
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
     height:'auto',  
  },
  containers: {
    flex: 1,
    height:'auto',
    backgroundColor: '#fff', 
    paddingLeft:10,  
  },
  listItem:{
    backgroundColor:"#FFF",
    flexDirection:"row",
    
  },
  team1:{
    fontWeight:"bold",
    fontSize:16,
    alignSelf:'center'
  },
  team1text:{
    fontWeight:"bold",
    fontSize:18,
    alignSelf:'center',
    color:'#666666'
  },
  team2text:{
    fontWeight:"bold",
    fontSize:16,
    justifyContent:'center',
    alignSelf:'center'
  },
  date:{
    justifyContent:'center',
    alignSelf:'center',
    fontSize:12,
    paddingLeft:15,
    fontWeight:'bold',
    color:'#666666',
    fontFamily:'Poppins-Regular'
  },
  place:{
    textAlign:'right',
    right:15,
    fontSize:12,
    alignSelf:'center',
    position:'absolute',
    fontWeight:'bold',
    color:'#666666',
    fontFamily:'Poppins-Regular'
  },
  teamlogo:{
    width:50,
    height:50,
    alignSelf:'center'
  },
  market:{
    paddingLeft:5,
    fontFamily:"BigShouldersText-Black",
    fontSize:18,
    color:'black'
  },

  container3:{
     width:30,
     height:30,
     zIndex:-1,
     borderColor:'#fff',
     borderWidth:2,
     borderRadius:10,
     right:25,
     backgroundColor:'gray',
     textAlign:'center',
     justifyContent:'center',
     alignSelf:'center'
  },
  container5:
  {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:20,
  },
  menu:
  {
    flexDirection:'row',
    justifyContent:'space-between',
    textAlign:'center',
    width:'60%',
    alignSelf:'center',
    marginTop:20,
    height:20,
  },
  oddsfonts_light:{
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    color:'#fff',
    fontSize:16,
  },
  oddsfonts_light_small:{
    justifyContent:'center',
    alignSelf:'center',
    color:'#fff',
    fontSize:12,
    marginTop:5
  },
  oddsfonts_light_b:
  {
    justifyContent:'center',
    alignSelf:'center',
    color:'#fff',
    fontWeight:'bold',
    marginTop:5
  },
  oddsfonts_gray:
  {
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    color:'gray',
    fontSize:16,
  },
  oddsfonts_blue:
  {
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    color:'blue',
    fontSize:12,
    marginTop:5
  },
  oddsfonts_dark_b:
  {
    justifyContent:'center',
    alignSelf:'center',
    color:'black',
    fontWeight:'bold',
    marginTop:5
  },
  odd_img:
    {
      zIndex:1,
      width:30,
      height:30,
      borderColor:'#fff',
      borderWidth:2,
      borderRadius:10,

    },
    odd_box_blue:{
      width:'30%',
       height:110,
       borderColor:'lightgray',
       borderWidth:1,
       borderRadius:10,
       backgroundColor:'#5c5cd6',
       textAlign:'center',
       justifyContent:'center',
       alignSelf:'center',
       marginBottom:25
    },
    odd_box_white:
    {
      width:'30%', 
      height:110,
      borderColor:'lightgray',
      borderWidth:1,
      borderRadius:10,
      backgroundColor:'#fff',
      textAlign:'center',
      justifyContent:'center',
      alignSelf:'center',
      marginBottom:25
    },
    oddsBackButton:{
      backgroundColor:'rgba(1,41,50, 0.5)',
      padding:6,
      borderRadius:15,
      height:25,
      width:25,
      marginLeft:10
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
});