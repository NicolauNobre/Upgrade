import React, {useState, useEffect, useRef} from 'react';
import styles from "./styles";
import {ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

//'https://upgrade-back-staging.herokuapp.com/login'

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vemail, setVemail] = useState('');
  const [vpassword, setVpassword] = useState('');
  const [v2login, setV2login] = useState('');

  const validar = () =>{
    setVemail('')
    setVpassword('')
    let error = false
    let regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    let match = regex.test(email)
    if (match){
    } else{
        setVemail("Preencha o Email corretamente")
        error = true
    }
    if(password == ''){
      setVpassword("Preencha a Senha")
    }
    return !error

  }

  const logar = (teste) =>{
    let ll = false
    if (teste.confirm){
      ll = false
    }else{
      setV2login("Usuário ou senha inválidos")
      ll = true
    }
    return !ll
  }
  async function fetchMoviesJSON() {
    const response = await fetch('https://upgrade-back-staging.herokuapp.com/login',{
      method: 'POST',
      body: JSON.stringify({
        "email" : email,
        "password" : password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const teste = await response.json();
    return teste;
  }
  
  const enviar = () =>{
    if (validar()){
      setV2login('')  
      fetchMoviesJSON().then(teste => {
        console.log(teste),
        console.log("pegou resposta e chama login")
        let statuslogin = logar(teste)
        console.log(statuslogin)
        
        if (statuslogin){
          console.log("login efetuado")
          navigation.navigate("Welcome")
        }
      });
    }
  }
  
 return (
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
      <Text style={styles.msgerro}>{v2login}</Text>
      <Text style={styles.title}>E-mail</Text>
      <TextInput
        placeholder="E-mail..."
        onChangeText={value => setEmail(value)}
        style={styles.TextInput}
      />
      <Text style={styles.msgerro}>{vemail}</Text>
      <Text style={styles.title}>Senha</Text>
      <TextInput
        placeholder="Senha..."
        onChangeText={value => setPassword(value)}
        style={styles.TextSenha}
        secureTextEntry={true}
      />
      <Text style={styles.msgerro}>{vpassword}</Text>
      <TouchableOpacity style={styles.button} onPress={() => enviar()}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRegister}
      onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.registerText}>Não possui uma conta? Registre-se</Text>

      </TouchableOpacity>
    </Animatable.View>
   </ScrollView>
  );
}
