import React from 'react';
import PostHeader from './PostHeader';
import BetHeader from './BetHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import BetAction from './BetAction';
import BetContent from './BetContent';
// import PostComments from './PostComments';
import {View} from 'react-native';


export default function Post({post, navigation}) {
  return (
    <React.Fragment>
      {
        post.bet_status ? 
        <View style={{marginTop:20}}>
          <BetHeader post={post} navigation={navigation}/>
          <BetContent post={post} navigation={navigation}/>
          <BetAction post={post} navigation={navigation}/>
  
        </View> :
        <View style={{marginTop:20}}>
          <PostHeader post={post} navigation={navigation}/>
          <PostContent post={post} navigation={navigation}/>
          <PostActions post={post} navigation={navigation}/>
          {/* <PostActions post={post} navigation={navigation} setModalVisible={setModalVisible}/> */}
      </View>
      }
    </React.Fragment>
  );
}
