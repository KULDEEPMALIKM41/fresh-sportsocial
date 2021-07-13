import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import images from '../../res/images';
import colors from '../../res/colors';
import { login } from '../../services/auth_curd';

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
        Alert.alert('', JSON.stringify(error))
        // if (error.response){
        //   Alert.alert('', error.response.data.message);
        // }else{
        //   Alert.alert('', 'server in under maintanance');
        // }
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
      <Image source={images.app_logo} style={{height: 50, width:'66%'}} />
      </View>
      <View style={Styles.userNameContainer}>
        <TextInput
          style={Styles.userNameInput}
          onChangeText={text=> changeHandler(text, "email")}
          placeholder="Phone number or email"
          placeholderTextColor={colors.textFaded2}
        />
      </View>
      {
        emailError ? 
        <View style={Styles.errorContainer}>
          <Text style={{color:'red'}}>{emailError}</Text>
        </View> :
        null
      }
      
      <View style={Styles.passwordContainer}>
        <TextInput
          secureTextEntry={true}
          style={Styles.passwordInput}
          onChangeText={text=>  changeHandler(text, "password")}
          placeholder="Password"
          placeholderTextColor={colors.textFaded2}
        />
      </View>
      {
        passwordError ?
        <View style={Styles.errorContainer}>
          <Text style={{color:'red'}}>{passwordError}</Text>
        </View> :
        null
      }
      <View style={Styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={ () => navigation.navigate('ForgotPassword') }>
          <Text style={Styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={Styles.loginContainer} onPress={_signInAsync}>
        <Text style={Styles.loginText}>Log In</Text>
      </TouchableOpacity>
      <View
        style={{
          //flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <View style={{flex: 1, height: 1, backgroundColor: '#262626'}}></View>
        <Text style={{marginLeft: 40, marginRight: 40, color: '#969696'}}>
          OR
        </Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: '#262626',
          }}></View>
      </View>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={images.facebookLogo} style={{width: 20, height: 20}} />
        <TouchableOpacity style={{alignItems: 'center', marginStart: 10}}>
          <Text style={{color: '#008bef'}}>Log In With Facebook</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#262626',
            height: 1,
          }}></View>
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
          <Text style={{color: '#008bef'}}> Sign Up.</Text>
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
    backgroundColor: '#000',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height:'auto',
  },
  userNameContainer: {
    borderColor: '#262626',
    backgroundColor: colors.loginInputBackground,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  userNameInput: {
    marginStart: 10,
    color: 'white',
  },
  errorContainer:{
    justifyContent: 'center',
    marginTop: -15,
    marginStart: 25,
    marginEnd: 20,
    marginBottom: 20,
  },
  passwordContainer: {
    borderColor: '#262626',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: colors.loginInputBackground,
    marginBottom: 20,
  },
  passwordInput: {marginStart: 10, color: 'white'},
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginEnd: 20,
  },
  forgotPasswordText: {
    color: '#0088f8',
  },
  loginContainer: {
    alignItems: 'center',
    height: 40,
    marginTop: 30,
    backgroundColor: '#0088f8',
    justifyContent: 'center',
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
  loginText: {
    color: '#fff',
  },
});