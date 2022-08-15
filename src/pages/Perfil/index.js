import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        if(complement =! undefined){

        }else{
          setComplement('')
        }
    }

    
 return (
   <View style={styles.container}>
    <Text style={styles.text}>Página do Perfil da conta</Text>
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
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize: 25,
        fontWeight: 'bold'
    }

});