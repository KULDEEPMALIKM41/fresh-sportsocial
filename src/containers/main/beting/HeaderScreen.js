import React from 'react';
import {ImageBackground, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import { getBalance } from '../../../services/auth_curd';

export default function HeaderScreen ({navigation}) {

    const [token, setToken] = React.useState(null)
    const [balance, setBalance] = React.useState(0)
    const checkAuth = async () => {
        console.log('checking...');
        let value = await AsyncStorage.getItem('userData');
        if (value){
          value = JSON.parse(value).token
          setToken(value);
          getBalanceData(value);
        }else{
          setToken(null);
        }
      }

      const getBalanceData = (token) => {
        getBalance(token).then((response) => {
            setBalance(response.data.data.data[0].total_points);
         // console.log(response.data.data.data[0].total_points);
          }, (error) => { 
            console.log(error.response);
           });
        }

      React.useEffect(() => {
        checkAuth();
        const unsubscribe = navigation.addListener('focus', (e) => {
            checkAuth();
          }
        );
        return unsubscribe
      },[]);

    return(

        <View style={{flexDirection:"row"}}>
        <TouchableOpacity style={styles.headerBell}>
        <Icon name="bell" size={20} color="white" />
        </TouchableOpacity>
        {token ?  
          <TouchableOpacity style={styles.headerBalanceContainer}>
          <Text style={styles.balanceTitle}>Balance</Text>
          <Text style={styles.balanceValue}>$ {balance}</Text>
          </TouchableOpacity> :
          <TouchableOpacity style={styles.LoginButtonContainer}  onPress={()=> navigation.navigate("Login")}>
          <Text style={styles.LoginButton}>Login</Text>
          </TouchableOpacity>
        }
      </View>
    ) 
}

const styles = StyleSheet.create({
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
    LoginButtonContainer:{
      marginHorizontal:10,
      paddingHorizontal:17,
      backgroundColor:'white',
      borderRadius:25,
      marginTop:5
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
      marginTop: Platform.OS ==='ios' ? 0 : -5
    },
    LoginButton:{
      fontSize:14,
      letterSpacing:1,
      fontFamily:'BigShouldersText-Black',
    },
  });