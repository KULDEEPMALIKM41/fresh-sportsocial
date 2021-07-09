
  
import React , {useState} from 'react';
import { StyleSheet,Svg, Text, View, FlatList, Image,Picker, TouchableOpacity,ScrollView,selectedValue} from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getBetslips} from '../../../services/auth_curd';
import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




export default function MetchScreen({navigation, route}) { 


  //const item = route.params.item
    const betslips = [];

    const [betslips_data, setBetslips_Data] = React.useState(betslips)
  React.useLayoutEffect(() => {
    navigation.setOptions({ 
      headerTransparent: false,
      headerTitle: () => (
        <Text style={styles.headerTitleStyle}>
        My Bets
        </Text>
      ),
      headerRight: () => (
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={styles.headerBell}>
          <Icon name="bell" size={20} color="#ff3333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBalanceContainer}>
          <Text style={styles.balanceTitle}>Balance</Text>
          <Text style={styles.balanceValue}>$ 2000</Text>
          </TouchableOpacity>
        </View>
      ) 
    });
  }, [navigation]);


  const firstData = [];

   const [name, setName] = useState(null);
  // const [page, setPage] = useState(1);
  // const [data, setData] = useState(firstData);
  // const [loading, setLoading] = useState(true);


  const checkAuth = async () => {
    let value = await AsyncStorage.getItem('userData');
    if (value){
      value = JSON.parse(value).first_name + ' ' + JSON.parse(value).last_name;
      setName(value);
    }else{
      setName(null);
    }
  }

  React.useEffect(() => {
    checkAuth();
    getBetslipsData();
//   return unsubscribe;
  }, [navigation]);

  const getBetslipsData = async () => {
    let value = await AsyncStorage.getItem('userData');
    token = JSON.parse(value).token ;
    getBetslips(token).then((response) => {
      setBetslips_Data(response.data.data);
    }, (error) => { 
      console.log(error.response);
     });
  }

  const [defaultStyle, setDefaultStyle] = useState(true);
 
  return (

  <View style={styles.container}>

  <ScrollView>

   <View style={styles.topbar}>
     <TouchableOpacity onPress={() => setDefaultStyle(!defaultStyle)} >
        <Text style={defaultStyle ? styles.headText_s : styles.headText ? styles.headText: styles.headText}>ALL</Text>
     </TouchableOpacity>
     <TouchableOpacity   onPress={() => setDefaultStyle(!defaultStyle)}>
        <Text style={defaultStyle ? styles.headText : styles.headText_s ,defaultStyle ? styles.headText : styles.headText_s}>RESOLVED</Text>
      </TouchableOpacity>
      <TouchableOpacity   onPress={() => setDefaultStyle(!defaultStyle)}>
        <Text style={defaultStyle ? styles.headText : styles.headText_s ,defaultStyle ? styles.headText : styles.headText_s}>UNRESOLVED</Text>
      </TouchableOpacity>
    </View>
  
  <View style={{flex: 1, flexDirection: 'column',marginLeft:10,marginRight:10,marginBottom:80}}>
    {betslips_data.map(function (item, index) {
      return(
        <View style={styles.boxes} key={'box'+index}> 
          <View style={{ flexDirection:'row',}}>
          <View style={{width:'62%'}} >
            <Text style={styles.box_header} >{item.odd_type_name}</Text>
          </View>
            <View style={styles.box_team}> 
              <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={{width:35,height:35,}} />
         
              <Text style={styles.teamN}>{
      (item.match_name !== undefined) ? item.match_name.split('vs')[0].substring(0,3) : ''
    }</Text>
              <Text style={{alignSelf:'center',color:'#666666'}}>@</Text>
              <Text style={styles.teamN}>{
      (item.match_name !== undefined) ? item.match_name.split('vs')[1].substring(0,4) : ''
    }</Text>
              <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={{width:35,height:35}} /> 
           </View> 
          </View>
          <View style={styles.hr} />
          <View style={{padding:10}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:14,color:'#666666',}}>For -</Text>           
              <Text style={{fontSize:14,fontWeight:'bold'}}> {item.market_type}</Text> 
        {
        
          item.status_id == 3 ? 
          <View style={styles.Mcontainer}>
          <Text style={{fontSize:20,color:'#ffcc00',fontWeight:'bold'}}> ? </Text>
          <Text style={{fontSize:14,color:'#ffcc00',fontWeight:'bold'}}>Unresolved</Text>  
        </View> :  item.status_id == 8 ?
          <View style={styles.Losecontainer}>
          <Text style={{fontSize:20,color:'#F93832',fontWeight:'bold'}}> X </Text>
          <Text style={{fontSize:14,color:'#F93832',fontWeight:'bold'}}>Lose</Text>  
        </View> : item.status_id == 7 ?
          <View style={styles.Gcontainer}>
          <Icon name="trophy" size={20} color="#42AD66" />
          <Text style={{fontSize:14,color:'#42AD66',fontWeight:'bold'}}>  Won</Text>  
        </View> : null
        }
     {/* {
       console.log( item.status_id)
     } */}
      </View>

         <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:14,fontWeight:'bold'}}>Odds Selected </Text>  
            <Text style={{fontSize:14,color:'#666666',fontWeight:'bold'}}>{item.value}</Text> 
         </View>

        <View style={{flexDirection:'column'}}>
          <View style={{flexDirection:'row'}}>
              {/* <Image source={require('../../../res/images/Ydot.png')} style={{width:15,height:15,alignSelf:'center'}} /> */}
              <Text style={{justifyContent:'center',fontSize:16,fontWeight:'bold'}}> {item.stake_amount}</Text> 
              <Text style={{right:50,position:'absolute',alignSelf:'flex-end',fontSize:14,color:'#666666'}}>Pot. Win</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.bettext}>Bet 365</Text>
            <Text style={{right:50,position:'absolute',fontWeight:'bold',fontSize:16}}>$ {item.win_amount}</Text>
          </View>
          {/* <Image source={require('../../../res/images/barcode1.png')}  style={{width:35,height:35,right:0,position:'absolute',margin:5}} /> */}
        </View>
       </View>
      </View>
      )
      
    })}
       

      {/* <View style={styles.boxes}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.box_header} >Win - Loss market for</Text>
            <View style={styles.box_team}> 
              <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={{width:35,height:35,}} />
              <Text style={styles.teamN}>HUE</Text>
              <Text style={{alignSelf:'center',color:'#666666'}}>@</Text>
              <Text style={styles.teamN}>AHD</Text>
              <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={{width:35,height:35}} /> 
           </View> 
          </View>
          <View style={styles.hr} />
          <View style={{margin:10}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:14,color:'#666666',}}>For -</Text>           
              <Text style={{fontSize:14,fontWeight:'bold'}}> Houstan Win</Text> 
        <View style={styles.Losecontainer}>
          <Text style={{fontSize:20,color:'#F93832',fontWeight:'bold'}}> X </Text>
          <Text style={{fontSize:14,color:'#F93832',fontWeight:'bold'}}>Lose</Text>  
        </View>
      </View>

         <View style={{flexDirection:'row'}}>
         <Text style={{fontSize:14,fontWeight:'bold'}}>Odds Selected </Text>  
         <Text style={{fontSize:14,color:'#666666',fontWeight:'bold'}}>+300</Text> 
         </View>

        <View style={{flexDirection:'column'}}>
          <View style={{flexDirection:'row'}}>
              <Image source={require('../../../res/images/Ydot.png')} style={{width:15,height:15,alignSelf:'center'}} />
              <Text style={{justifyContent:'center',fontSize:16,fontWeight:'bold'}}> 400</Text> 
              <Text style={{right:50,position:'absolute',alignSelf:'flex-end',fontSize:14,color:'#666666'}}>Pot. Win</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.bettext}>Betway</Text>
            <Text style={{right:50,position:'absolute',fontWeight:'bold',fontSize:16}}>$40.00</Text>
          </View>
          <Image source={require('../../../res/images/barcode1.png')}  style={{width:35,height:35,right:0,position:'absolute',margin:5}} />
        </View>
       </View>
      </View> */}
      {/* <View style={styles.boxes}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.box_header} >Win - Loss market for</Text>
           
            <View style={styles.box_team}> 
              <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={{width:35,height:35,}} />
              <Text style={styles.teamN}>HUE</Text>
              <Text style={{alignSelf:'center',color:'#666666'}}>@</Text>
              <Text style={styles.teamN}>AHD</Text>
              <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={{width:35,height:35}} /> 
           </View> 
          </View>
          <View style={styles.hr} />
          <View style={{padding:10}}>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:14,color:'#666666',}}>For -</Text>           
              <Text style={{fontSize:14,fontWeight:'bold'}}> Houstan Win</Text> 
        <View style={styles.Gcontainer}>
       
          <Icon name="trophy" size={20} color="#42AD66" />
          <Text style={{fontSize:14,color:'#42AD66',fontWeight:'bold'}}>  Won</Text>  
        </View>
      </View>

         <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:14,fontWeight:'bold'}}>Odds Selected </Text>  
            <Text style={{fontSize:14,color:'#666666',fontWeight:'bold'}}>+300</Text> 
         </View>

        <View style={{flexDirection:'column'}}>
          <View style={{flexDirection:'row'}}>
              <Image source={require('../../../res/images/Ydot.png')} style={{width:15,height:15,alignSelf:'center'}} />
              <Text style={{justifyContent:'center',fontSize:16,fontWeight:'bold'}}> 400</Text> 
              <Text style={{right:50,position:'absolute',alignSelf:'flex-end',fontSize:14,color:'#666666'}}>Pot. Win</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.bettext}>Bet 365</Text>
            <Text style={{right:50,position:'absolute',fontWeight:'bold',fontSize:16}}>$40.00</Text>
          </View>
          <Image source={require('../../../res/images/barcode1.png')}  style={{width:35,height:35,right:0,position:'absolute',margin:5}} />
        </View>
       </View>
      </View> */}

      </View>
      </ScrollView> 
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
    opacity:1
  },
  boxes:
  {
    height:'auto',
    backgroundColor: '#fff',
    marginTop:20,
    borderTopLeftRadius:15,
    borderTopEndRadius:15,
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
    justifyContent:'flex-start',
     fontWeight:'bold',
      fontSize:16,
      padding:5,
     
    
    
      
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
     fontWeight:'bold'
  },
  hr:
  {
    borderBottomColor:'#666666',
    borderBottomWidth:1,
  },
  headerTitleStyle:{
    color: 'black',
    fontSize: 19,
    letterSpacing:1,
  
    fontFamily:"BigShouldersText-Black"
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