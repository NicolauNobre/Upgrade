import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

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
  const [label, setLabel] = useState('D/M/A');
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
    if (email == ''){
      setVemail("Email inválido")
      error = true
    }else if (match){
      setEmail(toString(email))
    }else{
        setVemail("Email inválido")
        error = true
    }

    var digitoscpf = 0
    var confirma = true
    for(let i=0; i<cpf.length; i++){
      digitoscpf= digitoscpf + parseInt(cpf[i])
      // console.log(cpf[i])
    }
    // console.log(digitoscpf)
    if( digitoscpf == 33 || digitoscpf == 44 || digitoscpf == 55 || digitoscpf == 66){
      confirma = false
    }


    if (cpf == '' || cpf.length != 11 || confirma){
      setVcpf("CPF inválido")
      error = true
    }

    if(password != password2 || password == ''){
      setVpassword('senhas diferentes')
      error = true
    }else{
      setPassword(toString(password))
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
    }else{
      setAdress(toString(adress))
    }

    if(date == ''){
      setVdate("Preencha a data")
      error = true
    }

    if(nome == ''){
      setVnome("Preencha o campo nome")
      error = true
    }else{
      setNome(toString(nome))
    }

    if(country == ''){
      setVcountry("Escolha um estado")
      error = true
    }else{
      setCountry(toString(country))
    }

    if(city == ''){
      setVcity("preencha o campo Cidade")
      error = true
    }else{
      setCity(toString(city))
    }

    if(street == ''){
      setVstreet("preencha o campo Rua")
      error = true
    }else{
      setStreet(toString(street))
    }

    if(complement){
      setComplement(toString(complement))
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
    setLabel((selectedDate.getDate())+'/'+(selectedDate.getMonth()+1)+'/'+selectedDate.getFullYear());
    setDate(currentDate);
    // event.preventDefault();
  };
  // função para modal do data picker
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      mode: currentMode,
      is24Hour: true,
      onChange,
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
            style={styles.textNome}
          />
          <Text style={styles.msgerro}>{vnome}</Text>

          <View style={{flexDirection: 'row' }}>          
            <Text style={styles.title}>CPF *</Text>
            <Text style={styles.titleTel}>Telefone (DDD+número) *</Text> 
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
          
          <View style={{flexDirection: 'row' }}>
            <Text style={styles.titleEmail}>E-mail *</Text>
            <Text style={styles.titleData}>Data *</Text>
          </View>
          
          {/* <TextInput
          keyboardType="numbers-and-punctuation"
            placeholder="DD/MM/AAAA"
            onChangeText={setDate}
            style={styles.TextSenha}
          /> */}

          <View style={{flexDirection: 'row' }}>
          <TextInput
            keyboardType="email-address"
            placeholder="E-mail..."
            onChangeText={setEmail}
            style={styles.textEmail}
          />
          <TouchableOpacity style={styles.datebutton}
          onPress={showDatepicker}>
            <Text style={styles.datetext}>{label}</Text>
          </TouchableOpacity>
          </View>
          
          <View style={{flexDirection: 'row' }}>
            <Text style={styles.msgerro}>{vdate}</Text>
            <Text style={styles.msgerroEmail}>{vemail}</Text>
          </View>

          <View style={{flexDirection: 'row' }}>
            <Text style={styles.titleSenha}>Senha *</Text>
            <Text style={styles.titleSenha}>Confirmar Senha *</Text>
          </View>

          <View style={{flexDirection: 'row' }}>
          <TextInput
            placeholder="Senha..."
            onChangeText={setPassword}
            style={styles.textSenha}
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Senha..."
            onChangeText={setPassword2}
            style={styles.textSenha}
            secureTextEntry={true}
          />
          </View>

          <View style={{flexDirection: 'row' }}>
            <Text style={styles.msgerroSenha}>{vpassword}</Text>
            <Text style={styles.msgerroCSenha}>{vpassword}</Text>
          </View>

          <Text style={styles.Dados}>Endereço</Text>
          
          <View style={{flexDirection: 'row' }}>
            <Text style={styles.titleCEP}>CEP (apenas números) *</Text>
            <Text style={styles.title}>Estado *</Text>
          </View>

          <View style={{flexDirection: 'row' }}>
            <TextInput
              keyboardType="number-pad"
              placeholder="CEP..."
              onChangeText={setZip}
              style={styles.textCEP}
            />
            <View style={styles.pickercontainer}>
              <Picker
                  style={styles.textEst}
                  selectedValue={country}
                  onValueChange={(itemValue, itemIndex) =>setCountry(itemValue)}
                  itemStyle={styles.textEst}
                >
                  <Picker.Item label="UF" value=''/>
                  <Picker.Item label="AC" value="Acre" />
                  <Picker.Item label="AL" value="Alagoas" />
                  <Picker.Item label="AP" value="Amapá" />
                  <Picker.Item label="AM" value="Amazonas" />
                  <Picker.Item label="BA" value="Bahia" />
                  <Picker.Item label="CE" value="Ceara" />
                  <Picker.Item label="DF" value="Distrito Federal" />
                  <Picker.Item label="ES" value="Espírito Santo" />
                  <Picker.Item label="GO" value="Goiás" />
                  <Picker.Item label="MA" value="Maranhão" />
                  <Picker.Item label="MG" value="Mato Grosso" />
                  <Picker.Item label="MS" value="Mato Grosso do Sul" />
                  <Picker.Item label="MG" value="Minas Gerais" />
                  <Picker.Item label="PA" value="Pará" />
                  <Picker.Item label="PB" value="Paraíba" />
                  <Picker.Item label="PR" value="Paraná" />
                  <Picker.Item label="PE" value="Pernambuco" />
                  <Picker.Item label="PI" value="Piauí" />
                  <Picker.Item label="RJ" value="Rio de Janeiro" />
                  <Picker.Item label="RN" value="Rio Grande do Norte" />
                  <Picker.Item label="RS" value="Rio Grande do Sul" />
                  <Picker.Item label="RO" value="Rondônia" />
                  <Picker.Item label="RR" value="Roraima" />
                  <Picker.Item label="SC" value="Santa Catarina" />
                  <Picker.Item label="SP" value="São Paulo" />
                  <Picker.Item label="SE" value="Sergipe" />
                  <Picker.Item label="TO" value="Tocantins" />
                </Picker>
              </View>
          </View>

          <View style={{flexDirection: 'row' }}>
            <Text style={styles.msgerroCEP}>{vzip}</Text>
            <Text style={styles.msgerroEst}>{vcountry}</Text>
          </View>

          {/* <TextInput
            placeholder="Estado..."
            onChangeText={setCountry}
            style={styles.TextSenha}
          /> */}

          <Text style={styles.title}>Cidade *</Text>
          <TextInput
            placeholder="Cidade..."
            onChangeText={setCity}
            style={styles.textCity}
          />
          <Text style={styles.msgerro}>{vcity}</Text>
          <Text style={styles.title}>Rua *</Text>
          <TextInput
            placeholder="Rua..."
            onChangeText={setStreet}
            style={styles.textRua}
          />
          <Text style={styles.msgerro}>{vstreet}</Text>

          <View style={{flexDirection: 'row' }}>
            <Text style={styles.titleNumber}>Número *</Text>
            <Text style={styles.titleComp}>Complemento</Text>
          </View>

          <View style={{flexDirection: 'row' }}>
            <TextInput
              keyboardType="number-pad"
              placeholder="Número..."
              onChangeText={setAdress}
              style={styles.textNumber}
            />
            <TextInput
              placeholder="Complemento..."
              onChangeText={setComplement}
              style={styles.textComp}
            />
          </View>

          <View>
            <Text style={styles.msgerroNumber}>{vadress}</Text>
          </View>

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
  },
  containerHeader:{
    marginBottom: '8%',
    marginTop: '14%',
    paddingStart: '5%',
  },
  containerForm:{
    backgroundColor: '#1E1E1E',
    flex:1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  msgerro:{
    color:"red",
    fontSize: 16,
    alignSelf:'center',
  },
  msgerroHalf:{
    color:"red",
    fontSize: 16,
    alignSelf:'flex-start',
    marginLeft: 60,
  },
  msgerroTel:{
    color:"red",
    fontSize: 16,
    alignSelf:'flex-start',
    marginLeft: 98,
  },
  msgerroEmail:{
    color:"red",
    fontSize: 16,
    alignSelf:'flex-start',
    marginLeft: 110,
  },
  msgerroSenha:{
    color:"red",
    fontSize: 16,
    alignSelf:'flex-start',
    marginLeft: 45,
  },
  msgerroCSenha:{
    color:"red",
    fontSize: 16,
    alignSelf:'flex-start',
    marginLeft: 80,
  },
  msgerroCEP:{
    color:"red",
    fontSize: 16,
    alignSelf:'flex-start',
    marginLeft: 65,
  },
  msgerroEst:{
    color:"red",
    fontSize: 16,
    alignSelf:'flex-start',
    marginLeft: 90,
  },
  msgerroNumber:{
    color:"red",
    fontSize: 16,
    alignSelf:'flex-start',
    marginLeft: 45,
    width: 80
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF7851' 
  },
  title: {
    color: '#FF7851',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 35,
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '41%'
  },
  titleTel: {
    color: '#FF7851',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 100,
    alignSelf: 'flex-start'
  },
  titleEmail: {
    color: '#FF7851',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 35,
    marginBottom: 5,
    width: '66%',
    alignSelf: 'flex-start'
  },
  titleSenha: {
    color: '#FF7851',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 35,
    marginBottom: 5,
    width: '39%'
  },
  titleData: {
    color: '#FF7851',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 100,
    alignSelf: 'flex-start'
  },
  titleCEP:{
    color: '#FF7851',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 35,
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '50%'
  },
  titleComp:{
    color: '#FF7851',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '50%'
  },
  titleNumber:{
    color: '#FF7851',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 35,
    alignSelf: 'flex-start',
    width: '28%'
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
    width: '20%',
    height: 30,
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginLeft: 23
  },
  
  datetext:{
    backgroundColor: 'white',
    color: 'gray',
    height: 30,
    textAlignVertical: 'center',
    borderRadius: 50,
    width: '100%',
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
  },
  pickercontainer:{
    backgroundColor: 'white',
    borderRadius: 50,
    width: '41%',
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 31
  },
  textNome:{
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '85%',
    alignSelf: 'center',
    textAlign: 'center',
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
  textEmail:{
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '60%',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginLeft: 31,
  },
  textSenha:{
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '39%',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginLeft: 31,
  },
  TextSenha:{
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '50%',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginLeft: 31,
  },
  textCEP:{
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '37%',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginLeft: 31,
  },
  textEst:{
    backgroundColor: 'white',
    color: 'black',
    width: '65%',
    alignSelf: 'center',
    textAlign: 'center'
  },
  textCity:{
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '85%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  textRua:{
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '85%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  textNumber:{
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '20%',
    textAlign: 'center',
    marginLeft: 31,
  },
  textComp:{
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 50,
    width: '58%',
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginLeft: 31,
  }
})