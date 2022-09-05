import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function Ofertas(params) {
    const navigation = useNavigation();
    const [resp, setResp] = useState(false);
    const [pesquisa, setPesquisa] = useState('');
    const userid = params.route.params.id;
    // console.log(userid);

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
                                <TouchableOpacity style={styles.itembutton} onPress={() => navigation.navigate("Pageitem",  {params: {item: index, id: userid} })}>
                                    <Text style={styles.titletext}>{index.title}</Text>
                                    <Image
                                        source={require('../../assets/UpGrade.jpg')}
                                        style={styles.Img}
                                    />
                                    <Text style={styles.pricetext}> R$: {index.price}</Text>
                                </TouchableOpacity>  
                            </View>  
                        );
                    }else{
                        if(products.includes(filter)){
                            return(
                                <View key={index._id} style={styles.itemcontainer} >
                                    <TouchableOpacity style={styles.itembutton} onPress={() => navigation.navigate("Pageitem",  {params: {item: index, id: userid}, })}>
                                        <Text style={styles.titletext}>{index.title}</Text>
                                        <Image
                                            source={require('../../assets/UpGrade.jpg')}
                                            style={styles.Img}
                                        />
                                        <Text style={styles.pricetext}> R$: {index.price}</Text>
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
        <ScrollView style={styles.scrollcontainer}>
            <View style={styles.container}>
                <Text style={styles.texttitle}>Produtos disponiveis:</Text>
                <View style={styles.containerForm}>
                    <TextInput
                        placeholder="Buscar Produto"
                        onChangeText={value => setPesquisa(value)}
                        style={styles.busca}
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
    scrollcontainer:{
        flex:1,
        backgroundColor: '#1E1E1E',
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'white',
        paddingBottom: 10,
        paddingTop: 10,
    },
    pricetext:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'yellow',
        backgroundColor: '#FF7851',
        alignSelf: 'center',
        paddingTop: 10,
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
        width: '100%',
        justifyContent: 'center',
        paddingBottom: 20,
        margin: 10,

    },
    titletext:{
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFF',
        backgroundColor: '#FF7851',
        alignSelf: 'center',
        paddingBottom: 10,
    },
    itembutton:{
        width: '80%',
        backgroundColor: '#FF7851',
        borderRadius: 30,
        padding: 20,
        alignSelf: 'center',   
    },
    containerForm:{
        backgroundColor: 'white',
        width: '90%',
        fontSize: 20,
        flex: 1,
        height: 50,
        alignContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 25,
        marginTop: 5,
        marginBottom: 20,
    },
    title:{
        color: '#FF7851',
        fontSize: 1 ,
    },
    Img:{
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 10,
    },
    busca:{
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 50,
        width: '80%',
        fontSize: 20,
        height: 50,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

});