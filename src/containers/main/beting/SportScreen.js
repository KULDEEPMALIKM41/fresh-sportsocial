 
import React from 'react';
import {ImageBackground, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../res/images';
import { getSports } from '../../../services/auth_curd';

export default function SportScreen({navigation}) { 
    const sports = [];

    const [sports_data, setSports_data] = React.useState(sports)
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: () => (
          <Text style={styles.headerTitleStyle}>
          Select Sports
          </Text>
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

    React.useEffect(() => {
      getSportsData()
    },[]);

    const getSportsData = () => {
      console.log('get sports...');
      getSports().then((response) => {
        setSports_data(response.data.data);
      }, (error) => { 
        console.log(error.response);
       });
    }
    const Item = ({item}) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Leagues', {item})}>
        <View style={styles.listItem}>
          {/* <Image source={{uri:item.photo}}  style={{width:60, height:60,}} /> */}
          <View style={styles.sportsIcon}>
          <Icon name="futbol" size={45} color="darkblue" />
          </View>
          <View style={styles.sportsNameContainer}>
            <Text style={styles.sportsTextStyle}>{item.name.toUpperCase()}</Text>
          </View>
        </View>
        </TouchableOpacity>
      );
    }

    return (
      <ImageBackground source={images.sports_background} style={styles.backgroundStyle} >
      <View style={styles.container}>
        <FlatList
          style={{flex:1, marginTop:60}}
          data={sports_data}
          renderItem={({ item }) => <Item item={item}/>}
          keyExtractor={item => item.id}
        />
        </View>
      </ImageBackground>
    );
  }

const styles = StyleSheet.create({
  backgroundStyle:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height:800
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(1,41,93, 0.5)'
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"85%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:20
  },
  headerTitleStyle:{
    color: 'white',
    fontSize: 19,
    letterSpacing:1,
    textAlign:'left',
    fontFamily:"BigShouldersText-Black"
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
  sportsIcon:{
    backgroundColor:"#eaeef2",
    padding:15,
    borderRadius:50,
    height:75,
    width:75
  },
  sportsNameContainer:{
    alignItems:'flex-start',
    paddingStart:20,
    justifyContent:'center'
  },
  sportsTextStyle:{
    fontSize:25,
    margin:10,
    letterSpacing:1,
    fontFamily:"BigShouldersText-Black",
    color:'gray'
  }
});