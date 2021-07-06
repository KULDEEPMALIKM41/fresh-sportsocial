
  
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity,ScrollView} from 'react-native';
import images from '../../../res/images';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function OddsScreen({navigation, route}) {

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
            Odds for Betslip
            </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={styles.headerBell}>
          <Icon name="bell" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBalanceContainer}>
          <Text style={styles.balanceTitle}>Balance</Text>
          <Text style={styles.balanceValue}>$ 2000</Text>
          </TouchableOpacity>
        </View>
      ) 
    });
  }, [navigation]);

  return (

  <View style={styles.container}>
  <ScrollView >  
    <View style={styles.container5}>
      <View style={{}}>
          <Text style={styles.market}>Win - Loss Market for</Text>
      </View>
      <View style={{flex:1,flexDirection:'row', padding:10,}}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View>
            <Icon name="futbol" size={45} color="darkblue" />
            </View>
        </View>
        <View style={styles.matchesNameContainer}>
            <Text style={styles.matchesTextStyle}>IND   Vs   ENG</Text>
            <Text style={{marginTop:-10, color:'red', alignSelf:'center', fontFamily:"BigShouldersText-Black"}}>02:00:00</Text>
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View>
            <Icon name="futbol" size={45} color="darkblue" />
            </View>
        </View>
      </View>
      <View style={{width:'95%',flexDirection:'row',justifyContent:'space-between', marginTop:10}}> 
          <View  style={styles.odd_box_white}>
            <Text style={styles.oddsfonts_gray}>Outcome</Text>
            <Text style={styles.oddsfonts_dark_b}>+300</Text>
            <Text style={styles.oddsfonts_blue}>Bet365</Text> 
        </View>
          <View  style={styles.odd_box_white}>
          <Text style={styles.oddsfonts_gray}>Outcome</Text>
            <Text style={styles.oddsfonts_dark_b}>+300</Text>
            <Text style={styles.oddsfonts_blue}>Bet365</Text>
          </View>
          <View  style={styles.odd_box_blue}>
            <Text style={styles.oddsfonts_light}>Outcome</Text>
            <Text style={styles.oddsfonts_light_b}>+300</Text>
            <Text style={styles.oddsfonts_light_small}>Bet365</Text>
        </View>
      </View>  
    </View>

    <View style={styles.container5}>
      <View style={{}}>
          <Text style={styles.market}>Win - Loss Market for</Text>
      </View>
      <View style={{flex:1,flexDirection:'row', padding:10,}}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View>
            <Icon name="futbol" size={45} color="darkblue" />
            </View>
        </View>
        <View style={styles.matchesNameContainer}>
            <Text style={styles.matchesTextStyle}>IND   Vs   ENG</Text>
            <Text style={{marginTop:-10, color:'red', alignSelf:'center', fontFamily:"BigShouldersText-Black"}}>02:00:00</Text>
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View>
            <Icon name="futbol" size={45} color="darkblue" />
            </View>
        </View>
      </View>
      <View style={{width:'95%',flexDirection:'row',justifyContent:'space-between', marginTop:10}}> 
          <View  style={styles.odd_box_white}>
            <Text style={styles.oddsfonts_gray}>Outcome</Text>
            <Text style={styles.oddsfonts_dark_b}>+300</Text>
            <Text style={styles.oddsfonts_blue}>Bet365</Text> 
        </View>
          <View  style={styles.odd_box_white}>
          <Text style={styles.oddsfonts_gray}>Outcome</Text>
            <Text style={styles.oddsfonts_dark_b}>+300</Text>
            <Text style={styles.oddsfonts_blue}>Bet365</Text>
          </View>
          <View  style={styles.odd_box_blue}>
            <Text style={styles.oddsfonts_light}>Outcome</Text>
            <Text style={styles.oddsfonts_light_b}>+300</Text>
            <Text style={styles.oddsfonts_light_small}>Bet365</Text>
        </View>
      </View>  
    </View>

   </ScrollView>
  
   <TouchableOpacity style={styles.buttonContainer} onPress={console.log("hi")}>
        <Text style={styles.buttomButton}>Continue</Text>
      </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    height:'auto',

  },
  market:{
    justifyContent:'center',
    alignSelf:'center',
    alignSelf:'flex-start',
    paddingLeft:5,
    fontFamily:"BigShouldersText-Black",
    fontSize:14,
    color:'gray'
  },

  container5:
  {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'white',
    paddingVertical:10,
    paddingHorizontal:5,
    borderRadius:15,
    margin:15
  },
  oddsfonts_light:{
    justifyContent:'center',
    alignSelf:'center',
    color:'#fff',
    fontSize:16
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
       height:85,
       borderColor:'lightgray',
       borderWidth:1,
       borderRadius:10,
       backgroundColor:'#5c5cd6',
       textAlign:'center',
       justifyContent:'center',
       alignSelf:'center',
      
    },
    odd_box_white:
    {
      width:'30%', 
      height:85,
      borderColor:'lightgray',
      borderWidth:1,
      borderRadius:10,
      backgroundColor:'#fff',
      textAlign:'center',
      justifyContent:'center',
      alignSelf:'center'
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
      matchesTextStyle:{
        fontSize:18,
        margin:10,
        letterSpacing:.5,
        fontFamily:"BigShouldersText-Black",
        // color:'gray',
      },
});