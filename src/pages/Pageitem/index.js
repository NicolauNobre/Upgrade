import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';

export default function Pageitem(params) {
    const navigation = useNavigation();
    const [quant, setQuant] = useState('1');
    const [vquant, setVquant] = useState('');
    // console.log(params.route.params.params.item)
    const index = params.route.params.params.item;
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
        
            }).catch(e=>{

                setIsLoading(false)
                alert("Sem conexão com o servidor")
                // console.log(e)

            });
        }
    }

 return (
    <View style={styles.container}>
        <LinearGradient 
                colors={['#1E1E1E', '#E6E6E6']}
                style={styles.linearGradient}
                start={{ x: 0, y: 0.9 }}
                >
            <View style={{width: '100%', flexDirection: 'row', paddingBottom: 15 }}>
                <TouchableOpacity style={styles.goback} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={35} color="#FF7851"/>
                </TouchableOpacity>
                <Text style={styles.prod}>Informações Sobre o Produto</Text>
            </View>
        </LinearGradient>
        <ScrollView style={styles.scrollcontainer}>
            <View style={styles.itemcontainer}>
                {index.images != null ? (
                    <Image
                        source={{uri:index.images}}
                        style={styles.Img}
                    />
                ) : (
                    <Image
                        source={require('../../assets/UpGrade.jpg')}
                        style={styles.Img}
                    />
                )}
                <View style={styles.infobackground}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.titletext}>{index.title}</Text>
                        {/* <Text style={styles.quantityitem}>{index.amount}</Text> */}
                    </View>
                    <View style={styles.line}/>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style={styles.infos}>Condição: {index.condition}</Text>
                        <Text style={styles.quantitytext}>Em estoque: {index.amount}</Text>
                        <Text style={styles.infos}>Categoria: {index.class}</Text>
                    </View>
                    <Text style={styles.descriptiontext}>Descrição</Text>
                    <Text style={styles.descriptioncontent}>{index.description}</Text>
                    <View style={styles.line}/>
                    <Text style={styles.descriptiontext}>Informações do Vendedor</Text>

                    <Text style={styles.descriptioncontent}>Nome do Vendedor: {index.name}</Text>
                    <Text style={styles.descriptioncontent}>Cidade: {index.city}</Text>
                    <Text style={styles.descriptioncontent}>Estado: {index.country_state}</Text>
                    <Text style={styles.descriptioncontent}>Telefone Para Contato: {index.phone}</Text>

                    <View style={styles.line}/>
                    <Text style={styles.pricetext}>R$ {index.price}</Text>
                    
                </View>
                <TextInput
                    keyboardType="number-pad"
                    placeholder="Quantidade desejada"
                    onChangeText={setQuant}
                    style={styles.iteminput}
                />
                <Text style={styles.error}>{vquant}</Text>
                <TouchableOpacity style={styles.button} onPress={() => validar()}>
                    <Text style={styles.buttonText}>Comprar</Text>
                </TouchableOpacity>
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
        backgroundColor: '#E6E6E6',
    },
    goback:{
        marginTop: 22,
        justifyContent: 'center',
    },
    text:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1E1E1E',
        backgroundColor: '#E6E6E6',
        alignSelf: 'center',
        width: '50%',
    },
    quantitytext:{
        fontSize: 15,
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 5,
        padding: 5,
        marginTop: 3
    },
    error:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FF0000',
        alignSelf: 'center',
        paddingTop: 10,
    },
    iteminput:{
        marginTop: 10,
        width: '70%',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1E1E1E',
        borderRadius: 50,
        backgroundColor: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        padding:5,
    },
    pricetext:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1E1E1E',
        alignSelf: 'center',
        padding: 5,
        backgroundColor: '#3DEB91',
        borderRadius: 5,
        margin: 5
    },
    button:{
        backgroundColor: '#FF7851',
        width: '80%',
        borderRadius: 50,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText:{
        color: '#E6E6E6',
        fontSize: 25,
    },
    descriptiontext:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1E1E1E',
        paddingTop: 10,
        alignSelf: 'center'
    },
    titletext:{
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1E1E1E',
        justifyContent: 'flex-start',
        marginTop: 10,
        marginLeft: 30,
        width: '70%'
    },
    prod:{
        alignSelf: 'center',
        fontSize: 25,
        color: 'white',  
        paddingTop: 20,
        marginLeft: 10
    },
    line:{
        borderBottomColor: '#E7E7E7',
        borderBottomWidth: 2,
    },
    Img:{
        width: 300,
        height: 300,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20
    },
    itemcontainer:{
        width: '100%',
        justifyContent: 'space-around',
        backgroundColor:'#E6E6E6',
        height: '100%',
    },
    linearGradient:{
        width: '100%',
        alignItems: 'center',
    },
    infobackground:{
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: '#1E1E1E',
        borderWidth: 0.4
    },
    quantityitem:{
        alignSelf: 'center',
        marginLeft: 5,
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    descriptioncontent:{
        marginLeft: 30,
        fontSize: 15
    },
    infos:{
        backgroundColor: '#FF7851',
        borderRadius: 5,
        fontSize: 15,
        justifyContent: 'center',
        marginTop: 5,
        padding: 5,
        marginHorizontal: 5,
        color: 'white'
    }
});