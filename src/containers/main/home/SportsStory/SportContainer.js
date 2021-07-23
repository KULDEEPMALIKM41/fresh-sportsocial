import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import SportListItem from './SportListItem';

export default function SportContainer({navigation, sports_data}) {
  return (
    <View>
       <FlatList
            showsHorizontalScrollIndicator={false}
            indicatorStyle={'white'}
            horizontal={true}
            data={sports_data} 
            renderItem={({item}) => (
                <SportListItem item={item} navigation={navigation} />
              )}
            keyExtractor={(item) => item.id}
        />
    </View>
  );
}