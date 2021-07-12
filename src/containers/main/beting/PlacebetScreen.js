import React from 'react';
import { createBet } from '../../../services/auth_curd';
import {
  StyleSheet,
  Svg,
  Text,
  View,
  FlatList,
  Image,
  Picker,
  TouchableOpacity,
  ScrollView,
  selectedValue,
  Alert
} from 'react-native';
import {Dimensions} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderScreen from './HeaderScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../res/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MarketScreen({navigation, route}) {
  const [selected, setSelected] = React.useState(route.params.selected);
  const checkValidation = () => {
    for (let itm of selected){
      if (!itm.stake_value){
        return false;
      }
    }
    return true;
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: false,
      headerStyle: {
          backgroundColor: '#5365A2'
        },
      headerLeft: () => (
        <TouchableOpacity style={styles.betslipBackButton} onPress={()=> navigation.goBack()}>
            <Image onPress={()=> navigation.goBack()} source={images.backButton}  style={{width:12, height:12}} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={{flexShrink: 1, width:200}}>
            <Text style={styles.headerTitleStyle}>
           Betslips
            </Text>
        </View>
      ),
      headerRight: () => (
        <HeaderScreen navigation={navigation} />
      ) 
    });
  }, [navigation]);

  const createBetData = async() => {
    if (checkValidation()){
      let value = await AsyncStorage.getItem('userData');
      let token = JSON.parse(value).token
      console.log(token);
      let data = {bet_slips:{}};
      for (let bets of selected){
        data.bet_slips[bets.id] = {
          stake_value:bets.stake_value,
          value:bets.value,
          id:bets.id
        }
      }
      console.log(data);
      createBet(data, token).then((response) => {
        console.log(response.data);
        Alert.alert('', response.data.message);
        navigation.navigate("Sports")
        navigation.navigate("MyBets")
      }, (error) => { 
        Alert.alert('', 'error...')
        console.log(error.response);
        if (error.response.status == 400){
          Alert.alert('', error.response.data.message);
        }
       });
       
    }else{
      Alert.alert('', 'Please select all point field!')
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginTop: 10, marginLeft: 10}}>
          <Text style={styles.headText}>SINGLES</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 80,
          }}>
          {selected.map(function(item, index){
              return(
                <View key={index} style={styles.boxes}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        justifyContent: 'flex-start',
                        fontSize: 14,
                        padding: 5,
                        fontFamily:"BigShouldersText-Black",
                        letterSpacing:.5,
                      }}>
                      {item.odd_type_name}
                    </Text>
                    <Image
                      source={{
                        uri: 'https://freepngimg.com/thumb/web_design/51042-3-share-hd-free-clipart-hd-thumb.png',
                      }}
                      style={{
                        width: 15,
                        height: 15,
                        right: 0,
                        position: 'absolute',
                        margin: 10,
                      }}
                    />
                  </View>
                  <View style={{borderBottomColor: 'lightgray', borderBottomWidth:0.5}} />
                  <View>
                    <View style={{flexDirection: 'row', marginTop:5,width:'auto'}}>
                      <Text
                        style={{
                          flex:1,
                          justifyContent: 'flex-start',
                          color: '#5365A2',
                          fontSize: 16,
                          padding: 5,
                          fontFamily:"BigShouldersText-Black",
                          letterSpacing:.5,
                        }}>
                        {item.display_name}
                      </Text>
                      <View style={styles.w300}>
                        <Text style={{color: 'green', fontSize: 16, fontWeight: 'bold',}}>+{item.value}</Text>
                      </View>
                      <View style={styles.Mcontainer}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Select Point',
                            value: '',
                          }}
                          items={[{label:'10', value:'10'},{label:'20', value:'20'},{label:'30', value:'30'},{label:'40', value:'40'},{label:'50', value:'50'}]}
                          style={{
                            inputIOS: {
                              fontSize: 16,
                              color: 'black',
                            },
                            inputAndroid: {
                              fontSize: 16,
                              margin:0,
                              padding:0,
                              color: 'black',
                            },
                          }}
                          onValueChange={(itemValue, itemIndex) => {
                            let temp_selected = selected;
                            temp_selected[index]['stake_value'] = itemValue;
                            if (itemValue){
                              if(temp_selected[index]['value'] > 0){
                                temp_selected[index]['pot_won'] = itemValue * (1 + (temp_selected[index]['value']/100));
                              }else{
                                temp_selected[index]['pot_won'] = itemValue * (1 - (temp_selected[index]['value']/100));
                              }
                            }else{
                              temp_selected[index]['pot_won'] = '0'
                            }
                            setSelected([...temp_selected])
                          }}
                          useNativeAndroidPickerStyle={false}
                        />
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop:10}}>
                      <View style={{flex:2,flexDirection:'column'}}>
                        <View style={{flex:1,flexDirection:'row',}}>
                        {/* <Image source={{uri:item.photo}}  style={{width:60, height:60,}} /> */}
                        <View style={{marginStart:5}}>
                          <Icon name="futbol" size={20} color="darkblue" />
                        </View>
                        <View style={styles.matchesNameContainer}>
                          <Text style={styles.matchesTextStyle}>{
                          (item.match_name !== undefined) ? item.match_name.split('vs')[0].substring(0,3).toUpperCase() : ''
                          }
                          </Text>
                          <Text style={{color:'#666666',  marginHorizontal:10}}>@</Text>
                          <Text style={styles.matchesTextStyle}>
                            {
                             (item.match_name !== undefined) ? item.match_name.split('vs')[1].substring(0,4).toUpperCase() : ''
                            }
                          </Text>
                        </View>
                        <View>
                          <Icon name="futbol" size={20} color="darkblue" />
                        </View>
                      </View>
                      <View style={{flex:1,flexDirection:'row'}}>
                        <Text style={styles.bettext}>Bet365</Text>
                      </View>
                      </View>
                     
                      <View style={{flex:0.5, flexDirection:'column',alignItems:'center'}}>
                      <View style={{flex:1}}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#666666',
                          fontFamily:"BigShouldersText-Black",
                        }}>
                        Pot. Win
                      </Text>
                      </View>
                        <View style={{flex:1}}>
                          <Text
                            style={{
                              fontFamily:"BigShouldersText-Black",
                              fontSize: 16,
                            }}>
                            $ {item.pot_won ? Number(item.pot_won).toFixed(2) : 0}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })}
            <View style={{marginTop:25, marginBottom: 10, flexDirection: 'row',paddingLeft:10}}>
            <Text style={styles.headText}>PARLAY</Text>
            <Image
              source={{
                uri: 'https://freepngimg.com/thumb/web_design/51042-3-share-hd-free-clipart-hd-thumb.png',
              }}
              style={{margin: 5, width: 15, height: 15}}
            />
          </View>

          <View
            style={{height:60, backgroundColor:'#fff', flexDirection: 'row',padding:10,margin:5}}>
            <Text
              style={{
                paddingLeft: 20,
                textAlign: 'left',
                alignSelf: 'center',
                fontSize: 16,
                color: '#666666',
                fontFamily:"BigShouldersText-Black",
                letterSpacing:.5,
              }}>
              Pot.Win
            </Text>
            <Text
              style={{
                textAlign: 'left',
              
                fontSize: 16,
                alignSelf: 'center',
                fontFamily:"BigShouldersText-Black",
                letterSpacing:.5,
              }}>
              {' '}
              160 pts
            </Text>
            <View style={styles.Lcontainer}>
              <RNPickerSelect
                    placeholder={{
                      label: 'Select Point',
                      value: '',
                    }}
                    items={[{label:'10', value:'10'},{label:'20', value:'20'}]}
                    // value={selectedValue}
                    style={{
                      inputIOS: {
                        fontSize: 16,
                        color: 'black',
                      },
                      inputAndroid: {
                        fontSize: 16,
                        margin:0,
                        padding:0,
                        color: 'black',
                      },
                    }}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log(itemValue);
                    }}
                    useNativeAndroidPickerStyle={false}
                  />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => createBetData()}>
        <Text style={styles.buttomButton}>Publish Without Wagoring</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#5c5cd6',
    justifyContent: 'center',
    paddingVertical:10
  },
  buttomButton: {
    color: '#fff',
    fontFamily:"BigShouldersText-Black",
    fontSize:20
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  headText: {
    color: 'gray',
    fontFamily: 'BigShouldersText-Black',
  },
  boxes: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopEndRadius: 15,
    padding:5,
    margin:5,
    marginTop:15
  },
  Mcontainer: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: 120,
    height: 30,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#666666',
    right: 5,
  },
  Lcontainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: 120,
    height: 30,
    borderWidth: 1,
    right: 5,
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
    borderColor: '#666666',
    borderRadius: 5,
  },
  w300: {
    flex:1,
    alignItems:'flex-end',
    justifyContent: 'center',
    marginRight:25
  },
  bettext: {
    textDecorationLine: 'underline',
    paddingLeft:5,
    fontSize: 14,
    color: '#666666',
  },
  matchesNameContainer:{
    flexShrink: 1,
    flexDirection:'row',
    justifyContent:'center',
    marginHorizontal:10
  },
  matchesTextStyle:{
    fontSize:14,
    letterSpacing:.5,
    fontFamily:"BigShouldersText-Black",
    alignItems:'center'
  },
  headerTitleStyle:{
    color: 'white',
    fontSize: 19,
    letterSpacing:1,
    textAlign:'left',
    fontFamily:"BigShouldersText-Black"
  },
  betslipBackButton:{
    backgroundColor:'rgba(1,41,50, 0.5)',
    padding:6,
    borderRadius:15,
    height:25,
    width:25,
    marginHorizontal:10
  },
  betslipHeaderIcon:{
    backgroundColor:"#eaeef2",
    padding:3,
    borderRadius:15,
    height:25,
    width:25,
    marginRight:10,
  },
});