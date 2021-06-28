
  
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

// function Item({item, navigation}) {
//   return (
   
   
  
//   );
// }

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
    <View style={styles.listItem}> 
      <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={styles.teamlogo} />
        <Text style={styles.team1}>HUE</Text>
        {/* <Text>{item.position}</Text> */}
      <Text style={styles.team1text}>@</Text>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.team2text}>AHD</Text>
        <Image source={{uri: "https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png"}}  style={styles.teamlogo} />
        {/* <Text>{item.position}</Text> */}
      </View>
    </View> 

    <View style={{height:25,backgroundColor:'#e6e6e6',flexDirection:'row'}}>
          <Text style={styles.date}>May 18 - 10:00 pm</Text>
          <Text style={styles.place}>MNT Bank Stadium</Text>
    </View>

    <View style={styles.containers}>
        <View style={{flexDirection:'row',marginTop:20}}>
          <Text style={styles.market}>Market Name</Text>
        </View>
        <View style={styles.container2}>
          <Image source={{uri: "https://picsum.photos/600"}}  style={{width:40, height:40,borderColor:'#fff',borderWidth:2,borderRadius:10}} />
          <Image source={{uri: "https://picsum.photos/200"}}  style={{width:40, height:40,borderColor:'#fff',borderWidth:2,borderRadius:10,right:15}} />
           
            <View style={styles.container3}>
              <Text style={{justifyContent:'center',alignSelf:'center',color:'#fff',}}>+2</Text>
            </View> 
        </View>

      <View style={{flexDirection:'row',justifyContent:'space-between',textAlign:'center',width:'60%',alignSelf:'center',marginTop:35,marginBottom:0,height:20}}>
        <TouchableOpacity>
          <Text style={{fontWeight:"bold",fontSize:14,}}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{fontWeight:"bold",fontSize:14,}}>SPORTSBOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{fontWeight:"bold",fontSize:14,}}>TIPSTER</Text>
        </TouchableOpacity>
      </View>
   {/* <View style={{flexDirection:'row',flex:1,marginTop:0,justifyContent:'space-between'}}> */}
        <View style={{width:'95%',flexDirection:'row',justifyContent:'space-between',flex:1,marginTop:-100}}> 
          <View  style={{width:'35%', height:'30%',textAlign:'center',borderColor:'#fff',borderWidth:2,borderRadius:10,backgroundColor:'#5c5cd6',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
            <Text style={{justifyContent:'center',alignSelf:'center',color:'#fff'}}>Outcome</Text>
            <Text style={{justifyContent:'center',alignSelf:'center',color:'#fff',fontWeight:'bold'}}>+300</Text>
            <Text style={{justifyContent:'center',alignSelf:'center',color:'#fff'}}>Bet365</Text>
        
          <View style={{flexDirection:'row',marginTop:15,justifyContent:'center'}}>
            <Image source={{uri: "https://picsum.photos/600"}}  style={{width:40, height:40,borderColor:'#fff',borderWidth:2,borderRadius:10}} />
            <View style={{width:40, height:40,borderColor:'#fff',borderWidth:2,borderRadius:10,right:10,backgroundColor:'gray',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
              <Text style={{justifyContent:'center',alignSelf:'center',color:'#fff',}}>+2</Text>
            </View> 
          </View>  
        </View>
          <View  style={{width:'35%', height:'30%',borderColor:'gray',borderWidth:2,borderRadius:10,backgroundColor:'#fff',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
          <Text style={{justifyContent:'center',alignSelf:'center',color:'black'}}>Outcome</Text>
            <Text style={{justifyContent:'center',alignSelf:'center',color:'black',fontWeight:'bold',}}>+300</Text>
            <Text style={{justifyContent:'center',alignSelf:'center',color:'black'}}>Bet365</Text>
        
          <View style={{flexDirection:'row',marginTop:15,justifyContent:'center'}}>
            <Image source={{uri: "https://picsum.photos/600"}}  style={{width:40, height:40,borderColor:'#fff',borderWidth:2,borderRadius:10}} />
            <View style={{width:40, height:40,borderColor:'#fff',borderWidth:2,borderRadius:10,right:10,backgroundColor:'gray',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
              <Text style={{justifyContent:'center',alignSelf:'center',color:'#fff',}}>+2</Text>
            </View> 
          </View> 
          </View>
          <View  style={{width:'35%', height:'30%',borderColor:'gray',borderWidth:2,borderRadius:10,backgroundColor:'#fff',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
          <Text style={{justifyContent:'center',alignSelf:'center',color:'black'}}>Outcome</Text>
            <Text style={{justifyContent:'center',alignSelf:'center',color:'black',fontWeight:'bold',}}>+300</Text>
            <Text style={{justifyContent:'center',alignSelf:'center',color:'black'}}>Bet365</Text>
        
          <View style={{flexDirection:'row',marginTop:15,justifyContent:'center'}}>
            <Image source={{uri: "https://picsum.photos/600"}}  style={{width:40, height:40,borderColor:'#fff',borderWidth:2,borderRadius:10}} />
            <View style={{width:40, height:40,borderColor:'#fff',borderWidth:2,borderRadius:10,right:10,backgroundColor:'gray',textAlign:'center',justifyContent:'center',alignSelf:'center'}}>
              <Text style={{justifyContent:'center',alignSelf:'center',color:'#fff',}}>+2</Text>
            </View> 
          </View> 
          </View>
      {/* </View> */}
      </View>
      </View>
  </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
  
  },
  containers: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  listItem:{
    height:'15%',
    backgroundColor:"#FFF",
    width:"100%",
    justifyContent:'space-between',
    alignSelf:"center",
    flexDirection:"row",
    marginTop:10
  },
  team1:{
    fontWeight:"bold",
    fontSize:20,
    alignSelf:'center',
    margin:0,
    marginLeft:-55
  },
  team1text:{
    fontWeight:"bold",
    fontSize:20,
    alignSelf:'center',
    color:'gray'
  },
  team2text:{
    fontWeight:"bold",
    fontSize:20,
    justifyContent:'center',
    alignSelf:'center'
  },
  date:{
    justifyContent:'center',
    alignSelf:'center',
    alignSelf:'flex-start',
    paddingLeft:5,
  },
  place:{
    textAlign:'right',
    right:2,position:'absolute'
  },
   teamlogo:{
     width:50,
     height:50,
     alignSelf:'center'
    },
    market:{
    fontWeight:"bold",
    fontSize:16,
    justifyContent:'center',
    alignSelf:'center',
    alignSelf:'flex-start',
    paddingLeft:5
  },
  container2:{
    textAlign:'right',
    right:2,position:'absolute',
    flexDirection:'row',
    marginTop:20
  },
  container3:{
    width:40,
     height:40,
     borderColor:'#fff',
     borderWidth:2,
     borderRadius:10,
     right:25,
     backgroundColor:'gray',
     textAlign:'center',
     justifyContent:'center',
     alignSelf:'center'
}
  

});