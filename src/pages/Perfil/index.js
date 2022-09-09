import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView,ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native';

export default function Perfil(params) {
    const navigation = useNavigation();
    // console.log(params.route.params.id);
    const userid = params.route.params.id
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [adress, setAdress] = useState('');
    const [complement, setComplement] = useState('');


    async function fetchMoviesJSON() {
        // let userid = "62fac1ca944b5fa5b2bb4708"
        const response = await fetch('https://upgrade-back-staging.herokuapp.com/user/profile',{
          method: 'POST',
          body: JSON.stringify({
            "user_id" : userid,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        // console.log("esperando reposta");
        const teste = await response.json();
        return teste;
      }


    const buscar = () =>{
        fetchMoviesJSON().then(teste => {
        setEmail(teste.email)
        setNome(teste.name)
        setCpf(teste.cpf)
        setPhone(teste.phone)
        setZip(teste.zipcode)
        setCity(teste.city)
        setStreet(teste.street)
        setAdress(teste.address_number)
        setComplement(teste.address_complement)     
        });
    }
    buscar()


  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Sales", {
        params: {userid: userid},
        })}>
        <Text style={styles.buttonText}>Minhas Vendas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Itens", {
        params: {userid: userid},
        })}>
        <Text style={styles.buttonText}>Meus Itens a Venda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Purchases", {
        params: {userid: userid},
        })}>
        <Text style={styles.buttonText}>Minhas compras</Text>
      </TouchableOpacity>
      <View style={styles.line}/>
      <ImageBackground source={require('../../assets/UpGrade.jpg')} resizeMode="cover" style={styles.image}>
          <View style={styles.areaButton}>
            <Feather style={styles.labelButton} name="user" size={27} color="#FF7851"/>
          </View>
          <Text style={styles.text1}>{nome}</Text>
          <Text style={styles.text}>Nome: {nome}</Text>
          <Text style={styles.text}>Email: {email}</Text>
          <Text style={styles.text}>Documento: {cpf}</Text>
          <Text style={styles.text}>Telefone: {phone}</Text>
          <Text style={styles.text}>Endereço:</Text>
          <Text style={styles.text}>Cidade: {city}, Rua: {street}</Text>
          <Text style={styles.text}>Número: {adress}, CEP: {zip} {complement}</Text>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
      backgroundColor: '#1E1E1E',
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
    color:'white',
    fontSize: 25,
    marginTop: 28,
    marginBottom: 12,
  },
  text:{
    color:'white',
    fontSize: 20,
    marginTop: 28,
    marginBottom: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
        
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
  buttonText:{
      flexDirection:'row',
    color: '#1E1E1E',
    fontSize: 18,
  },
  areaButton:{
    backgroundColor: 'white',
    height:60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 10,
  },
  labelButton:{
      color: '#FF7851',
      marginTop: 4,
      textAlign: 'center',
  },
  line:{
    borderBottomColor: '#A3A3A3',
    borderBottomWidth: 2,
}
});