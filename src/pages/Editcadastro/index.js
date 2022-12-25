import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

export default function Editcadastro(params) {
    //console.log(params.route.params.params.userid)
    const userid = params.route.params.params.userid
    const dados = params.route.params.params.data
    // console.log(dados)
    const navigation = useNavigation();

    const [email, setEmail] = useState(dados.email.toString());
    const [vemail, setVemail] = useState('');
    const [phone, setPhone] = useState(dados.phone.toString());
    const [vphone, setVphone] = useState('');
    const [zip, setZip] = useState(dados.zipcode.toString());
    const [vzip, setVzip] = useState('');
    const [country, setCountry] = useState(dados.country_state.toString());
    const [vcountry, setVcountry] = useState('');
    const [city, setCity] = useState(dados.city.toString());
    const [vcity, setVcity] = useState('');
    const [street, setStreet] = useState(dados.street.toString());
    const [vstreet, setVstreet] = useState('');
    const [adress, setAdress] = useState(dados.address_number.toString());
    const [vadress, setVadress] = useState('');
    const [complement, setComplement] = useState(dados.address_complement.toString());
    const [vcadaster, setVcadaster] = useState('');
    const [validcep, setValidcep] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    
    // função para validar os formulários (precisa de melhorias)
    const validar = () =>{
      setVemail('')
      setVphone('')
      setVzip('')
      setVphone('')
      setVzip('')
      setVadress('')
      setVcountry('')
      setVcity('')
      setVstreet('')
      let error = false
      let regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
      if( email == ''){
        setVemail("Preencha seu email")
        error = true
      }else{
        let match = regex.test(email)
        if (match){
          setEmail(email.toString())
        } else{
            setVemail("Email inválido")
            error = true
        }
      }
      var regexphone = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
      let cphone = regexphone.test(phone);

      if (phone == '' || !cphone){
        setVphone("telefone inválido")
        error = true
      }else{
        setPhone(phone.toString())
      }

      if(!validcep){
        setVzip("CEP Inválido")
        error = true
      }else{
        setZip(zip.toString())
      }

      if(country == '' || country == null){
        setVcountry("Escolha um estado")
        error = true
      }else{
        setCountry(country.toString())
      }

      if(city == '' || city == null){
        setVcity("Digite sua cidade")
        error = true
      }else{
        setCity(adress.toString())
      }

      if(street == '' || street == null){
        setVstreet("Digite sua rua")
        error = true
      }else{
        setStreet(street.toString())
      }

      if(adress == '' || adress == null){
        setVadress("Digite seu número")
        error = true
      }else{
        setAdress(adress.toString())
      }

      if(complement){
        setComplement(complement.toString())
      }

      return !error
    }

    // função para enviar os formularios para o back
    async function fetchMoviesJSON() {
        // console.log(email)
        // console.log(phone)
        // console.log(zip)
        // console.log(country)
        // console.log(city)
        // console.log(street)
        // console.log(adress)
        // console.log(complement)
        const response = await fetch('https://upgrade-back-staging.herokuapp.com/user/update-cadaster',{
        method: 'PUT',
        body: JSON.stringify({
            "user_id": userid,
            "email" : email,
            "phone" : phone,
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
        // console.log(teste)
        return teste;
    }

    // conexão com a Api de cep para buscar os dados de endereço
    async function sendcep(buscacep) {
      const response = await fetch('https://brasilapi.com.br/api/cep/v1/'+buscacep,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      return result;
    }

    // função de envio de formulários se eles forem válidos
    const salvar = () =>{
        setIsLoading(true)
        if (validar()){
        setVcadaster('')
        // console.log("manda pro back")
        fetchMoviesJSON().then(teste => {
            // console.log(teste)
            // console.log("pegou resposta")
            if(teste.confirm){
              // console.log("cadastrou")
              setIsLoading(false)
              alert("Cadastro Atualizado")
              navigation.goBack()
            }else{
              setIsLoading(false)
              setCity(city);
              setCountry(country);
              setStreet(street);
              setVcadaster("Erro ao cadastrar, verifique seus dados")
              // console.log("não cadastro")
              alert("Verifique seus dados e tente novamente")
            }
            
        }).catch(e=>{
          setIsLoading(false)
          setCity(city);
          setCountry(country);
          setStreet(street);
          setVcadaster("Sem conexão com o servidor")
          // console.log(e)
        });
        }else{
          setCity(city);
          setCountry(country);
          setStreet(street);
          setIsLoading(false)
        }
    }

    // Função para preencher os outros campo a partir do cep, se ele for valido
    const filladress = (value)=>{
      setVzip('')
      sendcep(value).then(result => {
        // console.log(result)
        // console.log("pegou resposta") 
        if(result.cep){
          // console.log('achou');
          // console.log(result);
          setCountry(result.state);
          setCity(result.city);
          let simple = result.street.split('-')
          setStreet(simple[0])
          setVcountry('')
          setVcity('')
          setVstreet('')
          return true
        }else{
          setCity('fodac')
          setVzip("CEP inválido");
          return(false);
        }       
      }).catch(e=>{
        setIsLoading(false)
        console.log(e)
        return false
      });
    }

    // Verifica se é um cep com o tamanho certo
    const iscepvalid = (cep) =>{
      let isvalid = false
      cep = cep.toString()
      if(cep.length>=1){
        setVzip("CEP inválido");
      }else{
        setVzip("");
      }
      if(cep.length >= 8){
        isvalid = true
      }
      
      return isvalid;
    }

    // chama as funções para enviar o Cep
    const callfunction = (value)=>{
      setZip(value)
      if(iscepvalid(value)){
        filladress(value);
        setValidcep(true);
      }
    }
  

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
                {/* <Text style={styles.Dados}>Dados Pessoais</Text> */}
                <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.msgerro}>{vcadaster}</Text>

                <Text style={styles.titleTel}>Telefone (DDD+número) *</Text>
                <TextInput
                    keyboardType="phone-pad"
                    placeholder="Telefone..."
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.TextInput}
                />
                <Text style={styles.msgerro}>{vphone}</Text>
                
                <Text style={styles.titleEmail}>E-mail *</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="E-mail..."
                    value={email}
                    onChangeText={setEmail}
                    style={styles.TextInput}
                />
                <Text style={styles.msgerro}>{vemail}</Text>
            
                <Text style={styles.Dados}>Endereço</Text>
          
                <View style={{flexDirection: 'row' }}>
                  <Text style={styles.titleCEP}>CEP (apenas números)</Text>
                  <Text style={styles.title}>Estado</Text>
                </View>

                <View style={{flexDirection: 'row' }}>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="CEP..."
                    value={zip}
                    onChangeText={value=>{callfunction(value)}}
                    style={styles.textCEP}
                  />
                  <View style={styles.pickercontainer}>
                    <RNPickerSelect
                      onValueChange={(value) => setCountry(value)}
                      value={country}
                      placeholder = {{
                        label: 'Código UF', 
                        value: null, 
                        color: '#C7C7CD',
                      }}
                      items={[
                        { label: 'AC', value: 'AL', color: 'black'},
                        { label: 'AL', value: 'AL', color: 'black'},
                        { label: 'AP', value: 'AP', color: 'black'},
                        { label: 'AM', value: 'AM', color: 'black'},
                        { label: 'BA', value: 'BA', color: 'black'},
                        { label: 'CE', value: 'CE', color: 'black'},
                        { label: 'DF', value: 'DF', color: 'black'},
                        { label: 'ES', value: 'ES', color: 'black'},
                        { label: 'GO', value: 'GO', color: 'black'},
                        { label: 'MA', value: 'MA', color: 'black'},
                        { label: 'MT', value: 'MT', color: 'black'},
                        { label: 'MS', value: 'MS', color: 'black'},
                        { label: 'MG', value: 'MG', color: 'black'},
                        { label: 'PR', value: 'PR', color: 'black'},
                        { label: 'PB', value: 'PB', color: 'black'},
                        { label: 'PA', value: 'PA', color: 'black'},
                        { label: 'PE', value: 'PE', color: 'black'},
                        { label: 'PI', value: 'PI', color: 'black'},
                        { label: 'Rj', value: 'RJ', color: 'black'},
                        { label: 'RN', value: 'RN', color: 'black'},
                        { label: 'RS', value: 'RS', color: 'black'},
                        { label: 'RO', value: 'RO', color: 'black'},
                        { label: 'RR', value: 'RR', color: 'black'},
                        { label: 'SC', value: 'SC', color: 'black'},
                        { label: 'SE', value: 'SE', color: 'black'},
                        { label: 'SP', value: 'SP', color: 'black'},
                        { label: 'TO', value: 'TO', color: 'black'},
                      ]}
                    />
                    </View>
                </View>
                <View style={{flexDirection: 'row' }}>
                  <Text style={styles.msgerroCEP}>{vzip}</Text>
                  <Text style={styles.msgerroEst}>{vcountry}</Text>
                </View>

                <Text style={styles.title}>Cidade</Text>
                <TextInput
                  placeholder="Cidade..."
                  value={city}
                  onChangeText={setCity}
                  style={styles.textCity}
                />
                <Text style={styles.msgerro}>{vcity}</Text>
                <Text style={styles.title}>Rua</Text>
                <TextInput
                  placeholder="Rua..."
                  value={street}
                  onChangeText={setStreet}
                  style={styles.textRua}
                />
                <Text style={styles.msgerro}>{vstreet}</Text>

                <View style={{flexDirection: 'row' }}>
                  <Text style={styles.titleNumber}>Número</Text>
                  <Text style={styles.titleComp}>Complemento</Text>
                </View>

                <View style={{flexDirection: 'row' }}>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="Número..."
                    value={adress}
                    onChangeText={setAdress}
                    style={styles.textNumber}
                  />
                  <TextInput
                    placeholder="Complemento..."
                    value={complement}
                    onChangeText={setComplement}
                    style={styles.textComp}
                  />
                </View>
                <View>
                  <Text style={styles.msgerroNumber}>{vadress}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => salvar()}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRegister}
                onPress={() => navigation.goBack()}>
                    <Text style={styles.registerText}>Cancelar</Text>
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
    marginLeft: 50,
    marginBottom: 5,
    marginRight: 100,
    alignSelf: 'flex-start'
  },
  titleEmail: {
    color: '#FF7851',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 50,
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
    marginTop: 20,
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
    color: 'black',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 30,
    textAlign: 'center',
    borderRadius: 50,
    width: '41%',
    alignSelf: 'center',
    marginLeft: 31,
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