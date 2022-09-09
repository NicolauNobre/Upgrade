import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function Car(params) {
    const navigation = useNavigation();
    const [pesquisa, setPesquisa] = useState('');
    const userid = params.route.params.id
    // console.log(userid)
    const [resp, setResp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState([]);

    async function fetchMoviesJSON() {
        setIsLoading(true)
        const response = await fetch('https://upgrade-back-staging.herokuapp.com/cart/Cart',{
          method: 'POST',
          body: JSON.stringify({
            "userId" : userid,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const teste = await response.json();
        // console.log(teste)
        setItem (teste);
        setResp(true);
        setIsLoading(false);
    }

    useEffect( () => {
        fetchMoviesJSON();
    }, []);


    const buscar = ()=> {
        // console.log(userid)
        if (resp){
            // console.log(item)
            return (
                item.map(index =>{
                    // console.log(index.productsInfo._id)
                    let filter = pesquisa.toUpperCase();
                    let products = index.productsInfo.title.toUpperCase();
                    if(pesquisa == ''){
                        return(
                            <View key={index.productsInfo._id} style={styles.itemcontainer} >
                                <TouchableOpacity style={styles.itembutton} onPress={() => navigation.navigate("Pageitem",  {params: {item: index.productsInfo, id: userid} })}>
                                    <Text style={styles.titletext}>{index.productsInfo.title}</Text>
                                    <Image
                                        source={require('../../assets/UpGrade.jpg')}
                                        style={styles.Img}
                                    />
                                    <Text style={styles.itemtext}>Quantidade: {index.productsInfo.amount}</Text>
                                    <Text style={styles.pricetext}> R$: {index.productsInfo.price}</Text>
                                </TouchableOpacity>  
                            </View>  
                        );
                    }else{
                        if(products.includes(filter)){
                            return(
                                <View key={index.productsInfo._id} style={styles.itemcontainer} >
                                    <TouchableOpacity style={styles.itembutton} onPress={() => navigation.navigate("Pageitem",  {params: {item: index.productsInfo, id: userid} })}>
                                        <Text style={styles.titletext}>{index.productsInfo.title}</Text>
                                        <Image
                                            source={require('../../assets/UpGrade.jpg')}
                                            style={styles.Img}
                                        />
                                        <Text style={styles.pricetext}> R$: {index.productsInfo.price}</Text>
                                    </TouchableOpacity>  
                                </View>  
                            );
                        }
                    }
                })
            );
        }
    }

    const loading = () =>{
        if(isLoading){
            // console.log('buscando...')
            return(
                <View style={{ position: 'absolute', flex: 1, justifyContent: "center", alignItems: "center", zIndex: 999, height: '100%', width: '100%', backgroundColor: '#00000099' }}>
                    <ActivityIndicator color={"#fff"} size={50}/> 
                </View>
            )
        }
    }

    return (
        <View style={{height: '100%'}}>
            {loading()}
            <ScrollView style={styles.scrollcontainer}>
                <View style={styles.container}>
                    <Text style={styles.header}>Meu Carrinho</Text>
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
        </View>
  );
}

const styles = StyleSheet.create({
    text:{
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    header:{
        color:'white',
        alignSelf: 'center',
        flexDirection: 'row',
        marginVertical: '5%',
        fontSize: 25,

    },
    line:{
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },
    itemtext:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFF',
        backgroundColor: '#FF7851',
        alignSelf: 'center',
        paddingTop: 10,
    },
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