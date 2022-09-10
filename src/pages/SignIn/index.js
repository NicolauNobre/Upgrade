import React, {useState, useEffect, useRef} from 'react';
import styles from "./styles";
import {ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false);

  // função para validar os formularios
  const validar = () =>{
    setVemail('')
    setVpassword('')
    setV2login('')
    let error = false
    let regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    let match = regex.test(email)
    if (match){
    } else{
      if(email== ''){
        setVemail("Preencha o Email")
        error = true
      }else
        setVemail("Preencha o Email corretamente")
        error = true
    }
    if(password == ''){
      setVpassword("Preencha a Senha")
      error = true
    }
    return !error

  }

  // função para enviar os formularios para o back
  async function fetchMoviesJSON() {
    const response = await fetch('https://upgrade-back-staging.herokuapp.com/auth/login',{
      method: 'POST',
      body: JSON.stringify({
        "email" : email,
        "password" : password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log("espera reposta");
    const teste = await response.json();
    return teste;
  }
  
  // função de envio de formulários se eles forem válidos
  const enviar = () =>{
    setIsLoading(true)
    if (validar()){
      setV2login('') 
      // console.log("mandando para o back") 
      fetchMoviesJSON().then(teste => {
        // console.log(teste)
        // console.log("pegou resposta e chama login")
        const id = teste.user_id
        
        if(teste.confirm){
          // console.log("logou")
          setIsLoading(false)
          navigation.navigate('Initial', {
            params: {userid: id},
          })
        }else{
          setV2login("Usuário ou senha inválidos")
          // console.log("não logou")
          setIsLoading(false)
        }

      });
    }else{
      setIsLoading(false)
    }
  }

  //função para tela de carregamento durante o envio dos formularios para aguardar a resposta
  const loading = () =>{
    if(isLoading){
      return(
      <View style={{ position: 'absolute', flex: 1, justifyContent: "center", alignItems: "center", zIndex: 999, height: '100%', width: '100%', backgroundColor: '#00000099' }}>
        <ActivityIndicator color={"#FF7851"} size={100}/> 
      </View>
      )
    }
  }
  

 return (
    <View style={{height: '100%'}}>
      {loading()}
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

          <TouchableOpacity style={styles.buttonRegister}
          onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.registerText}>Não possui uma conta? Registre-se</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}
