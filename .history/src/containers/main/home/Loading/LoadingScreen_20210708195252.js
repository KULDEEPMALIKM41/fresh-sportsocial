import React from 'react';
import {View, Text, Image} from 'react-native';
import palette from '../../../../res/palette'
import images from '../../../../res/images'

export default function activityScreen({navigation}) {
  setTimeout(() => {navigation.navigate('Home')}, 1000)
  return (
    <View style={palette.container.center}>
      <Image
        source={images.more}
            style={{height:50, width:50}}
        />
    </View>
  );
}
