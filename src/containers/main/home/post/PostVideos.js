import React, { Component } from "react";
import {TouchableOpacity, View, StyleSheet,Text, Dimensions, Animated} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const animated = new Animated.Value(0)
const interpolatedAnimation = animated.interpolate({
inputRange:[0,1],
outputRange:["0deg", "360deg"]
});
const rotateStyle = {
transform:[
    {rotate: interpolatedAnimation}
]
}

const loopingAnimation = Animated.loop(
Animated.timing(animated, {
    toValue:1,
    duration:350,
    useNativeDriver: false
})
)
loopingAnimation.start()

export default class PostVideos extends Component{
    state = {
        videoError:false,
        buffering:false,
        paused:true,
        playBackTime:0,
        source:this.props.source
    }

    componentDidMount(){
        console.log(this.props)
    }

    handleError = (meta) => {
        console.log(meta);
        const {code} = meta;
        let error = "An error occurred playing this video";
        
        switch(code){
            case -11800:
            error = "could not load video from URL";
            break;
            }
            this.setState({videoError:error})

            this.setState({buffering:false})
    }

    handleLoadStart = () => {
        loopingAnimation.start()
        // console.log(this.player.onBuffer);
        this.setState({buffering:true, paused:false})
            console.log(this.state.playBackTime)
            setTimeout(()=> {
                if (this.state.playBackTime > 0){
                    this.handleReadyForDisplay()
                }
            }, 10000)
        
        console.log('onstart calll')
      }

    handleBuffer = (meta) => {
        console.log(meta.isBuffering)
        if (meta.isBuffering){
            loopingAnimation.start()
        }
        this.setState({buffering:meta.isBuffering})

      }
    
    handleReadyForDisplay = () => {
        console.log('video ready');
        this.setState({buffering:false})
        // if (this.state.playBackTime < 0.05){
        //     setTimeout(()=> this.setState({paused:true}), 100)
        // }

      }

    render(){
        loopingAnimation.start()
        return(
            
            <View style={Styles.videoBackgroung}>
                <TouchableOpacity onPress={() => this.setState({paused:!this.state.paused})}>
                <Video 
                    source={{uri: this.state.source, type: 'ism'}} 
                    ref={(ref) => {
                        this.player = ref
                      }}  
                    repeat={true}
                    // playInBackground={false}
                    paused={this.state.paused}
                    // muted={this.state.paused}
                    // playWhenInactive={false}
                    onError={this.handleError}
                    // onLoad={this.handleLoadStart}
                    onProgress={(Progress)=> {this.setState({playBackTime:Progress.currentTime})}}
                    // onLoadStart={this.handleLoadStart}
                    poster={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrlB_zanjaqJBouK64g_zERQORBmopxnkNw&usqp=CAU'}
                    posterResizeMode={'cover'}
                    onVideoBuffer={this.handleBuffer}
                    onBuffer={this.handleBuffer}
                    onReadyForDisplay={this.handleReadyForDisplay}
                    bufferConfig={{
                      minBufferMs: 3000,
                      maxBufferMs: 30000,
                      bufferForPlaybackMs: 2500,
                      bufferForPlaybackAfterRebufferMs: 5000
                    }}
                    resizeMode={"contain"}
                    // resizeMode={"cover"}
                    style={{
                    // aspectRatio: 1.8,
                    width: "100%",
                    height: windowWidth * .5625,
                    }} />
                    </TouchableOpacity>
                    {this.state.videoError && <View style={Styles.videoErrorCover}>
                    {this.state.videoError && <Icon name="exclamation-triangle" size={30} color="red" />}
                    {this.state.videoError && <Text>{this.state.videoError}</Text>}
                    </View> }
                    {this.state.buffering && <View style={Styles.videoBufferCover}>
                    {this.state.buffering && <Animated.View style={rotateStyle}><Icon name="circle-o-notch" size={30} color="#FFF" /></Animated.View>}
                    </View>}
                    {this.state.paused && <View onPress={()=>this.handleLoadStart()} style={Styles.videoBufferCover}>
                    {this.state.paused && <Icon onPress={()=>this.handleLoadStart()} name="play" size={50} color="#FFF" />}
                    </View>}
            </View>
        )
    }
}



const Styles = StyleSheet.create({
    videoErrorCover: {
      alignItems:"center",
      justifyContent:"center",
      position:"absolute",
      left:0,
      top:0,
      right:0,
      bottom:0,
      backgroundColor:"rgba(255,255,255, .9)"
    },
    videoBufferCover: {
      alignItems:"center",
      justifyContent:"center",
      position:"absolute",
      left:0,
      top:0,
      right:0,
      bottom:0,
      backgroundColor:"transparent"
    },
    videoBackgroung:{
      backgroundColor:"gray",
    },
  
  });