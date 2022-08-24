import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';



export default function Ofertas() {
    const [nitem, setNitem] = useState(null);
    const [itens, setItens] = useState([])


    async function fetchMoviesJSON() {
        const response = await fetch('https://upgrade-back-staging.herokuapp.com/home/itens',{
          method: 'Get',
        });
        const teste = await response.json();
        return teste;
    }

    const buscar = () =>{
        fetchMoviesJSON().then(teste => {
        setNitem (teste.length)
        setItens (teste)
        });
    }
    buscar()

 return (
   <View style={styles.container}>
    <Text style={styles.text}>Página de Ofertas</Text>
    <Text style={styles.text}>Total de Ofertas: {nitem}</Text>
    {
        itens.map(index =>(
            <Text style={styles.text}>{index.title}</Text>    
        ))
    }
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
    },
    buttonRegister:{
        backgroundColor: '#1E1E1E',
        marginTop: 30,
        borderRadius: 50,
        width: '45%',
        alignSelf: 'center'
    },

});