import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function Ofertas() {
    const navigation = useNavigation();
    const [resp, setResp] = useState(false);
    const [pesquisa, setPesquisa] = useState('');

    async function fetchMoviesJSON() {
        const response = await fetch('https://upgrade-back-staging.herokuapp.com/home/itens',{
          method: 'Get',
        });
        const teste = await response.json();
        global.item = teste;
        setResp(true);
    }

    const buscar = ()=> {
        fetchMoviesJSON()
        if (resp){
            return (
                item.map(index =>{
                    let filter = pesquisa.toUpperCase();
                    let products = index.title.toUpperCase();
                    if(pesquisa == ''){
                        return(
                            <View key={index._id} style={styles.itemcontainer} >
                                <TouchableOpacity style={styles.itembutton} onPress={() => navigation.navigate("Pageitem",  {params: {item: index}, })}>
                                    <Text style={styles.text}>Nome: {index.title}</Text>
                                    <Text style={styles.text}> R$: {index.price}</Text>
                                
                                </TouchableOpacity>  
                            </View>  
                        );
                    }else{
                        if(products.includes(filter)){
                            return(
                                <View key={index._id} style={styles.itemcontainer} >
                                    <TouchableOpacity style={styles.itembutton} onPress={() => navigation.navigate("Pageitem",  {params: {item: index}, })}>
                                        <Text style={styles.text}>Nome: {index.title}</Text>
                                        <Text style={styles.text}>R$: {index.price}</Text>
                                        <Text style={styles.text}>Quantidade: {index.amount}</Text>
                                        <Text style={styles.text}>condição: {index.condition}</Text>
                                        <Text style={styles.text}>{index.description}</Text>
                                    </TouchableOpacity>  
                                </View>  
                            );
                        }
                    }
                })
            );
        }
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.texttitle}>Ofertas de Produtos:</Text>
                <View style={styles.containerForm}>
                    <TextInput
                        placeholder="Buscar Produto"
                        onChangeText={value => setPesquisa(value)}
                    />
                </View>
                {buscar()}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#1E1E1E',
        paddingTop: 10,
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white',
    },
    texttitle:{
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white',
        padding: 10,
    },
    buttonRegister:{
        backgroundColor: '#1E1E1E',
        marginTop: 30,
        borderRadius: 50,
        width: '45%',
        alignSelf: 'center'
    },
    itemcontainer:{
        justifyContent: 'space-around',
        backgroundColor:'#FF7851',
        paddingBottom: 20,
        margin: 10,

    },
    itembutton:{
        backgroundColor: '#FF7851',
        borderRadius: 10,
        padding: 20,
        alignSelf: 'flex-start',
        flexDirection: 'column',
       
    },
    containerForm:{
        backgroundColor: 'white',
        fontSize: 20,
        flex: 1,
        paddingHorizontal: 10,
        borderRadius: 25,
    },
    title:{
        color: '#FF7851',
        fontSize: 1 ,
    },

});