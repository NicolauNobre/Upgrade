import React, {useState, useEffect, useRef} from 'react';
import {KeyboardAvoidingView,ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';


export default function Password() {
    const navigation = useNavigation();
 return (
    <KeyboardAvoidingView style={styles.container}>
    <ScrollView style={styles.container}>
    <View style={styles.containerLogo}>
        <Animatable.Image
        animation="flipInY"
          source={require('../../assets/UpGrade.jpg')}
          style = {{ width:'100%'}}
          resizeMode = "contain"
        />
      </View>
      <Text style={styles.Dados}>Sua nova senha sera enviada para seu email</Text>
      <Text style={styles.title}>E-mail *</Text>
      <TextInput
        keyboardType="email-address"
        placeholder="E-mail..."
        //onChangeText={setEmail}
        style={styles.TextInput}
      />
      <Text style={styles.msgerro}></Text>
      <Text style={styles.title}>Senha *</Text>
      <TextInput
        placeholder="Senha..."
        //onChangeText={setPassword}
        style={styles.TextSenha}
        secureTextEntry={true}
      />
      <Text style={styles.msgerro}></Text>
      <Text style={styles.title}>Confirmar Senha *</Text>
      <TextInput
        placeholder="Senha..."
        //onChangeText={setPassword2}
        style={styles.TextSenha}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.buttonText}>Voltar</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
      onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.buttonText}>Confirmar</Text>

      </TouchableOpacity>
   </ScrollView>
   </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    container:{
      flex:1.,
      backgroundColor: '#1E1E1E'
    },
    msgerro:{
      color:"red",
      fontSize: 20,
      alignSelf:'center',
    },
    title:{
      color: '#FF7851',
      fontSize: 16,
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
      fontSize: 16,
      marginTop: 10,
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
        flexDirection:'row',
        backgroundColor: '#FF7851',
        width: '20%',
        borderRadius: 50,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent:'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText:{
        flexDirection:'row',
      color: '#1E1E1E',
      fontSize: 18,
    },
    buttonRegister:{
      marginTop: 14,
      alignSelf: 'center'
    },
    registerText:{
      color: '#FF7851'
    },
    TextInput:{
      backgroundColor: 'white',
      color: '#A3A3A3',
      borderRadius: 50,
      width: '80%',
      alignSelf: 'center',
      textAlign: 'center'
    },
    TextSenha:{
      backgroundColor: 'white',
      color: '#A3A3A3',
      borderRadius: 50,
      width: '80%',
      alignSelf: 'center',
      textAlign: 'center'
    },
    Dados:{
      color: '#FFFFFF',
      fontSize: 20,
      alignSelf: 'center',
      marginTop: 15,
    },
    Obg:{
      color: '#FF7851',
      fontSize: 15,
      alignSelf: 'center',
      marginTop: 15,
    },
  })