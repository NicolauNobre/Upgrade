import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import * as Animatable from 'react-native-animatable'

import {Ionicons} from '@expo/vector-icons'

import {useNavigation} from '@react-navigation/native'

sendDatac = (nome, email, password, cpf, phone, date, zip, country, city, street, adress, complement) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "name" : nome,
      "email" : email,
      "password" : password,
      "cpf" : cpf,
      "phone" : phone,
      "date_birthday" : date,
      "zipcode" : zip,
      "country_state" : country,
      "city" : city,
      "street" : street,
      "address_number" : adress,
      "complement" : complement
  })
  };
  fetch('https://upgrade-back-staging.herokuapp.com/cadastro', requestOptions)
  .then(response => {
    if (response.ok) {
      response.json().then(json => {
        console.log(json);
      });
    }
  });
}

export default function Cadastro() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [adress, setAdress] = useState('');
  const [complement, setComplement] = useState('');

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

    <Animatable.View animation="fadeInUp" style={styles.containerForm}>
      <Text style={styles.title}>Nome Completo</Text>
      <TextInput
        placeholder="Nome Completo..."
        onChangeText={setNome}
        style={styles.TextSenha}
      />
      <Text style={styles.title}>CPF</Text>
      <TextInput
        placeholder="CPF..."
        onChangeText={setCpf}
        style={styles.TextSenha}
      />
      <Text style={styles.title}>Telefone</Text>
      <TextInput
        placeholder="Telefone..."
        onChangeText={setPhone}
        style={styles.TextSenha}
      />
      <Text style={styles.title}>Data de Nascimento</Text>
      <TextInput
        placeholder="Data de nascimento..."
        onChangeText={setDate}
        style={styles.TextSenha}
      />
      <Text style={styles.title}>E-mail</Text>
      <TextInput
        placeholder="E-mail..."
        onChangeText={setEmail}
        style={styles.TextInput}
      />
      <Text style={styles.title}>Senha</Text>
      <TextInput
        placeholder="Senha..."
        onChangeText={setPassword}
        style={styles.TextSenha}
        secureTextEntry={true}
      />
      <Text style={styles.title}>Confirmar Senha</Text>
      <TextInput
        placeholder="Senha..."
        style={styles.TextSenha}
        secureTextEntry={true}
      />

      <Text style={styles.title}>CEP</Text>
      <TextInput
        placeholder="CEP..."
        onChangeText={setZip}
        style={styles.TextSenha}
      />
      <Text style={styles.title}>Estado</Text>
      <TextInput
        placeholder="Estado..."
        onChangeText={setCountry}
        style={styles.TextSenha}
      />
      <Text style={styles.title}>Cidade</Text>
      <TextInput
        placeholder="Cidade..."
        onChangeText={setCity}
        style={styles.TextSenha}
      />
      <Text style={styles.title}>Rua</Text>
      <TextInput
        placeholder="Rua..."
        onChangeText={setStreet}
        style={styles.TextSenha}
      />
      <Text style={styles.title}>Número</Text>
      <TextInput
        placeholder="Número..."
        onChangeText={setAdress}
        style={styles.TextSenha}
      />
      <Text style={styles.title}>Complemento</Text>
      <TextInput
        placeholder="Complemento..."
        onChangeText={setComplement}
        style={styles.TextSenha}
      />

      <TouchableOpacity style={styles.button} onPress={() => this.sendDatac(nome, email, password, cpf, phone, date, zip, country, city, street, adress, complement)}>
        <Text style={styles.buttonText}>Cadastrar-se</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRegister}
      onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.registerText}>ja é cadastrado</Text>
      </TouchableOpacity>



    </Animatable.View>



   </ScrollView>
   </KeyboardAvoidingView>
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