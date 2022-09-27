import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

//Font.loadAsync('fontFamilyOrFontMap');
//console.log(Font)
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
  const [date, setDate] = useState(new Date());
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
  const [isLoading, setIsLoading] = useState(false);
  
  // função para validar os formulários (precisa de melhorias)
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

  // função para enviar os formularios para o back
  async function fetchMoviesJSON(temp) {
    const response = await fetch('https://upgrade-back-staging.herokuapp.com/auth/cadaster',{
      method: 'POST',
      body: JSON.stringify({
        "name" : nome,
        "email" : email,
        "password" : password,
        "cpf" : cpf,
        "phone" : phone,
        "date_birthday" : temp,
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

  // função de envio de formulários se eles forem válidos
  const salvar = () =>{
    setIsLoading(true)
    let temp = (date.getMonth()+1)+'/'+(date.getDate())+'/'+date.getFullYear()
    // console.log(temp)
    if (validar()){
      setVcadaster('')
      // console.log("manda pro back")
      fetchMoviesJSON(temp).then(teste => {
        // console.log(teste)
        // console.log("pegou resposta")
        if(teste.confirm){
          // console.log("cadastrou")
          setIsLoading(false)
          navigation.navigate("SignIn")
        }else{
          setIsLoading(false)
          setVcadaster("Erro ao cadastrar, verifique seus dados")
          // console.log("não cadastro")
          alert("Verifique seus dados e tente novamente")
        }
        
      });
    }else{
      setIsLoading(false)
    }
  }

  // função para o data picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  // função para modal do data picker
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  // função para mostrar a modal do datapicker
  const showDatepicker = () => {
    showMode('date');
  };



  //função para tela de carregamento durante o envio dos formularios para aguardar a resposta
  const loading = () =>{
    if(isLoading){
      // flex: 1, justifyContent: "center", alignItems: "center", zIndex: 999, height: '100%', width: '100%', backgroundColor: ''
      return(
      <View style={{ position: 'absolute', flex: 1, justifyContent: "center", alignItems: "center", zIndex: 999, height: '100%', width: '100%', backgroundColor: '#00000099' }}>
        <ActivityIndicator color={"#FF7851"} size={100}/> 
      </View>
      )
    }
  }


 return (
   <KeyboardAvoidingView style={styles.container}>
   {loading()}
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
        <Text style={styles.Dados}>Dados Pessoais</Text>
        <Animatable.View animation="fadeInUp" style={styles.containerForm}>

          <Text style={styles.msgerro}>{vcadaster}</Text>
          <Text style={styles.title}>Nome Completo *</Text>
          <TextInput
            placeholder="Nome Completo..."
            onChangeText={setNome}  
            style={styles.TextSenha}
          />
          <Text style={styles.msgerro}>{vnome}</Text>

          <View style={{flexDirection: 'row' }}>          
            <Text style={styles.title}>CPF *</Text>
            <Text style={styles.title}>Telefone (DDD+número) *</Text> 
          </View>

          <View style={{flexDirection: 'row' }}>
            <TextInput 
                keyboardType = "number-pad"
                placeholder="CPF..."
                onChangeText={setCpf}
                style={styles.textHalf}
              />
            <TextInput
                keyboardType="phone-pad"
                placeholder="Telefone..."
                onChangeText={setPhone}
                style={styles.textTel}
              />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.msgerroHalf}>{vcpf}</Text>
            <Text style={styles.msgerroTel}>{vphone}</Text>
          </View>
          
          <Text style={styles.title}>Data de Nascimento *</Text>
          {/* <TextInput
          keyboardType="numbers-and-punctuation"
            placeholder="DD/MM/AAAA"
            onChangeText={setDate}
            style={styles.TextSenha}
          /> */}
          <TouchableOpacity style={styles.datebutton}
          onPress={showDatepicker}>
            <Text style={styles.datetext}>Precione para escolher a data</Text>
          </TouchableOpacity>
          
          <Text style={styles.msgerro}>{vdate}</Text>
          
          <Text style={styles.title}>E-mail *</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="E-mail..."
            onChangeText={setEmail}
            style={styles.TextSenha}
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
          <Text style={styles.Dados}>Endereço</Text>
          
          <Text style={styles.title}>CEP (apenas os números) *</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="CEP..."
            onChangeText={setZip}
            style={styles.TextSenha}
          />
          <Text style={styles.msgerro}>{vzip}</Text>
          <Text style={styles.title}>Estado *</Text>
          <View style={styles.pickercontainer}>
            <Picker
                style={styles.TextSenha}
                selectedValue={country}
                onValueChange={(itemValue, itemIndex) =>setCountry(itemValue)}
                itemStyle={styles.TextSenha}
              >
                <Picker.Item label="Acre" value="Acre" />
                <Picker.Item label="Alagoas" value="Alagoas" />
                <Picker.Item label="Amapá" value="Amapá" />
                <Picker.Item label="Amazonas" value="Amazonas" />
                <Picker.Item label="Bahia" value="Bahia" />
                <Picker.Item label="Ceara" value="Ceara" />
                <Picker.Item label="Distrito Federal" value="Distrito Federal" />
                <Picker.Item label="Espírito Santo" value="Espírito Santo" />
                <Picker.Item label="Goiás" value="Goiás" />
                <Picker.Item label="Maranhão" value="Maranhão" />
                <Picker.Item label="Mato Grosso" value="Mato Grosso" />
                <Picker.Item label="Mato Grosso do Sul" value="Mato Grosso do Sul" />
                <Picker.Item label="Minas Gerais" value="Minas Gerais" />
                <Picker.Item label="Pará" value="Pará" />
                <Picker.Item label="Paraíba" value="Paraíba" />
                <Picker.Item label="Paraná" value="Paraná" />
                <Picker.Item label="Pernambuco" value="Pernambuco" />
                <Picker.Item label="Piauí" value="Piauí" />
                <Picker.Item label="Rio de Janeiro" value="Rio de Janeiro" />
                <Picker.Item label="Rio Grande do Norte" value="Rio Grande do Norte" />
                <Picker.Item label="Rio Grande do Sul" value="Rio Grande do Sul" />
                <Picker.Item label="Rondônia" value="Rondônia" />
                <Picker.Item label="Roraima" value="Roraima" />
                <Picker.Item label="Santa Catarina" value="Santa Catarina" />
                <Picker.Item label="São Paulo" value="São Paulo" />
                <Picker.Item label="Sergipe" value="Sergipe" />
                <Picker.Item label="Tocantins" value="Tocantins" />
              </Picker>
            </View>
          {/* <TextInput
            placeholder="Estado..."
            onChangeText={setCountry}
            style={styles.TextSenha}
          /> */}
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
          <Text style={styles.Obg}>Os campos com * são obrigatórios!</Text>
          <TouchableOpacity style={styles.button} onPress={() => salvar()}>
            <Text style={styles.buttonText}>Cadastrar-se</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRegister}
          onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.registerText}>Já é cadastrado</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </View>
   </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1.,
    backgroundColor: '#1E1E1E',
    paddingBottom: 15,
    //fontFamily: 'Roboto'
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
    marginRight: 100
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
    //fontFamily: 'Inter'
  },
  buttonRegister:{
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText:{
    color: 'white'
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
    color: 'black',
    borderRadius: 50,
    width: '85%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  Dados:{
    color: '#FFFFFF',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 15,
  },
  Obg:{
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 15,
  },
  datebutton:{
    backgroundColor: 'white',
    borderRadius: 50,
    width: '85%',
    height: 30,
    alignSelf: 'center',
    textAlign: 'center'
  },
  datetext:{
    backgroundColor: 'white',
    color: 'black',
    height: 30,
    textAlignVertical: 'center',
    borderRadius: 50,
    width: '100%',
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center'
  },
  pickercontainer:{
    backgroundColor: 'white',
    borderRadius: 50,
    width: '80%',
    alignSelf: 'center',
  },
  textHalf:{
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '35%',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginLeft: 31,
  },
  textTel:{
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '45%',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginLeft: 23,
  },
  msgerroHalf:{
    color:"red",
    fontSize: 20,
    alignSelf:'flex-start',
    marginLeft: 48,
  },
  msgerroTel:{
    color:"red",
    fontSize: 20,
    alignSelf:'flex-start',
    marginLeft: 68,
  }
})