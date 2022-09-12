import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Pageitem(params) {
    const navigation = useNavigation();
    const [quant, setQuant] = useState('1');
    const [vquant, setVquant] = useState('');
    // console.log(params.route.params.params.item)

    global.index = params.route.params.params.item;
    const userid = params.route.params.params.id

    // função para adicionar o itens no carrinho (compra)
    async function fetchMoviesJSON() {
        let response = await fetch('https://upgrade-back-staging.herokuapp.com/cart/Addcart/',{
          method: 'POST',
          body: JSON.stringify({
            "productId": index._id,
            "quantity": quant,
            "userId" : userid,
            "status" : "1"
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        // console.log("Registrando no carrinho...")
        let teste = await response.json();
        return teste;
    }

    // função para validar a quantidade de itens que o usuário deseja
    const validar = () =>{
        setVquant("")
        if(quant > index.amount){
            setVquant("Quantidade indisponivel!")
        }else{
            fetchMoviesJSON().then(teste => {
                // console.log(teste)
                
                if(teste.confirm){
                    //console.log("Registrou no carrinho")
                    navigation.navigate('Initial', {
                        params: {userid: userid},
                    })
                }else{
                    //console.log("Não registrou")
                    alert("compra não registrada")
                }
        
            });
        }
    }

 return (
    <View style={styles.container}>
        <Text style={styles.prod}>Informações sobre o produto:</Text>
        <View style={styles.line}/>
        <ScrollView style={styles.scrollcontainer}>
            <View style={styles.itemcontainer}>
                <Text style={styles.titletext}>{index.title}</Text>
                <Image
                    source={require('../../assets/UpGrade.jpg')}
                    style={styles.Img}
                />
                <Text style={styles.error}>{vquant}</Text>
                <Text style={styles.itemtext}>Quantidade disponivel: {index.amount}</Text>
                <TextInput
                    keyboardType="number-pad"
                    placeholder="Quantidade desejada"
                    onChangeText={setQuant}
                    style={styles.iteminput}
                />
                <Text style={styles.itemtext}>Condição: {index.condition}</Text>
                <Text style={styles.itemtext}>Categoria: {index.class}</Text>
                <Text style={styles.pricetext}>R$ {index.price}</Text>
                <TouchableOpacity style={styles.button} onPress={() => validar()}>
                    <Text style={styles.buttonText}>Comprar</Text>
                </TouchableOpacity>
                <Text style={styles.descriptiontext}>Descrição: {index.description}</Text>
            </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1E1E1E',
    },
    scrollcontainer:{
        flex:1,
        backgroundColor: '#FF7851',
    },
    text:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFF',
        backgroundColor: '#FF7851',
        alignSelf: 'center',
        width: '50%',
    },
    itemtext:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFF',
        backgroundColor: '#FF7851',
        alignSelf: 'center',
        paddingTop: 10,
    },
    error:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FF0000',
        backgroundColor: '#FF7851',
        alignSelf: 'center',
        paddingTop: 10,
    },
    iteminput:{
        marginTop: 10,
        width: '70%',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        borderRadius: 50,
        backgroundColor: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        padding:5,
    },
    pricetext:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'yellow',
        backgroundColor: '#FF7851',
        alignSelf: 'center',
        paddingTop: 10,
    },
    button:{
        backgroundColor: 'black',
        width: '80%',
        borderRadius: 50,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText:{
        color: '#FF7851',
        fontSize: 25,
    },
    descriptiontext:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: '#FF7851', 
        paddingTop: 10,
    },
    
    titletext:{
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFF',
        backgroundColor: '#FF7851',
        alignSelf: 'center',
        paddingBottom: 20,
    },
    prod:{
        alignSelf: 'center',
        fontSize: 25,
        color: 'white',  
        paddingTop: 20, 
    },
    line:{
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        paddingTop: 20, 
    },
    Img:{
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 10,
    },
    itemcontainer:{
        width: '100%',
        justifyContent: 'space-around',
        backgroundColor:'#FF7851',
        height: '100%',
    }

});