import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView,ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Perfil(params) {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    // console.log(params.route.params.id);
    const userid = params.route.params.id
    const reload = params.route.params.reload;
    // console.log(reload);
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [adress, setAdress] = useState('');
    const [complement, setComplement] = useState('');
    const [dados, setDados] = useState('');

    // função para busca de dados do usuário
    async function fetchMoviesJSON() {
      setIsLoading(true)
      const response = await fetch('https://upgrade-back-staging.herokuapp.com/user/profile',{
        method: 'POST',
        body: JSON.stringify({
          "user_id" : userid,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log("esperando reposta");
      const teste = await response.json();
      setIsLoading(false)
      //recebe os dados do usuário
      setEmail(teste.email)
      setNome(teste.name)
      setCpf(teste.cpf)
      setPhone(teste.phone)
      setZip(teste.zipcode)
      setCity(teste.city)
      setStreet(teste.street)
      setAdress(teste.address_number)
      setComplement(teste.address_complement)
      setDados(teste)
    }

    if(reload){
      useEffect( () => {
        fetchMoviesJSON();
      }, []);
    }

    // função para tela de carregamento enquanto busca dados do usuário
    const loading = () =>{
      if(isLoading){
          // console.log('buscando...')
          return(
              <View style={{ position: 'absolute', flex: 1, justifyContent: "center", alignItems: "center", zIndex: 999, height: '100%', width: '100%', backgroundColor: '#00000099' }}>
                  <ActivityIndicator color={"#FF7851"} size={100}/> 
              </View>
          )
      }
  }

  return (
    <ScrollView style={styles.container}>
      {loading()}
      <ScrollView style={styles.header}>
        <LinearGradient 
          colors={['#1E1E1E', '#E6E6E6']}
          style={styles.linearGradient}
          start={{ x: 0, y: 0.8 }}
          >

          {/* <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Registro", {
            params: {userid: userid},
            })}>
            <Text style={styles.buttonText}>Vender</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Itens", {
            params: {userid: userid},
            })}>
            <Text style={styles.buttonText}>Meus Itens a Venda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Sales", {
            params: {userid: userid},
            })}>
            <Text style={styles.buttonText}>Minhas Vendas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Purchases", {
            params: {userid: userid},
            })}>
            <Text style={styles.buttonText}>Minhas compras</Text>
          </TouchableOpacity>

          <View style={styles.line}/>
          <View style={styles.areaButton}>
            <Feather style={styles.labelButton} name="user" size={60} color="#FF7851"/>
          </View>

        </LinearGradient>
      </ScrollView>

      <Text style={styles.text1}>{nome}</Text>
      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Welcome")}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Changepassword", {
          params: {userid: userid},
          })}>
        <Text style={styles.buttonText}>Trocar Senha</Text>
      </TouchableOpacity>

      <Text style={styles.textout}>Dados pessoais</Text>
      <View style={styles.infobackground}>
        <Text style={styles.text}>Nome: {nome}</Text>
        <View style={styles.line}/>
        <Text style={styles.text}>Email: {email}</Text>
        <View style={styles.line}/>
        <Text style={styles.text}>Documento: {cpf}</Text>
        <View style={styles.line}/>
        <Text style={styles.text}>Telefone: {phone}</Text>
      </View>
      <Text style={styles.textout}>Endereço</Text>
      <View style={styles.infobackground}>
        <Text style={styles.text}>Cidade: {city}, Rua: {street}</Text>
        <View style={styles.line}/>
        <Text style={styles.text}>Número: {adress}, CEP: {zip} {complement}</Text>
      </View>
      <TouchableOpacity style={styles.buttonedit}
        onPress={() => navigation.navigate("Editcadastro", {
        params: {userid: userid, data: dados},
        })}
        >
        <Text style={styles.buttonText}>Editar dados</Text>
      </TouchableOpacity>
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container:{
      backgroundColor: '#E6E6E6',
      flex:1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  user:{
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 20,
    marginLeft: 190,
  },
  text1:{
    alignSelf:'center',
    color:'#1E1E1E',
    fontSize: 25,
    marginTop: 20,
    marginBottom: 12,
  },
  text:{
    color:'black',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 10
  },
  button:{
    flexDirection:'row',
    backgroundColor: '#FF7851',
    width: '80%',
    borderRadius: 50,
    paddingVertical: 8,
    marginTop: 14,
    marginBottom: 5,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonedit:{
    flexDirection:'row',
    backgroundColor: '#FF7851',
    width: '80%',
    borderRadius: 50,
    paddingVertical: 8,
    marginTop: 20,
    marginBottom: 5,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText:{
    flexDirection:'row',
    color: 'white',
    fontSize: 18,
  },
  areaButton:{
    backgroundColor: 'white',
    height: 120,
    width: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 20,
  },
  labelButton:{
      color: '#FF7851',
      marginTop: 4,
      textAlign: 'center',
  },
  line:{
    borderBottomColor: '#A3A3A3',
    borderBottomWidth: 2,
  },
  infobackground:{
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 10,
    borderColor: '#1E1E1E',
    borderWidth: 0.4
  },
  textout:{
    color:'#1E1E1E',
    fontSize: 30,
    marginTop: 28,
    marginBottom: 5,
    alignSelf: 'center',
  },
  header:{
    backgroundColor: '#1E1E1E',
  },
  linearGradient:{
    width: '100%',
    alignItems: 'center',
  },
  line:{
      borderBottomColor: '#E7E7E7',
      borderBottomWidth: 2,
  }
});