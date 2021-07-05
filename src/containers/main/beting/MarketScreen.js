
  
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity,ScrollView} from 'react-native';
import { Dimensions } from 'react-native';
//import { Col, Row, Grid } from "react-native-easy-grid";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class MarketScreen extends React.Component {
  state = {
    data:[
        {
            "name": "leagues",
            "photo": "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"
        },  
    ]
  }


render(){
  return (

  <View style={styles.container}>
  <ScrollView >
  <View style={{flex: 1, height:6, backgroundColor: '#e6e6e6'}} />
   <View style={{flex:1,width:'95%',height:windowHeight*0.11,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',alignSelf:'center'}}>
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

    <View style={styles.containers}>
        <View style={{flexDirection:'row',marginTop:windowHeight*0.04}}>
          <Text style={styles.market}>Market Name</Text>
        </View>
        <View style={styles.container2}>
          <Image source={{uri: "https://picsum.photos/600"}}  style={{ zIndex:1,width:30, height:30,borderColor:'#fff',borderWidth:2,borderRadius:10}} />
          <Image source={{uri: "https://picsum.photos/200"}}  style={{ width:30, height:30,borderColor:'#fff',borderWidth:2,borderRadius:10,right:15}} />
           
            <View style={styles.container3}>
              <Text style={styles.oddsfonts_light}>+2</Text>
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
    <View style={{flex:1,width:'100%'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:25,height:"auto",paddingRight:15}}> 
          <View  style={styles.odd_box_blue}>
            <Text style={styles.oddsfonts_light}>Outcome</Text>
            <Text style={styles.oddsfonts_light_b}>+300</Text>
            <Text style={styles.oddsfonts_light}>Bet365</Text>
        
          <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',marginBottom:windowHeight*-0.028}}>
            <Image source={{uri: "https://picsum.photos/600"}}  style={styles.odd_img} />
            <View style={{width:30, height:30,borderColor:'#fff',borderWidth:2,borderRadius:10,right:10,backgroundColor:'gray',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
              <Text style={styles.oddsfonts_light}>+2</Text>
            </View> 
          </View>  
        </View>
          <View  style={styles.odd_box_white}>
          <Text style={styles.oddsfonts_dark}>Outcome</Text>
            <Text style={{justifyContent:'center',alignSelf:'center',color:'black',fontWeight:'bold',}}>+300</Text>
            <Text style={styles.oddsfonts_dark}>Bet365</Text>
        
          <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',marginBottom:windowHeight*-0.028}}>
            <Image source={{uri: "https://picsum.photos/600"}}  style={styles.odd_img} />
            <View style={{width:30, height:30,borderColor:'#fff',borderWidth:2,borderRadius:10,right:10,backgroundColor:'gray',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
              <Text style={styles.oddsfonts_light}>+2</Text>
            </View> 
          </View> 
          </View>
        <View  style={styles.odd_box_white}>
          <Text style={styles.oddsfonts_dark} >Outcome</Text>
            <Text style={styles.oddsfonts_dark_b}>+300</Text>
            <Text style={styles.oddsfonts_dark}>Bet365</Text>
        
          <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',marginBottom:windowHeight*-0.028}}>
            <Image source={{uri: "https://picsum.photos/600"}}  style={styles.odd_img} />
            <View style={{width:30, height:30,borderColor:'#fff',borderWidth:2,borderRadius:10,right:10,backgroundColor:'gray',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
              <Text style={styles.oddsfonts_light}>+2</Text>
            </View> 
          </View>

        </View>
      
      </View>  
    </View> 
    <View style={styles.container5}>
      <View style={{height:40,justifyContent:'center'}}>
          <Text style={styles.market}>Win - Loss Market</Text>
      </View>
      <View style={{width:'95%',flexDirection:'row',justifyContent:'space-between'}}> 
          <View  style={styles.odd_box_white}>
            <Text style={styles.oddsfonts_dark}>Outcome</Text>
            <Text style={styles.oddsfonts_dark_b}>+300</Text>
            <Text style={styles.oddsfonts_dark}>Bet365</Text>
        
          <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',marginBottom:windowHeight*-0.028}}>
            <Image source={{uri: "https://picsum.photos/600"}}  style={styles.odd_img} />
            <View style={{width:30, height:30,borderColor:'#fff',borderWidth:2,borderRadius:10,right:10,backgroundColor:'gray',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
              <Text style={styles.oddsfonts_light}>+2</Text>
            </View> 
          </View>  
        </View>
          <View  style={styles.odd_box_white}>
          <Text style={styles.oddsfonts_dark}>Outcome</Text>
            <Text style={styles.oddsfonts_dark_b}>+300</Text>
            <Text style={styles.oddsfonts_dark}>Bet365</Text>
        
          <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',marginBottom:windowHeight*-0.028}}>
            <Image source={{uri: "https://picsum.photos/600"}}  style={styles.odd_img} />
            <View style={{width:30, height:30,borderColor:'#fff',borderWidth:2,borderRadius:10,right:10,backgroundColor:'gray',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
              <Text style={styles.oddsfonts_light}>+2</Text>
            </View> 
          </View> 
          </View>
          <View  style={styles.odd_box_blue}>
            <Text style={styles.oddsfonts_light}>Outcome</Text>
            <Text style={styles.oddsfonts_light_b}>+300</Text>
            <Text style={styles.oddsfonts_light}>Bet365</Text>
        
          <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',marginBottom:windowHeight*-0.028}}>
            <Image source={{uri: "https://picsum.photos/600"}}  style={styles.odd_img} />
            <View style={{width:30, height:30,borderColor:'#fff',borderWidth:2,borderRadius:10,right:10,backgroundColor:'gray',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
              <Text style={styles.oddsfonts_light}>+2</Text>
          </View> 
          </View> 
        </View>
      </View>  
    </View>
   </View>

   </ScrollView>
  
   <TouchableOpacity style={styles.loginContainer} onPress={console.log("hi")}>
        <Text style={styles.loginText}>Continue</Text>
      </TouchableOpacity>
   </View> 

    );
  }
}

const styles = StyleSheet.create({
    loginContainer: {
    alignItems: 'center',
    height: 40,
    borderTopEndRadius:5,
    backgroundColor: '#5c5cd6',
    justifyContent: 'center',
    borderTopStartRadius:5
  },
  loginText: {
    color: '#fff',
    fontFamily:"BigShouldersText-Black",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    justifyContent:'center',
    alignSelf:'center',
    alignSelf:'flex-start',
    paddingLeft:5,
    fontFamily:"BigShouldersText-Black"
  },
  container2:{
    textAlign:'right',
    right:2,position:'absolute',
    flexDirection:'row',
    marginTop:20
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
    marginBottom:70,
    marginTop:10,
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
    color:'#fff',
  },
  oddsfonts_light_b:
  {
    justifyContent:'center',
    alignSelf:'center',
    color:'#fff',
    fontWeight:'bold',
  },
  oddsfonts_dark:
  {
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    color:'black',
    
  },
  oddsfonts_dark_b:
  {
    justifyContent:'center',
    alignSelf:'center',
    color:'black',
    fontWeight:'bold',
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
       height:90,
       borderColor:'gray',
       borderWidth:2,
       borderRadius:10,
       backgroundColor:'#5c5cd6',
       textAlign:'center',
       justifyContent:'center',
       alignSelf:'center',
      
    },
    odd_box_white:
    {
      width:'30%', 
      height:90,
      borderColor:'gray',
      borderWidth:2,
      borderRadius:10,
      backgroundColor:'#fff',
      textAlign:'center',
      justifyContent:'center',
      alignSelf:'center'
    },

});