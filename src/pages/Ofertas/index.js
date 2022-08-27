import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';




export default function Ofertas() {

    async function fetchMoviesJSON() {
        const response = await fetch('https://upgrade-back-staging.herokuapp.com/home/itens',{
          method: 'Get',
        });
        const teste = await response.json();
        global.item = teste
        return teste;
    }

    const buscar = () =>{
        fetchMoviesJSON()
    }

 return (

    <View style={styles.container}>
        {buscar()}
        <Text style={styles.text}>Página de Ofertas</Text>
        {   
            // item.map(index =>(
            //     <TouchableOpacity>
            //         <Text style={styles.text}>{index.title}</Text>
            //     </TouchableOpacity>    
            // ))     
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