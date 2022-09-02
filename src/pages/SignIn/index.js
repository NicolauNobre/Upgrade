import React, {useState, useEffect, useRef} from 'react';
import styles from "./styles";
import {ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, Touchable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';


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

  async function fetchMoviesJSON() {
    const response = await fetch('https://upgrade-back-staging.herokuapp.com/auth/login',{
      method: 'POST',
      body: JSON.stringify({
        "email" : email,
        "password" : password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("espera reposta");
    const teste = await response.json();
    return teste;
  }
  
  const enviar = () =>{
    if (validar()){
      setV2login('') 
      console.log("mandando para o back") 
      fetchMoviesJSON().then(teste => {
        // console.log(teste)
        console.log("pegou resposta e chama login")
        const id = teste.user_id
        
        if(teste.confirm){
          console.log("logou")
          navigation.navigate('Initial', {
            params: {userid: id},
          })
        }else{
          setV2login("Usuário ou senha inválidos")
          console.log("não logou")
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
      <TouchableOpacity styles={styles.buttonRegister}>
      <Text style={styles.registerText} onPress={() => navigation.navigate("Password")}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      {/* <Text style={styles.ou}>Ou</Text>
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate("Initial")}>Entrar com o Google</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.buttonRegister}
      onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.registerText}>Não possui uma conta? Registre-se</Text>

      </TouchableOpacity>
      
    </Animatable.View>
   </ScrollView>
  );
}
