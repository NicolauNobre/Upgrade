import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, TouchableOpacity, ScroolView} from 'react-native';



export default function Ofertas() {
    const [nitem, setNitem] = useState(null);




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
            // console.log("pegou itens")
            let n = 0
            teste.map(productmap => {n =0
                console.log("testando", teste[n])
                $('#Add').append(`<View>AAAAAAA</View>`)
                n++;
            })
        });
    }
    buscar()

 return (
    <ScroolView id='Add'>
        <View style={styles.container}>
            <Text style={styles.text1}>Página de Ofertas</Text>
            <Text style={styles.text}>Total de Ofertas: {nitem}</Text>

   </View>
   </ScroolView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor: '#1E1E1E'
    },
    text:{
        fontSize: 25,
        color:'#FF7851',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonRegister:{
        backgroundColor: '#1E1E1E',
        marginTop: 30,
        borderRadius: 50,
        width: '45%',
        alignSelf: 'center'
    },
    text1:{
        fontSize: 25,
        color:'#FF7851',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
    },

});