import React from 'react';
import PostHeader from './PostHeader';
// import PostImage from './PostImage';
import PostActions from './PostActions';
// import PostLikes from './PostLikes';
// import PostText from './PostText';
// import PostComments from './PostComments';
import PostPublishDate from './PostPublishDate';

export default function Post({post, navigation}) {
  return (
    <React.Fragment>
      <PostHeader post={post} navigation={navigation}/>
      <PostActions post={post} navigation={navigation}/>
      {/* <PostActions post={post} navigation={navigation} setModalVisible={setModalVisible}/> */}
      {/* <PostImage post={post} />
    
      <PostLikes post={post} />
      <PostText post={post} />
      <PostComments post={post} /> */}
      <PostPublishDate post={post} />
    </React.Fragment>
  );
}
