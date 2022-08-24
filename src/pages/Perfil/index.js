import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Feather} from '@expo/vector-icons'

export default function Perfil() {
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
        let userid = "62fac1ca944b5fa5b2bb4708"
        const response = await fetch('https://upgrade-back-staging.herokuapp.com/user/profile',{
          method: 'POST',
          body: JSON.stringify({
            "user_id" : userid,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        console.log("esperando reposta");
        const teste = await response.json();
        return teste;
      }


    const buscar = () =>{
        fetchMoviesJSON().then(teste => {
        // console.log("pegou itens")
        // console.log(teste)
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
        // if(complement =! undefined){

        // }else{
        //   setComplement('')
        // }
    }
    buscar()

    
 return (
   <View style={styles.container}>
    <Feather style={styles.user} name="user" size={27} color="#FF7851"/>
    <Text style={styles.text1}>Página do Perfil da conta</Text>
    <Text style={styles.text}>Nome: {nome}</Text>
    <Text style={styles.text}>Email: {email}</Text>
    <Text style={styles.text}>Documento: {cpf}</Text>
    <Text style={styles.text}>Telefone: {phone}</Text>
    <Text style={styles.text}>Endereço:</Text>
    <Text style={styles.text}>Cidade: {city}, Rua: {street}</Text>
    <Text style={styles.text}>Número: {adress}, CEP: {zip} {complement}</Text>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#1E1E1E',
        flex:1,
    },
    user:{
      justifyContent: 'center',
      alignItems:'center',
      marginTop: 20,
      marginLeft: 190,
    },
    text1:{
      alignItems: 'center',
      justifyContent: 'center',
      color:'#FF7851',
      fontSize: 25,
      marginTop: 28,
      marginBottom: 12,
      marginLeft: 70,
    },
    text:{
      color:'#FF7851',
      fontSize: 20,
      marginTop: 28,
      marginBottom: 5,
      flexDirection: 'column',
      alignItems: 'flex-start',
          
    }

});