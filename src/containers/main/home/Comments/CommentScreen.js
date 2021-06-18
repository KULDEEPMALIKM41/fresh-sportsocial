import React, {useState} from 'react';
import {View,Alert,Text,TextInput,ScrollView,
        Image,StyleSheet,TouchableOpacity, KeyboardAvoidingView,
        TouchableWithoutFeedback,
        Keyboard,} from 'react-native';
import images from '../../../../res/images';

export default function CommentScreen() {
    const initComments = [
      {
         name: 'Ben',
         comment:"You are to goods hi i am jorge.",
         src: 'https://picsum.photos/300',
      },
      {
         name: 'Susan',
         comment:"You are goods",
         src: 'https://picsum.photos/600',
      },
      {
         name: 'Robert',
         comment:"You are very good",
         src: 'https://picsum.photos/200',
      },
      {
         name: 'Mary',
         comment:"You are good",
         src: 'https://picsum.photos/600',
      },
      {
       name: 'Robert',
       comment:"You are very good",
       src: 'https://picsum.photos/200',
    },
    {
       name: 'Mary',
       comment:"You are good",
       src: 'https://picsum.photos/600',
    },
    {
       name: 'Mary',
       comment:"You are good",
       src: 'https://picsum.photos/600',
    },
    {
       name: 'Mary',
       comment:"You are good",
       src: 'https://picsum.photos/600',
    },
    {
       name: 'Mary',
       comment:"You are good",
       src: 'https://picsum.photos/600',
    },
    {
       name: 'Mary',
       comment:"You are good",
       src: 'https://picsum.photos/600',
    },
    {
       name: 'Mary',
       comment:"You are good",
       src: 'https://picsum.photos/600',
    }
      
   ]

  const [comments, setComments] = useState(initComments)
  const [commentText, setCommentText] = useState('')


 const postComment = () => {
   console.log(commentText)
   if (commentText != ''){
    let lastCommentText = commentText
    let lastComments = comments
    lastComments.push({
      name: 'Mary',
      comment:lastCommentText,
      src: 'https://picsum.photos/600',
   })
   console.log(lastComments)
    setComments(lastComments)
    setCommentText('')
    
   }
};

const simpleAlertHandler = () => {
 //function to make simple alert
 Alert.alert('Coming soon !');
};

 function tapToLike(likeIcon) {
  if (likeIcon % 2 === 0) {
    return images.redHeart;
  } else {
    return images.like;
  }
}
const [likeIcon, setLikeIcon] = React.useState(1);

return (
  <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={100}> 
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={styles.container}>
  <ScrollView>
  <View style={styles.welcome2}>
    
{
  comments.map((item, index) => (
    
   <View key={index}>
   <View
       
        style = {styles.container}
       >
  <TouchableOpacity onPress={simpleAlertHandler}>
     <Image
           source={{uri: item.src}}
        style={styles.personImage}
        onPress={simpleAlertHandler}
      />
      </TouchableOpacity>
        <Text style = {styles.text}  onPress={simpleAlertHandler} >
           {item.name}
        </Text>
        <Text  multiline={true}  style = {styles.text1}>
           {item.comment}
        </Text>
       </View>
       <View   style = {styles.container2}>
       <Text style = {styles.textfieldbutton} >
      16h
          </Text>
          
          <TouchableOpacity onPress={simpleAlertHandler}>
          <Text style = {styles.textfieldbutton} >
        24 Like
          </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={simpleAlertHandler}>
          <Text style = {styles.textfieldbutton} >
      Reply
          </Text>
          </TouchableOpacity>

      <View style={{position: 'absolute', right: 20,marginTop:-8}}>
        <TouchableOpacity onPress={() => setLikeIcon(likeIcon + 1)} >
          <Image source={tapToLike(likeIcon)} style={styles.actionIconsLike} />
        </TouchableOpacity>
      </View>   
        </View>
     </View>
   
  ))
  
}

  </View>
  </ScrollView>
  <View style={styles.welcome3}>

  <View> 
        <Image
         style={styles.personImageT}
          source={{uri: 'https://picsum.photos/id/1025/4951/3301'}}
         
        />
        </View>
    
    <View>
      <TextInput  multiline={true}
      style={{color:"#fff",width:250 }}
        placeholderTextColor={'white'}
        value={commentText}
        onChangeText={text=> setCommentText(text)}
         placeholder="add a comment... " />
       
    </View>


    <View style={{position: 'absolute', right: 10}}>

    <TouchableOpacity
         style={styles.button}
         onPress={postComment}
       >
         <Text style={{color:'#0066ff'}}> Post </Text>
      </TouchableOpacity>

   
    </View>
  </View>
</View>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>
 
 
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // height:50,
  },
  welcome: {
    height:50,
    backgroundColor: 'black',
    flexDirection: 'row',
   
   
  },
  welcome2: {
    width:'100%',
    maxHeight:'100%',
    backgroundColor: 'black',
   
    fontSize: 20,
    paddingTop: 0,
  },
  welcome3: {
    position:"absolute",
    flex:1,
    bottom:0,
    backgroundColor: '#1a1a1a',
    width:'100%',
    textAlign: 'center',
    fontSize: 20,
    height:50,
    flexDirection: 'row',
   
  },
  button: {
    alignItems: 'center',
    padding: 10,
    paddingTop:15,
  },

  actionIcons: {
    width: 15,
    height: 15,
    margin: 20,
  },
  actionIconsLike: {
    width: 13,
    height: 13,
    
  
  },

  personImage: {
   
    width: 40,
    height: 40,
    borderRadius: 30,
    margin:10,
    marginTop:25,
  },
   
  personImageT: {
   
    width: 40,
    height: 40,
    borderRadius: 30,
    margin:5,
  
  },
  container: {
    flexDirection: 'row',
    paddingBottom:0,
    
    backgroundColor: 'black',
    alignItems: 'center',
 },
 text: {
   paddingLeft:5,
   
    color: 'lightblue',
   
    
 },
 text1: {
  paddingLeft:5,
  
   color: '#fff',
  
   
},
 textfieldbutton: {
  paddingLeft:10,
  marginTop:-10,
  color: 'gray',
  fontSize:12,
  fontWeight:'bold',
},  
  container2: {
    paddingLeft:55,
    flexDirection: 'row',
    paddingBottom:0,
    marginTop:-10,
    backgroundColor: 'black',
  },
  bottomView: {
    position: 'absolute',
 
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor:'gray',
  flexDirection:'row',
  height:50,
  alignItems:'center',
  },
 
   textStyle: {
    
      color: '#fff',
      fontSize: 20,
      paddingLeft: 15,
      paddingTop:12,
      fontWeight:'bold'
   },
});