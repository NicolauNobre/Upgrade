import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';

import validator from 'validator';
import * as Animatable from 'react-native-animatable';
import {Ionicons} from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

export default function Editcadastro(params) {
    //console.log(params.route.params.params.userid)
    const userid = params.route.params.params.userid
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [vemail, setVemail] = useState('');
    const [phone, setPhone] = useState('');
    const [vphone, setVphone] = useState('');
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
        setVemail('')
        setVphone('')
        setVzip('')
        setVadress('')
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
        const response = await fetch('Rota',{
        method: 'POST',
        body: JSON.stringify({
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
        return teste;
    }

    // função de envio de formulários se eles forem válidos
    const salvar = () =>{
        setIsLoading(true)
        if (validar()){
        setVcadaster('')
        // console.log("manda pro back")
        fetchMoviesJSON(temp).then(teste => {
            // console.log(teste)
            // console.log("pegou resposta")
            if(teste.confirm){
            // console.log("cadastrou")
            setIsLoading(false)
            alert("Cadastro Atualizado")
            navigation.goBack()
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

                <Text style={styles.title}>Telefone (DDD+número) *</Text>
                <TextInput
                    keyboardType="phone-pad"
                    placeholder="Telefone..."
                    onChangeText={setPhone}
                    style={styles.TextSenha}
                />
                <Text style={styles.msgerro}>{vphone}</Text>
                
                <Text style={styles.title}>E-mail *</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="E-mail..."
                    onChangeText={setEmail}
                    style={styles.TextSenha}
                />
                <Text style={styles.msgerro}>{vemail}</Text>
            
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
    fontSize: 16,
    marginTop: 10,
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
    color: 'black',
    borderRadius: 50,
    width: '80%',
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
    color: '#FF7851',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 15,
  },
  pickercontainer:{
    backgroundColor: 'white',
    borderRadius: 50,
    width: '80%',
    alignSelf: 'center',
  }
})