import React, {useState, useEffect, useRef} from 'react';
import {KeyboardAvoidingView,ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';


export default function Password() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [vemail, setVemail] = useState('');
  const [send, setSend] = useState('');

  // função para enviar os formularios para o back
  async function fetchMoviesJSON() {
    const response = await fetch('https://upgrade-back-staging.herokuapp.com/auth/password-recovery',{
      method: 'POST',
      body: JSON.stringify({
        "email" : email,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log("espera reposta");
    const teste = await response.json();
    // console.log(teste)
    return teste;
  }

  // função para validar os formularios (precisa de melhorias)
  const validar = () =>{
    setVemail('')
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
    // if(password == ''){
    //   setVpassword("Preencha a Senha")
    //   error = true
    // }else{
    //   if(password == password2){
    //     error = false
    //     setVpassword2("")
    //   }else{
    //     error = true
    //     setVpassword2("Ambas a senhas devem ser iguais")
    //   }
    // }
    return !error
  }

  // função de envio de formulários se eles forem válidos
  const enviar = () =>{
    setIsLoading(true)
    if (validar()){
      setSend('') 
      // console.log("mandando para o back") 
      fetchMoviesJSON().then(teste => {
        // console.log(teste)
        // console.log("pegou resposta")
        
        if(teste.confirm){
          // console.log("enviou")
          setIsLoading(false)
          navigation.navigate('Password2', {
            params: {email: email, codigo: teste.cod},
          })
        }else{
          setSend("Email não registrado")
          // console.log("não enviou")
          setIsLoading(false)
        }
      }).catch(e=>{
        setIsLoading(false)
        setSend("Sem conexão com o servidor")
        // console.log(e)
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
          <Text style={styles.msgerro}>{send}</Text>
          <Text style={styles.Dados}>Um código de confirmação será enviado para o seu email</Text>
          <Text style={styles.msgerro}></Text>
          <Text style={styles.title}>E-mail *</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="E-mail..."
            onChangeText={setEmail}
            style={styles.TextInput}
          />
          <Text style={styles.msgerro}>{vemail}</Text>

          <TouchableOpacity style={styles.buttonback}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.buttonback}
            onPress={() => navigation.navigate('Password2')}>
            <Text style={styles.buttonText}>Próxima página</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.button}
            onPress={() => enviar()}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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
      marginBottom: 5,
      textAlign: 'center',
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
        width: '80%',
        borderRadius: 50,
        paddingVertical: 8,
        marginTop: 15,
        justifyContent:'center',
        alignSelf: 'center',
    },
    buttonback:{
      flexDirection:'row',
      backgroundColor: 'gray',
      width: '80%',
      borderRadius: 50,
      paddingVertical: 8,
      marginTop: 30,
      justifyContent:'center',
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
    Dados:{
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center',
      marginTop: 15,
      paddingRight: 30,
      paddingLeft: 30,
    },
    Obg:{
      color: '#FF7851',
      fontSize: 15,
      alignSelf: 'center',
      marginTop: 15,
    },
  })