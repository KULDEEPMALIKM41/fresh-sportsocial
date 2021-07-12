import React , {useState} from 'react';
import { StyleSheet,Svg, Text, View, FlatList, Image,Picker, TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getBetslips} from '../../../services/auth_curd';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderScreen from '../beting/HeaderScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MetchScreen({navigation, route}) { 
    const betslips = [];
    const [selected_button, setSelected_button] = React.useState("ALL")
    const [betslips_data, setBetslips_Data] = React.useState(betslips)
    const [filtered_data, setFiltered_Data] = React.useState(betslips)
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTransparent: false,
        headerStyle: {
            backgroundColor: '#5365A2'
          },
        headerTitle: () => (
          <View style={{flexShrink: 1, width:200}}>
              <Text style={styles.headerTitleStyle}>
                 MyBets
              </Text>
          </View>
        ),
        headerRight: () => (
          <HeaderScreen navigation={navigation} />
        ) 
      });
    }, [navigation]);

  React.useEffect(() => {
    getBetslipsData();
    const unsubscribe = navigation.addListener('focus', (e) => {
      getBetslipsData();
    }
  );
  return unsubscribe
  }, [navigation]);

  const getFilteredData = (all_data, filter_type) => {
      let filter_data = [] 
      if(filter_type == "ALL"){
        filter_data = all_data;
      }else if(filter_type == "UNRESOLVED"){
        for(let bet of all_data){
          if (bet.status_id == 3){
            filter_data.push(bet)
          }
        }
      }else if(filter_type == "RESOLVED"){
        for(let bet of all_data){
          if (bet.status_id != 3){
            filter_data.push(bet)
          }
        }
      }
      setSelected_button(filter_type)
      setFiltered_Data(filter_data)
    }



  const getBetslipsData = async () => {
    let value = await AsyncStorage.getItem('userData');
    if(value){
      token = JSON.parse(value).token ;
      getBetslips(token).then((response) => {
        setBetslips_Data(response.data.data);
        getFilteredData(response.data.data, 'ALL')
      }, (error) => { 
        console.log(error.response);
      });
    }else{
      navigation.navigate("Login")
    }
  }

  const [defaultStyle, setDefaultStyle] = useState(true);
 
  return (

  <View style={styles.container}>
    {
      betslips_data.length ? 
      <ScrollView>
      <View style={styles.topbar}>                 
        <TouchableOpacity onPress={() => getFilteredData(betslips_data, 'ALL')}>
           <Text style={selected_button == "ALL" ? styles.headText_s : styles.headText}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getFilteredData(betslips_data, 'RESOLVED')}>
           <Text style={selected_button == "RESOLVED" ? styles.headText_s : styles.headText}>RESOLVED</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getFilteredData(betslips_data, 'UNRESOLVED')}>
           <Text style={selected_button == "UNRESOLVED" ? styles.headText_s : styles.headText}>UNRESOLVED</Text>
        </TouchableOpacity>
       </View>
     <View style={{flex: 1, flexDirection: 'column',marginLeft:10,marginRight:10,marginBottom:80}}>
       {filtered_data.map(function (item, index) {
         return(
           <View style={styles.boxes} key={'box'+index}> 
             <View style={{ flexDirection:'row',}}>
             <View style={{width:'62%'}} >
               <Text style={styles.box_header} >{item.odd_type_name}</Text>
             </View>
               <View style={styles.box_team}> 
                 <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={{width:35,height:35,}} />
            
                 <Text style={styles.teamN}>{
         (item.match_name !== undefined) ? item.match_name.split('vs')[0].substring(0,3).toUpperCase() : ''
       }</Text>
                 <Text style={{alignSelf:'center',color:'#666666'}}>@</Text>
                 <Text style={styles.teamN}>{
         (item.match_name !== undefined) ? item.match_name.split('vs')[1].substring(0,4).toUpperCase() : ''
       }</Text>
                 <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={{width:35,height:35}} /> 
              </View> 
             </View>
             <View style={styles.hr} />
             <View style={{padding:10}}>
               <View style={{flexDirection:'row'}}>
                 <Text style={{fontSize:14,color:'#666666', letterSpacing:.5, fontFamily:"BigShouldersText-Black",}}>For -</Text>           
                 <Text style={{fontSize:14, letterSpacing:.5, fontFamily:"BigShouldersText-Black",}}> {item.market_type}</Text> 
           {
             item.status_id == 3 ? 
             <View style={styles.Mcontainer}>
             <Text style={{fontSize:20,color:'#ffcc00',fontWeight:'bold'}}> ? </Text>
             <Text style={{fontSize:14,color:'#ffcc00', letterSpacing:.5, fontFamily:"BigShouldersText-Black",}}>Unresolved</Text>  
           </View> :  item.status_id == 8 ?
             <View style={styles.Losecontainer}>
             <Text style={{fontSize:20,color:'#F93832', letterSpacing:.5, fontFamily:"BigShouldersText-Black",}}> X </Text>
             <Text style={{fontSize:14,color:'#F93832', letterSpacing:.5, fontFamily:"BigShouldersText-Black", }}>Lose</Text>  
           </View> : item.status_id == 7 ?
             <View style={styles.Gcontainer}>
             <Icon name="trophy" size={20} color="#42AD66" />
             <Text style={{fontSize:14,color:'#42AD66', letterSpacing:.5, fontFamily:"BigShouldersText-Black", }}>  Won</Text>  
           </View> : null
           }
         </View>
            <View style={{flexDirection:'row'}}>
               <Text style={{fontSize:14, letterSpacing:.5,fontFamily:"BigShouldersText-Black", }}>Odds Selected </Text>  
               <Text style={{fontSize:14,color:'#666666', letterSpacing:.5, fontFamily:"BigShouldersText-Black",}}>{item.value}</Text> 
            </View>
            <View style={{flexDirection:'column'}}>
             <View style={{flexDirection:'row'}}>
                 {/* <Image source={require('../../../res/images/Ydot.png')} style={{width:15,height:15,alignSelf:'center'}} /> */}
                 <Text style={{justifyContent:'center',fontSize:16, letterSpacing:.5, fontFamily:"BigShouldersText-Black",}}> {item.stake_amount}</Text> 
                 <Text style={{right:50,position:'absolute',alignSelf:'flex-end',fontSize:14,color:'#666666', letterSpacing:.5, fontFamily:"BigShouldersText-Black",}}>Pot. Win</Text>
             </View>
             <View style={{flexDirection:'row'}}>
               <Text style={styles.bettext}>Bet 365</Text>
               <Text style={{right:50,position:'absolute', letterSpacing:.5, fontFamily:"BigShouldersText-Black",fontSize:16}}>$ {item.win_amount}</Text>
             </View>
             {/* <Image source={require('../../../res/images/barcode1.png')}  style={{width:35,height:35,right:0,position:'absolute',margin:5}} /> */}
           </View>
          </View>
         </View>
         )  
       })}
         </View>
         </ScrollView> :
           <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
           <ActivityIndicator size="large" color="blue" /> 
           <Text style={{color:"blue", fontSize:18}}>Loading...</Text>
          </View>
    }
</View> 
    );
  }
 

const styles = StyleSheet.create({

  container:
  {
    flex: 1,
    backgroundColor: '#f2f2f2',  
  },
  headText: 
  {
    color: '#fff',
    fontFamily:"BigShouldersText-Black",
  },
  headText_s: 
  {
    color: '#fff',
    fontFamily:"BigShouldersText-Black",
    borderWidth:1,
    borderColor:'#778BCE',
    borderRadius:15,
    width:90,
    textAlign:'center',
    backgroundColor:'#5365A2',
    opacity:1,
    letterSpacing:.5,
 
  },
  boxes:
  {
    height:'auto',
    backgroundColor: '#fff',
    marginTop:20,
    borderRadius:15,
    padding:5,
    margin:5
  },
  Mcontainer:    
  {
    backgroundColor:'#fff',
    alignItems: "center",
    width:120,
    height:30,
    borderWidth:2,
    alignSelf: "center",
    borderRadius:5,
    borderColor:'#ffcc00',
    right:5,
    position:'absolute',
    flexDirection:'row',
    justifyContent:'center'
  },
  Gcontainer:    
  {
    backgroundColor:'#fff',
    alignItems: "center",
    width:120,
    height:30,
    borderWidth:2,
    alignSelf: "center",
    borderRadius:5,
    borderColor:'#42AD66',
    right:5,
    position:'absolute',
    flexDirection:'row',
    justifyContent:'center'
  },
  Losecontainer:    
  {
    backgroundColor:'#fff',
    alignItems: "center",
    width:120,
    height:30,
    borderWidth:2,
    alignSelf: "center",
    borderRadius:5,
    borderColor:'#F93832',
    right:5,
    position:'absolute',
    flexDirection:'row',
    justifyContent:'center'
   
  },
  Lcontainer: {
    backgroundColor:'#fff',
    alignItems: "center",
    width:120,
    height:30,
    borderWidth:1,
    right:5,
    alignSelf:'center',
    position:'absolute',
    justifyContent:'center',
    borderColor:'#666666',
    borderRadius:5
  },
  bettext:
  {
    textDecorationLine:'underline',
    fontSize:14,
    color:'#666666',
  },
  topbar:
  {
    marginTop:0,
    height:50,
    width:'100%',
    backgroundColor:'#5365A2',
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignSelf:'center',
    alignItems:'center',
  },
  box_header:
  {
    fontFamily:"BigShouldersText-Black",  
    justifyContent:'flex-start',
    letterSpacing:.5,
    fontSize:16,
    padding:5, 
    color:'gray'
  
    },
  box_team:
    {
      flexDirection:'row',
      justifyContent:'space-evenly',
      width:'45%',
      height:30,
      right:0,
      position:'absolute',
    
  },
   teamN:
   {
     alignSelf:'center',
     letterSpacing:.5,
     fontFamily:"BigShouldersText-Black",  
  },
  hr:
  {
    borderBottomColor:'#666666',
    borderBottomWidth:1,
  },
  headerTitleStyle:{
    color: 'white',
    fontSize: 19,
    letterSpacing:0.5,
    textAlign:'left',
    fontFamily:"BigShouldersText-Black",
  },
  headerBell:{
    marginHorizontal:10,
    paddingTop:6
  },
  headerBalanceContainer:{
    marginHorizontal:10,
    paddingHorizontal:17,
    backgroundColor:'#fff',
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

});