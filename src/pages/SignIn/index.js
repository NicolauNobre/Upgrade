import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable'

import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

export default function SignIn() {
  const navigation = useNavigation();
 return (
   <View style={styles.container}>
    <View style={styles.containerLogo}>
        <Animatable.Image
        animation="flipInY"
          source={require('../../assets/UpGrade.jpg')}
          style = {{ width:'100%'}}
          resizeMode = "contain"
        />
      </View>

    <Animatable.View animation="fadeInUp" style={styles.containerForm}>
      <Text style={styles.title}>E-mail</Text>
      <TextInput
        placeholder="E-mail..."
        style={styles.TextInput}
      
      />
      <Text style={styles.title}>Senha</Text>
      <TextInput
        placeholder="Senha..."
        style={styles.TextSenha}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRegister}
      onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.registerText}>Não possui uma conta? Registre-se</Text>

      </TouchableOpacity>



    </Animatable.View>



   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1.,
    backgroundColor: '#1E1E1E'
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
  }
})