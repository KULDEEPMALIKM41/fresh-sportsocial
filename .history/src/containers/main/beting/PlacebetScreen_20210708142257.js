import React from 'react';
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
} from 'react-native';
import {Dimensions} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MarketScreen({navigation, route}) {
  const selected = route.params.selected;
  console.log(selected)
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
          <View style={styles.boxes}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  justifyContent: 'flex-start',
                  fontWeight: 'bold',
                  fontSize: 16,
                  padding: 5,
                }}>
                Houstan Texanas Win
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
            <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}} />
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    justifyContent: 'flex-start',
                    color: 'blue',
                    fontSize: 20,
                    padding: 5,
                  }}>
                  Win - Loss
                </Text>
                <Text style={styles.w300}>+300</Text>

                <View style={styles.Mcontainer}>
                  {/* <Picker
                    selectedValue={selectedValue}
                    style={{height: 30, width: 120, color: '#666666'}}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedValue(itemValue)
                    }>
                    <Picker.Item label="Select Point" value="10" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="20" value="20" />
                  </Picker> */}
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
                        paddingVertical: 12,
                        color: 'black',
                      },
                      inputAndroid: {
                        fontSize: 16,
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
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '50%',
                    height: 30,
                  }}>
                  <Image
                    source={{
                      uri: 'https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png',
                    }}
                    style={{width: 35, height: 35}}
                  />
                  <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                    HUE
                  </Text>
                  <Text style={{alignSelf: 'center', color: '#666666'}}>@</Text>
                  <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                    AHD
                  </Text>
                  <Image
                    source={{
                      uri: 'https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png',
                    }}
                    style={{width: 35, height: 35}}
                  />
                </View>
                <Text
                  style={{
                    right: 10,
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    fontSize: 16,
                    color: '#666666',
                  }}>
                  Pot. Won
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.bettext}>Betway</Text>
                <Text
                  style={{
                    right: 10,
                    position: 'absolute',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  $40.00
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.boxes}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  justifyContent: 'flex-start',
                  fontWeight: 'bold',
                  fontSize: 16,
                  padding: 5,
                }}>
                Carolina Panthers Win
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
            <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}} />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  justifyContent: 'flex-start',
                  color: 'blue',
                  fontSize: 20,
                  padding: 5,
                }}>
                Win - Loss
              </Text>
              <Text style={styles.w300}>+300</Text>
              <View style={styles.Mcontainer}>
                {/* <Picker
                  selectedValue={selectedValue}
                  style={{height: 30, width: 120, color: '#666666'}}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  <Picker.Item
                    style={{color: 'red'}}
                    label="Select Point"
                    value="10"
                  />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="20" value="20" />
                </Picker> */}
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '50%',
                  height: 30,
                }}>
                <Image
                  source={{
                    uri: 'https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png',
                  }}
                  style={{width: 35, height: 35}}
                />
                <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                  HUE
                </Text>
                <Text style={{alignSelf: 'center', color: '#666666'}}>@</Text>
                <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                  AHD
                </Text>
                <Image
                  source={{
                    uri: 'https://freepngimg.com/thumb/football/36660-9-american-football-ball-thumb.png',
                  }}
                  style={{width: 35, height: 35}}
                />
              </View>
              <Text
                style={{
                  right: 10,
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  fontSize: 16,
                  color: '#666666',
                }}>
                Pot. Won
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  paddingLeft: 10,
                  fontSize: 14,
                  color: '#666666',
                }}>
                Bet 365
              </Text>
              <Text
                style={{
                  right: 10,
                  position: 'absolute',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                40 pts
              </Text>
            </View>
          </View>

          <View style={{margin: 10, flexDirection: 'row'}}>
            <Text style={styles.headText}>PARLAY</Text>
            <Image
              source={{
                uri: 'https://freepngimg.com/thumb/web_design/51042-3-share-hd-free-clipart-hd-thumb.png',
              }}
              style={{margin: 5, width: 15, height: 15}}
            />
          </View>

          <View
            style={{height: 60, backgroundColor: '#fff', flexDirection: 'row'}}>
            <Text
              style={{
                paddingLeft: 10,
                textAlign: 'left',
                alignSelf: 'center',
                fontSize: 18,
                color: '#666666',
              }}>
              Pot.Win
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 18,
                alignSelf: 'center',
              }}>
              {' '}
              160 pts
            </Text>
            <View style={styles.Lcontainer}>
              <Picker
                selectedValue={selectedValue}
                style={{height: 30, width: 120}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item
                  style={{fontSize: 12, color: '#666666'}}
                  label="10"
                  value="10"
                />
                <Picker.Item label="20" value="20" />
              </Picker>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.loginContainer}
        onPress={console.log('hi')}>
        <Text style={styles.loginText}>Publish Without Wagoring</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    alignItems: 'center',
    height: 40,
    width: '100%',
    borderTopEndRadius: 5,
    backgroundColor: '#5c5cd6',
    justifyContent: 'center',
    borderTopStartRadius: 5,
    position: 'absolute',
    bottom: 0,
  },
  loginText: {
    color: '#fff',
    fontFamily: 'BigShouldersText-Black',
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
    height: 140,
    backgroundColor: '#fff',
    marginTop: 20,
    borderTopLeftRadius: 15,
    borderTopEndRadius: 15,
  },
  Mcontainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: 120,
    height: 30,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#666666',
    right: 5,
    position: 'absolute',
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
    color: 'green',
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: windowWidth * 0.15,
  },
  bettext: {
    textDecorationLine: 'underline',
    paddingLeft: 10,
    fontSize: 14,
    color: '#666666',
  },
});
