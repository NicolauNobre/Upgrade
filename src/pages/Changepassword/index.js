import React, {useState, useEffect, useRef} from 'react';
import {KeyboardAvoidingView,ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';


export default function Changepassword(params) {
    const navigation = useNavigation();

    const userid = params.route.params.params.userid;
    // console.log (userid)

    const [isLoading, setIsLoading] = useState(false);
    const [oldpassword, setOldpassword] = useState('');
    const [voldpassword, setVoldpassword] = useState('');
    const [send, setSend] = useState('');

    // função para enviar os formularios para o back
    async function fetchMoviesJSON() {
        const response = await fetch('https://upgrade-back-staging.herokuapp.com/auth/verify-password',{
        method: 'POST',
        body: JSON.stringify({
          "user_id" : userid,
          "current_password" : oldpassword,
        }),
        headers: { 'Content-Type': 'application/json' },
        });
        // console.log("espera reposta");
        const teste = await response.json();
        return teste;
    }

    // useEffect( () => {
    //     fetchMoviesJSON2();
    // }, []);

    // função para validar os formularios (precisa de melhorias)
    const validar = () =>{
        setVoldpassword('')
        let error = false
        if(oldpassword == ''){
          setVoldpassword("Preencha sua senha antiga")
          error = true
        }
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
            // alert("Senha alterada com sucesso!")
            navigation.navigate("Changepassword2", {
              params: {userid: userid},
            })
            }else{
            setSend(teste.message)
            // console.log("não enviou")
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
            <Text style={styles.Dados}>Confirme sua senha</Text>
            <Text style={styles.msgerro}></Text>
            <Text style={styles.title}>Senha antiga *</Text>
            <TextInput
                placeholder="Antiga senha..."
                onChangeText={setOldpassword}
                style={styles.TextInput}
                secureTextEntry={true}
            />
            <Text style={styles.msgerro}>{voldpassword}</Text>

            <TouchableOpacity style={styles.buttonback}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>

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
      color: 'white',
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