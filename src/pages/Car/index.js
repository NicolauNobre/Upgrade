import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Car(params) {
    const navigation = useNavigation();
    const userid = params.route.params.id
    // console.log(userid)
    const [pesquisa, setPesquisa] = useState('');
    const [resp, setResp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [item, setItem] = useState([]);

    // função do request de produtos no carrinho ao back
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

    //função para retornar os itens na view
    const buscar = ()=> {

        if (resp){
            // console.log(item)
            return (
                // percorre o array de itens
                item.map(index =>{
                    // console.log(index)
                    let filter = pesquisa.toUpperCase();
                    let products = index.productsInfo.title.toUpperCase();
                    if(pesquisa == ''){
                        return(
                            <View key={index.productsInfo._id} style={styles.itemcontainer} >
                                <TouchableOpacity style={styles.itembutton} onPress={() => navigation.navigate("Pageitem",  {params: {item: index.productsInfo, id: userid} })}>
                                    <Text style={styles.titletext}>{index.productsInfo.title}</Text>
                                    <View style={styles.line}/>
                                    <View style={{width: '60%', flexDirection: 'row' }}>
                                        <Image
                                            source={require('../../assets/UpGrade.jpg')}
                                            style={styles.Img}
                                        />
                                        <View>
                                            <Text style={styles.itemtext}>Quantidade: {index.productsInfo.amount}</Text>
                                            <Text style={styles.pricetext}> R$ {index.productsInfo.price}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>  
                            </View>  
                        );
                    }else{
                        // console.log("produto: ", products, "pesquisa", filter)
                        if(products.includes(filter)){
                            return(
                                <View key={index.productsInfo._id} style={styles.itemcontainer} >
                                    <TouchableOpacity style={styles.itembutton} onPress={() => navigation.navigate("Pageitem",  {params: {item: index.productsInfo, id: userid} })}>
                                        <Text style={styles.titletext}>{index.productsInfo.title}</Text>
                                        <View style={styles.line}/>
                                        <View style={{width: '60%', flexDirection: 'row' }}>
                                            <Image
                                                source={require('../../assets/UpGrade.jpg')}
                                                style={styles.Img}
                                            />
                                            <View>
                                                <Text style={styles.itemtext}>Quantidade: {index.productsInfo.amount}</Text>
                                                <Text style={styles.pricetext}> R$ {index.productsInfo.price}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>  
                                </View>  
                            );
                        }
                    }
                })
            );
        }
    }

    // função para tela de carregamento enquanto busca produtos
    const loading = () =>{
        if(isLoading){
            // console.log('buscando...')
            return(
                <View style={{ position: 'absolute', flex: 1, justifyContent: "center", alignItems: "center", zIndex: 999, height: '100%', width: '100%', backgroundColor: '#00000099' }}>
                    <ActivityIndicator color={"#FF7851"} size={100}/> 
                </View>
            )
        }
    }

    return (
        <View style={{height: '100%', width: '100%'}}>
            {loading()}
            <ScrollView style={styles.scrollcontainer}>
                <View style={styles.container}>
                <LinearGradient 
                colors={['#1E1E1E', '#E6E6E6']}
                style={styles.linearGradient}
                start={{ x: 0, y: 0.9 }}
                >
                    <Text style={styles.texttitle}>Meu Carrinho</Text>
                    <View style={styles.containerForm}>
                        <TextInput
                            placeholder="Buscar Produto"
                            onChangeText={value => setPesquisa(value)}
                            style={styles.busca}
                            />
                    </View>
                </LinearGradient>
                </View>
                {buscar()}
            </ScrollView>
        </View>
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
        backgroundColor: '#E6E6E6',
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
        padding: 5,
        paddingRight: 10,
        fontWeight: 'bold',
        color: '#1E1E1E',
        justifyContent: 'flex-start',
        alignSelf: 'flex-end',
        backgroundColor: "#FF7851",
        borderRadius: 5,
        marginLeft: 10,
    },
    itemtext:{
        fontSize: 25,
        padding: 5,
        paddingRight: 10,
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginBottom: 40,
    },
    texttitle:{
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#E6E6E6',
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
        marginTop: 10,
    },
    titletext:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1E1E1E',
        alignSelf: 'flex-start',
    },
    itembutton:{
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        alignSelf: 'center',
        borderColor: '#1E1E1E',
        borderWidth: 0.4
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
        width: 150,
        height: 150,
        alignSelf: 'flex-start',
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
    line:{
        borderBottomColor: '#E7E7E7',
        borderBottomWidth: 2,
        marginTop: 2,
        marginBottom: 7,
    },
    linearGradient:{
        width: '100%',
        alignItems: 'center',
    },
});