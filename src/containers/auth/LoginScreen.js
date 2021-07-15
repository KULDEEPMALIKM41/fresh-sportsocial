import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  item
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import images from '../../res/images';
import colors from '../../res/colors';
import { login } from '../../services/auth_curd';
import {FloatingLabelInput} from 'react-native-floating-label-input';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoginScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const _signInAsync = () => {
    let email_error_flag = false;
    let password_error_flag = false;
    if (email == ''){
      email_error_flag = false;
      setEmailError('Please enter phone number or email.');
    }else{
      setEmailError('');
      email_error_flag = true;
    }
    if (password == ''){
      password_error_flag = false;
      setPasswordError('Please enter password.');
    }else{
      password_error_flag = true;
      setPasswordError('');
    }
    if (email_error_flag && password_error_flag){
      let data = {
        "username": email,
        "password" : password,
      };
      login(data)
      .then(async (response) => {
        try {
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(response.data.data)
          );
        } catch (error) {
          console.log(error)
        }
        // let value = await AsyncStorage.getItem('userData');
        // console.log(value);
        navigation.navigate('Home');
      }, (error) => {
        if (error.response){
          Alert.alert('', error.response.data.message);
        }else{
          Alert.alert('', 'server in under maintanance');
        }
      });
    }
  }

  const fromValidation = (name, value) => {
    if (value == '' && name == 'email'){
      setEmailError('Please enter phone number or email.');
    }else if (value == '' && name == 'password'){
      setPasswordError('Please enter password.');
    }else{
      setEmailError('');
      setPasswordError('');
    }
  }

  const changeHandler = (value, name) => {
    if (name === 'email'){
      setEmail(value);
    }else if (name === 'password'){
      setPassword(value);
    }
    fromValidation(value, name);
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={Styles.container}> 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View >
      <View style={Styles.logoContainer}>
        <Text style={{color:'#000', fontSize:28, fontFamily:"BigShouldersText-Black",}}>Sign in with phone or email</Text>
      </View>
      <View style={Styles.userNameContainer}>
      <FloatingLabelInput
       containerStyles={{
        borderBottomWidth:1,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderColor: colors.textFaded2 ,
      }}
      customLabelStyles={{
        fontSizeFocused: 14,
      }}
      labelStyles={{
        marginLeft:-5,
        fontFamily:'serif',
        letterSpacing:1,
      }}
      inputStyles={{
        color: 'black',
        padding: 0,
        margin:0,
        marginTop:7,
        fontSize:20,
        fontFamily:"BigShouldersText-Black",
        marginBottom:-7
      }}
        label={'phone number or email'}
        value={email}
        inputstyle={{color:'red'}}
        onChangeText={text=> changeHandler(text, "email")}
      />
      </View>
      {
        emailError ? 
        <View style={Styles.errorContainer}>
          <Text style={{color:'red', fontSize:16}}>{emailError}</Text>
        </View> :
        null
      }
      
      <View style={Styles.passwordContainer}>
      <FloatingLabelInput
       containerStyles={{
        borderBottomWidth:1,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderColor: colors.textFaded2 , 
      }}
      isPassword
      customLabelStyles={{
        fontSizeFocused: 14,
      }}
      labelStyles={{
        marginLeft:-5,
        fontFamily:'serif',
        letterSpacing:1,
      }}
      inputStyles={{
        color: 'black',
        padding: 0,
        margin:0,
        marginTop:3,
        fontSize:20,
        letterSpacing:1,
        fontFamily:"BigShouldersText-Black",
        marginBottom:-15
      }}
        label={'enter password'}
        value={password}
        onChangeText={text=>  changeHandler(text, "password")}
      />
      </View>
      {
        passwordError ?
        <View style={Styles.errorContainer}>
          <Text style={{color:'red', fontSize:16}}>{passwordError}</Text>
        </View> :
        null
      }
    
      <TouchableOpacity style={Styles.loginContainer} onPress={_signInAsync}>
        <Text style={Styles.loginText}>Continue</Text>
      </TouchableOpacity>

      <View style={Styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={ () => navigation.navigate('ForgotPassword') }>
          <Text style={Styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 30,
          marginBottom:10
        }}>
        <Text style={{color: '#969696'}}>Don't have an account ?</Text>
        <TouchableOpacity onPress={ () => navigation.navigate('Signup') } >
          <Text style={{color: '#5365A2', textDecorationLine: 'underline',fontWeight:'bold'}}> Sign Up.</Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height:'auto',
    width:'70%',
    paddingLeft:25
  },
  userNameContainer: {
    // height: 40,
    justifyContent: 'center', 
    marginLeft:38,
    marginEnd: 40,
    marginBottom:20,
    marginTop:20,
  },
  errorContainer:{
    justifyContent: 'center',
    marginTop: -18,
    marginStart: 40,
    marginEnd: 20,
    marginBottom: 20,
  },
  passwordContainer: {
    borderColor: colors.textFaded2,
    borderBottomWidth: 1,
    // height: 40,
    justifyContent: 'center',
    marginStart: 38,
    marginEnd: 38,
    backgroundColor: '#fff',
    marginBottom:20,
    marginTop:20
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgotPasswordText: {
    color: '#5365A2',
    fontWeight:'bold',
    // fontFamily:"BigShouldersText-Black",
    textDecorationLine: 'underline',
  },
  loginContainer: {
    alignItems: 'center',
    height: 50,
    margin: 40,
    backgroundColor: '#5365A2',
    justifyContent: 'center',
    borderRadius: 25,
  },
  loginText: {
    color: '#fff',
    fontSize:18,
    fontFamily:"BigShouldersText-Black",
    letterSpacing:1
  },
});