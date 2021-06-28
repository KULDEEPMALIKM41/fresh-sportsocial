 
import React from 'react';
import {ImageBackground, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../res/images';
import { getLeages } from '../../../services/auth_curd';

export default function LeagueScreen({navigation, route}) { 
    const item = route.params.item
    const leagues = [];

    const [leagues_data, setLeagues_data] = React.useState(leagues)
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity style={styles.leagueBackButton} onPress={()=> navigation.goBack()}>
              <Image onPress={()=> navigation.goBack()} source={images.backButton}  style={{width:12, height:12}} />
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <View style={{flexDirection:'row'}}>
            <View style={styles.leagueHeaderIcon}>
              <Icon name="futbol" size={19} color="darkblue" />
            </View>
            <Text style={styles.headerTitleStyle}>
            {item.name}
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

    React.useEffect(() => {
      getLeagueData()
    },[]);

    const getLeagueData = () => {
      console.log('get leagues...');
      getLeages(item.id).then((response) => {
        console.log(response.data.data);
        setLeagues_data(response.data.data);
      }, (error) => { 
        console.log(error.response);
       });
    }
    const Item = ({item}) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Leagues')}>
        <View style={styles.listItem}>
          {/* <Image source={{uri:item.photo}}  style={{width:60, height:60,}} /> */}
          <View style={{justifyContent:'center'}}>
            <View style={styles.leaguesIcon}>
            <Icon name="futbol" size={45} color="darkblue" />
            </View>
          </View>
          <View style={styles.leaguesNameContainer}>
            <Text style={styles.leaguesTextStyle}>{item.name.toUpperCase()}</Text>
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
          data={leagues_data}
          ListHeaderComponent={() => (
            <View>
                <Text style={styles.leagueTitle}> Select League </Text>
            </View>
          )}
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
    width:"90%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:20,
  },
  headerTitleStyle:{
    color: 'white',
    fontSize: 19,
    letterSpacing:1,
    textAlign:'left',
    fontFamily:"BigShouldersText-Black",
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
  leaguesIcon:{
    backgroundColor:"#eaeef2",
    padding:15,
    borderRadius:50,
    height:75,
    width:75,
  },
  leagueHeaderIcon:{
    backgroundColor:"#eaeef2",
    padding:3,
    borderRadius:15,
    height:25,
    width:25,
    marginRight:10,
  },
  leaguesNameContainer:{
    flexShrink: 1,
    alignItems:'flex-start',
    paddingStart:15,
    // paddingRight:15,
    justifyContent:'center'
  },
  leaguesTextStyle:{
    fontSize:20,
    margin:10,
    letterSpacing:.5,
    fontFamily:"BigShouldersText-Black",
    color:'gray',
  },
  leagueTitle:{
    color:'white',
    padding:10,
    margin:10,
    fontSize:23,
    fontFamily:"BigShouldersText-Black",
    letterSpacing:.5,
  },
  leagueBackButton:{
    backgroundColor:'rgba(1,41,50, 0.5)',
    padding:6,
    borderRadius:15,
    height:25,
    width:25,
    marginHorizontal:10
  }
});