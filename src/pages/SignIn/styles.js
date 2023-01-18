import {ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container:{
      flex:1.,
      backgroundColor: '#1E1E1E'
    },
    title:{
      color: '#FF7851',
      fontSize: 16,
      fontFamily: 'inter'
    },
    whiteText:{
      color: 'white',
      alignSelf:'center'
    },
    orangetext:{
      color: '#FF7851',
      alignSelf:'center'
    },
    msgerro:{
      color:"red",
      fontSize: 20,
      alignSelf:'center',
    },
  
    containerHeader:{
      marginBottom: '8%',
      marginTop: '14%',
      paddingStart: '5%',
    },
    message:{
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FF7851' 
    },
    containerForm:{
      backgroundColor: '#1E1E1E',
      flex:1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%',
    },
    title: {
      color: '#FF7851',
      fontSize: 20,
      marginTop: 28,
      marginLeft: 35,
      marginBottom: 5,
    },
    input:{
      backgroundColor: '#FFFFFF',
      color: '#FF7851',
      borderBottomWidth: 1,
      height: 40,
      marginBottom: 12,
      fontSize: 16,
    },
    button:{
      backgroundColor: '#FF7851',
      width: '80%',
      borderRadius: 50,
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    buttonText:{
      color: 'white',
      fontSize: 18,
    },
    buttonRegister:{
      marginTop: 14,
      alignSelf: 'center'
    },
    registerText:{
      color: '#FF7851',
      alignSelf:'center'
    },
    TextInput:{
      backgroundColor: 'white',
      color: 'black',
      borderRadius: 50,
      width: '80%',
      alignSelf: 'center',
      textAlign: 'center'
    },
    TextSenha:{
      backgroundColor: 'white',
      color: 'black',
      borderRadius: 50,
      width: '80%',
      alignSelf: 'center',
      textAlign: 'center'
    },
    forget:{
      color: '#FFFFFF',
      fontSize: 13,
      alignSelf: 'center',
      marginTop: 10,
    },
    ou:{
      color: '#FFFFFF',
      fontSize: 16  ,
      alignSelf: 'center',
    },
    button2:{
      backgroundColor: '#DB4A39',
      width: '80%',
      borderRadius: 50,
      paddingVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    line:{
      borderBottomColor: '#E7E7E7',
      borderBottomWidth: 2,
      marginTop: 10,
      marginBottom: 5,
    }
  })

export default styles;