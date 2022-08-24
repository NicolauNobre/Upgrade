import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import validator from 'validator'
import * as Animatable from 'react-native-animatable'
import {Ionicons} from '@expo/vector-icons'

import {useNavigation} from '@react-navigation/native'

export default function Cadastro() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [vnome, setVnome] = useState('');
  const [email, setEmail] = useState('');
  const [vemail, setVemail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [vpassword, setVpassword] = useState('')
  const [cpf, setCpf] = useState('');
  const [vcpf, setVcpf] = useState('')
  const [phone, setPhone] = useState('');
  const [vphone, setVphone] = useState('');
  const [date, setDate] = useState('');
  const [vdate, setVdate] = useState('');
  const [zip, setZip] = useState('');
  const [vzip, setVzip] = useState('');
  const [country, setCountry] = useState('');
  const [vcountry, setVcountry] = useState('');
  const [city, setCity] = useState('');
  const [vcity, setVcity] = useState('');
  const [street, setStreet] = useState('');
  const [vstreet, setVstreet] = useState('');
  const [adress, setAdress] = useState('');
  const [vadress, setVadress] = useState('');
  const [complement, setComplement] = useState('');
  const [vcadaster, setVcadaster] = useState('');
  
  const validar = () =>{
    setVcpf('')
    setVemail('')
    setVpassword('')
    setVphone('')
    setVzip('')
    setVdate('')
    setVadress('')
    setVnome('')
    setVcountry('')
    setVcity('')
    setVstreet('')
    let error = false
    let regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    let match = regex.test(email)
    if (match){
    } else{
        setVemail("Email inválido")
        error = true
    }

    if (cpf == '' || cpf.length != 11){
      setVcpf("CPF inválido")
      error = true
    }

    if(password != password2 || password == ''){
      setVpassword('senhas diferentes ou vazias')
      error = true
    }

    if (phone == '' || phone.length > 12 || phone.length < 10){
      setVphone("telefone inválido")
      error = true
    }

    if (zip== '' || zip.length > 8 || zip.length < 8){
      setVzip("CEP inválido")
      error = true
    }

    if(adress == '' || adress.length>5){
      setVadress("número invalido")
      error = true
    }

    if(date == ''){
      setVdate("Preencha a data")
      error = true
    }

    if(nome == ''){
      setVnome("Preencha o campo nome")
      error = true
    }

    if(country == ''){
      setVcountry("Preencha o campo estado")
      error = true
    }

    if(city == ''){
      setVcity("preencha o campo Cidade")
      error = true
    }

    if(street == ''){
      setVstreet("preencha o campo Rua")
      error = true
    }

    return !error
  }

  async function fetchMoviesJSON() {
    const response = await fetch('https://upgrade-back-staging.herokuapp.com/auth/cadaster',{
      method: 'POST',
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
        "address_complement" : complement,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const teste = await response.json();
    return teste;
  }

  const salvar = () =>{
    if (validar()){
      setVcadaster('')
      console.log("manda pro back")
      fetchMoviesJSON().then(teste => {
        console.log(teste)
        console.log("pegou resposta")
        if(teste.confirm){
          console.log("cadastrou")
          navigation.navigate("SignIn")
        }else{
          setVcadaster("Email ja cadastrado")
          console.log("não cadastro")
        }
        
      });
    }
  }

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
      <Text style={styles.msgerro}>{vcadaster}</Text>
      <Text style={styles.title}>Nome Completo *</Text>
      <TextInput
        placeholder="Nome Completo..."
        onChangeText={setNome}
        style={styles.TextSenha}
      />
      <Text style={styles.msgerro}>{vnome}</Text>
      <Text style={styles.title}>CPF *</Text>
      <TextInput
        keyboardType = "number-pad"
        placeholder="CPF..."
        onChangeText={setCpf}
        style={styles.TextSenha}
      />
      <Text style={styles.msgerro}>{vcpf}</Text>
      <Text style={styles.title}>Telefone (DDD+número) *</Text>
      <TextInput
        keyboardType="phone-pad"
        placeholder="Telefone..."
        onChangeText={setPhone}
        style={styles.TextSenha}
      />
      <Text style={styles.msgerro}>{vphone}</Text>
      <Text style={styles.title}>Data de Nascimento *</Text>

      <TextInput
      keyboardType="numbers-and-punctuation"
        placeholder="DD/MM/AAAA"
        onChangeText={setDate}
        style={styles.TextSenha}
      />
      <Text style={styles.msgerro}>{vdate}</Text>
      
      <Text style={styles.title}>E-mail *</Text>
      <TextInput
        keyboardType="email-address"
        placeholder="E-mail..."
        onChangeText={setEmail}
        style={styles.TextInput}
      />
      <Text style={styles.msgerro}>{vemail}</Text>
      <Text style={styles.title}>Senha *</Text>
      <TextInput
        placeholder="Senha..."
        onChangeText={setPassword}
        style={styles.TextSenha}
        secureTextEntry={true}
      />
      <Text style={styles.msgerro}>{vpassword}</Text>
      <Text style={styles.title}>Confirmar Senha *</Text>
      <TextInput
        placeholder="Senha..."
        onChangeText={setPassword2}
        style={styles.TextSenha}
        secureTextEntry={true}
      />
      <Text style={styles.msgerro}>{vpassword}</Text>
      <Text style={styles.title}>CEP (apenas os números) *</Text>
      <TextInput
        keyboardType="number-pad"
        placeholder="CEP..."
        onChangeText={setZip}
        style={styles.TextSenha}
      />
      <Text style={styles.msgerro}>{vzip}</Text>
      <Text style={styles.title}>Estado *</Text>
      <TextInput
        placeholder="Estado..."
        onChangeText={setCountry}
        style={styles.TextSenha}
      />
      <Text style={styles.msgerro}>{vcountry}</Text>
      <Text style={styles.title}>Cidade *</Text>
      <TextInput
        placeholder="Cidade..."
        onChangeText={setCity}
        style={styles.TextSenha}
      />
      <Text style={styles.msgerro}>{vcity}</Text>
      <Text style={styles.title}>Rua *</Text>
      <TextInput
        placeholder="Rua..."
        onChangeText={setStreet}
        style={styles.TextSenha}
      />
      <Text style={styles.msgerro}>{vstreet}</Text>
      <Text style={styles.title}>Número *</Text>
      <TextInput
        keyboardType="number-pad"
        placeholder="Número..."
        onChangeText={setAdress}
        style={styles.TextSenha}
      />
      <Text style={styles.msgerro}>{vadress}</Text>
      <Text style={styles.title}>Complemento</Text>
      <TextInput
        placeholder="Complemento..."
        onChangeText={setComplement}
        style={styles.TextSenha}
      />
      <TouchableOpacity style={styles.button} onPress={() => salvar()}>
        <Text style={styles.buttonText}>Cadastrar-se</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRegister}
      onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.registerText}>Já é cadastrado</Text>
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