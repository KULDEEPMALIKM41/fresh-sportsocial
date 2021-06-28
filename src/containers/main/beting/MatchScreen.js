 
import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../res/images';
// import { getLeages } from '../../../services/auth_curd';

export default function MatchScreen({navigation, route}) { 
    // const item = route.params.item
    const matches = [
      {
        "id": 2,
        "name": "Mamelodi Sundowns vs CR Belouizdad",
        "status": "FT",
        "match_date": "2021-04-09",
        "match_time": "13:00:00",
        "match_date_time": "2021-04-09 13:00:00",
        "venue": "",
        "static_id": 2945727,
        "fix_id": 3452924,
        "gid": 3897269,
        "league_id": 125,
        "home_team_id": 1044,
        "away_team_id": 1039,
        "created_at": "2021-04-28T12:15:02.000000Z",
        "updated_at": "2021-04-28T12:15:02.000000Z",
        "is_active": "1"
      },
      {
        "id": 3,
        "name": "Mazembe vs Al-Hilal Omdurman",
        "status": "FT",
        "match_date": "2021-04-09",
        "match_time": "13:00:00",
        "match_date_time": "2021-04-09 13:00:00",
        "venue": "",
        "static_id": 2945726,
        "fix_id": 3452923,
        "gid": 3897270,
        "league_id": 125,
        "home_team_id": 1045,
        "away_team_id": 1038,
        "created_at": "2021-04-28T12:15:02.000000Z",
        "updated_at": "2021-04-28T12:15:02.000000Z",
        "is_active": "1"
      },
      {
        "id": 4,
        "name": "Al Ahly vs Simba",
        "status": "19:00",
        "match_date": "2021-04-09",
        "match_time": "19:00:00",
        "match_date_time": "2021-04-09 19:00:00",
        "venue": "",
        "static_id": 2945724,
        "fix_id": 3452921,
        "gid": 3837887,
        "league_id": 125,
        "home_team_id": 1041,
        "away_team_id": 1674,
        "created_at": "2021-04-28T12:15:02.000000Z",
        "updated_at": "2021-04-28T12:15:02.000000Z",
        "is_active": "1"
      },
      {
        "id": 6,
        "name": "AS Vita Club vs Al-Merreikh",
        "status": "19:00",
        "match_date": "2021-04-09",
        "match_time": "19:00:00",
        "match_date_time": "2021-04-09 19:00:00",
        "venue": "",
        "static_id": 2945725,
        "fix_id": 3452922,
        "gid": 3837883,
        "league_id": 125,
        "home_team_id": 1040,
        "away_team_id": 1675,
        "created_at": "2021-04-28T12:15:02.000000Z",
        "updated_at": "2021-04-28T12:15:02.000000Z",
        "is_active": "1"
      }
    ];

    const [matches_data, setMatches_data] = React.useState(matches)
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTransparent: false,
        headerStyle: {
            backgroundColor: 'rgba(1,41,93, 0.8)'
          },
        headerLeft: () => (
          <TouchableOpacity style={styles.matchBackButton} onPress={()=> navigation.goBack()}>
              <Image onPress={()=> navigation.goBack()} source={images.backButton}  style={{width:12, height:12}} />
          </TouchableOpacity>
        ),
        headerTitle: () => (
            <Text style={styles.headerTitleStyle}>
            {/* {item.name} */}
            NFL
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
    //   getMatchData()
    },[]);

    // const getMatchData = () => {
    //   console.log('get matches...');
    //   getLeages(item.id).then((response) => {
    //     console.log(response.data.data);
    //     setMatches_data(response.data.data);
    //   }, (error) => { 
    //     console.log(error.response);
    //    });
    // }
    const Item = ({item}) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Sports')}>
        <View style={styles.listItem}>
          {/* <Image source={{uri:item.photo}}  style={{width:60, height:60,}} /> */}
          <View style={{justifyContent:'center'}}>
            <View style={styles.matchesIcon}>
            <Icon name="futbol" size={45} color="darkblue" />
            </View>
          </View>
          <View style={styles.matchesNameContainer}>
            <Text style={styles.matchesTextStyle}>{item.name}</Text>
          </View>
        </View>
        </TouchableOpacity>
      );
    }

    return (
        <View style={styles.container}>
            <View style={{backgroundColor:'rgba(1,41,93, 0.8)'}} >
                <Text style={styles.matchTitle}> Matches </Text>
            </View>
            <FlatList
            style={{flex:1, marginTop:60}}
            data={matches_data}
            renderItem={({ item }) => <Item item={item}/>}
            keyExtractor={item => item.id}
            />
        </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
  matchesIcon:{
    backgroundColor:"#eaeef2",
    padding:15,
    borderRadius:50,
    height:75,
    width:75,
  },
  matchesNameContainer:{
    flexShrink: 1,
    alignItems:'flex-start',
    paddingStart:15,
    // paddingRight:15,
    justifyContent:'center'
  },
  matchesTextStyle:{
    fontSize:20,
    margin:10,
    letterSpacing:.5,
    fontFamily:"BigShouldersText-Black",
    color:'gray',
  },
  matchTitle:{
    color:'white',
    padding:10,
    margin:10,
    fontSize:14,
    fontFamily:"BigShouldersText-Black",
    letterSpacing:.5,
  },
  matchBackButton:{
    backgroundColor:'rgba(1,41,50, 0.5)',
    padding:6,
    borderRadius:15,
    height:25,
    width:25,
    marginLeft:10
  }
});