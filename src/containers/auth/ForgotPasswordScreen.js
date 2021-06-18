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
    Keyboard,
  } from 'react-native';
  import React from 'react';
  import images from '../../res/images';
  import colors from '../../res/colors';
  import { sendOtp, verifyOtp, resetPassword } from '../../services/auth_curd';
  
  export default function ForgotPasswordScreen({navigation}) {
    const [email, setEmail] = React.useState('');
    const [emailEditable, setEmailEditable] = React.useState(true);
    const [emailError, setEmailError] = React.useState('');
    const [otpField, setOtpField] = React.useState(false);
    const [otp, setOtp] = React.useState('');
    const [otpError, setOtpError] = React.useState('');
    const [resetPasswordField, setResetPasswordField] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
    const [newPasswordError, setNewPasswordError] = React.useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = React.useState('');
  
    const submitForm = () => {
      let email_error_flag = false;
      let otp_error_flag = false;
      if (email == ''){
        email_error_flag = false;
        setEmailError('Please enter phone number or email.');
      }else{
        setEmailError('');
        email_error_flag = true;
      }
      if (otpField){
        if (otp == ''){
            otp_error_flag = false;
            setOtpError('Please enter OTP.');
        }else{
            if (otp.length < 6){
              otp_error_flag = false;
              setOtpError('Not valid OTP.');
            }else{
              setOtpError('');
              otp_error_flag = true;
          }
        }
      }
      if (email_error_flag && otp_error_flag ){
        let data = {
          "username": email,
          "otp" : otp
        };

        verifyOtp(data)
        .then((response) => {
          Alert.alert('', response.data.message);
          setResetPasswordField(true);
        }, (error) => {
          console.log(error.response);
          if (error.response){
            Alert.alert('', error.response.data.message);
          }else{
            Alert.alert('', 'server in under maintanance');
          }
        });
      }else if (email_error_flag && !otpField ){
        let data = {
          "username": email,
        };

        sendOtp(data)
        .then((response) => {
          Alert.alert('', response.data.message)
          setEmailEditable(false);
          setOtpField(true);
        }, (error) => {
          console.log(error.response);
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
      }else if (value == '' && name == 'otp'){
        setOtpError('Please enter OTP.');
      }else if (value == '' && name == 'npassword'){
        setNewPasswordError('Please enter new password.');
      }else if (value == '' && name == 'cnpassword'){
        setConfirmNewPasswordError('Please enter confirm new password.');
      }{
        setEmailError('');
        setOtpError('');
        setNewPasswordError('');
        setConfirmNewPasswordError('');
      }
    }

    const changePassword = () => {
      let new_password_error_flag = false;
      let confirm_new_password_error_flag = false;
      if (newPassword == ''){
        new_password_error_flag = false;
        setNewPasswordError('Please enter new password.');
      }else{
        setNewPasswordError('');
        new_password_error_flag = true;
      }
      if (confirmNewPassword == ''){
        confirm_new_password_error_flag = false;
        setConfirmNewPasswordError('Please enter confirm new password.');
      }else{
        setConfirmNewPasswordError('');
        confirm_new_password_error_flag = true;
      }
      if (new_password_error_flag && confirm_new_password_error_flag ){
        if (newPassword == confirmNewPassword){
          let data = {
            "username": email,
            "password":newPassword,
            "password_confirmation":confirmNewPassword,
          };
  
          resetPassword(data)
          .then((response) => {
            Alert.alert('', response.data.message);
            navigation.navigate('Login');
          }, (error) => {
            console.log(error.response);
            if (error.response){
              Alert.alert('', error.response.data.message);
            }else{
              Alert.alert('', 'server in under maintanance');
            }
          });
        }else{
          Alert.alert('', 'New password and Confirm new password not match.');
        }
      }
    }
  
    const changeHandler = (value, name) => {
      if (name === 'email'){
        setEmail(value);
      }else if (name === 'otp'){
        setOtp(value);
      }else if (name == 'npassword'){
        setNewPassword(value);
      }else if (name == 'cnpassword'){
        setConfirmNewPassword(value);
      }
      fromValidation(value, name);
    }
    return (
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : null} style={Styles.container}> 
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={Styles.logoContainer}>
        <Image source={images.app_logo} style={{height: 50, width:225}} />
        </View>
        {
          !resetPasswordField ? 
          <>
           <View>
         <View style={Styles.userNameContainer}>
         <TextInput
           style={Styles.userNameInput}
           onChangeText={text=> changeHandler(text, "email")}
           placeholder="Phone number or email"
           placeholderTextColor={colors.textFaded2}
           editable={emailEditable}
         />
       </View>
       {
         emailError ? 
         <View style={Styles.errorContainer}>
           <Text style={{color:'red'}}>{emailError}</Text>
         </View> :
         null
       }
       {
       otpField ? 
       <View style={Styles.passwordContainer}>
           <TextInput
               style={Styles.userNameInput}
               onChangeText={text=> changeHandler(text, "otp")}
               placeholder="OTP"
               maxLength={6}
               keyboardType='numeric'
               placeholderTextColor={colors.textFaded2}
           />
       </View> :
       null
       }
       {
           otpField ? otpError ? 
           <View style={Styles.errorContainer}>
               <Text style={{color:'red'}}>{otpError}</Text>
           </View> :
           null :
           null
       }
       <TouchableOpacity style={Styles.loginContainer} onPress={submitForm}>
       {
       otpField ?
       <Text style={Styles.loginText}>Verify OTP</Text> :
       <Text style={Styles.loginText}>Send OTP</Text> 
       }
       </TouchableOpacity> 
       </View>

        </> :
         <>
         <View style={Styles.userNameContainer}>
          <TextInput
            secureTextEntry={true}
            textContentType='password'
            style={Styles.userNameInput}
            onChangeText={text=> changeHandler(text, "npassword")}
            placeholder="New Password"
            placeholderTextColor={colors.textFaded2}
          />
        </View>
        {
          newPasswordError ? 
          <View style={Styles.errorContainer}>
            <Text style={{color:'red'}}>{newPasswordError}</Text>
          </View> :
          null
        }
        <View style={Styles.passwordContainer}>
          <TextInput
            secureTextEntry={true}
            keyboardType='default'
            textContentType='password'
            style={Styles.userNameInput}
            onChangeText={text=> changeHandler(text, "cnpassword")}
            placeholder="Confirm New Password"
            placeholderTextColor={colors.textFaded2}
          />
        </View>
        {
          confirmNewPasswordError ? 
          <View style={Styles.errorContainer}>
              <Text style={{color:'red'}}>{confirmNewPasswordError}</Text>
          </View> :
          null 
        }
        <TouchableOpacity style={Styles.loginContainer} onPress={changePassword}>
        <Text style={Styles.loginText}>Change Password</Text>
        </TouchableOpacity>
         </>
        }
        
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
    },
    userNameContainer: {
      borderColor: '#262626',
      backgroundColor: colors.loginInputBackground,
      borderWidth: 1,
      borderRadius: 5,
      height: 40,
      justifyContent: 'center',
      //alignItems: 'center',
      marginStart: 20,
      marginEnd: 20,
      marginTop: 40,
      marginBottom: 20,
    },
    userNameInput: {
      marginStart: 10,
      color: 'white',
    },
    passwordContainer: {
        borderColor: '#262626',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        //alignItems: 'center',
        marginStart: 20,
        marginEnd: 20,
        backgroundColor: colors.loginInputBackground,
        marginBottom: 20,
      },
    errorContainer:{
      justifyContent: 'center',
      //alignItems: 'center',
      marginTop: -15,
      marginStart: 25,
      marginEnd: 20,
      marginBottom: 20,
    },
    resendContainer:{
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: -15,
        // marginStart: 25,
        marginEnd: 20,
        marginBottom: 20,
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