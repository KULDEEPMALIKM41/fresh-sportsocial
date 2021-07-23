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
  import {FloatingLabelInput} from 'react-native-floating-label-input';
  
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
            <Text style={{color:'#000', fontSize:28, fontFamily:"BigShouldersText-Black",}}>Forgot Password</Text>
          </View>
        {
          !resetPasswordField ? 
          <>
           <View>
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
              fontFamily: Platform.OS === 'ios' ? 'Avenir-Roman' : 'serif',
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
              onChangeText={text=> changeHandler(text, "email")}
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
              fontFamily: Platform.OS === 'ios' ? 'Avenir-Roman' : 'serif',
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
              label={'otp'}
              value={otp}
              onChangeText={text=> changeHandler(text, "otp")}
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
              fontFamily: Platform.OS === 'ios' ? 'Avenir-Roman' : 'serif',
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
            isPassword
              label={'new password'}
              value={newPassword}
              onChangeText={text=> changeHandler(text, "npassword")}
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
              fontFamily: Platform.OS === 'ios' ? 'Avenir-Roman' : 'serif',
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
            isPassword
              label={'confirm new password'}
              value={confirmNewPassword}
              onChangeText={text=> changeHandler(text, "cnpassword")}
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
      backgroundColor: '#fff',
    },
    logoContainer: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height:'auto',
      paddingLeft:38
    },
    userNameContainer: {
      justifyContent: 'center',
      marginLeft:38,
      marginEnd: 40,
      marginBottom:20,
      marginTop:20,
      },
    userNameInput: {
      marginStart: 10,
      color: 'white',
    },
    passwordContainer: {
      justifyContent: 'center',
      marginStart: 38,
      marginEnd: 38,
      marginBottom:20,
      marginTop:20
    },
      errorContainer:{
        justifyContent: 'center',
        marginTop: -18,
        marginStart: 40,
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