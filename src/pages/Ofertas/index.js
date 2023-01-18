import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';


export default function Ofertas(params) {
    const navigation = useNavigation();

    // variaveis utilizadas
    const [resp, setResp] = useState(false);
    const [pesquisa, setPesquisa] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [usefilter, setUsefilter] = useState(false);
    const [usingfilter, setUsingfilter] = useState(false);
    const [estado, setEstado] = useState('');
    const [max, setMax] = useState(0);
    const [min, setMin] = useState(0);
    const [item, setItem] = useState([]);
    const userid = params.route.params.id;
    // console.log(params.route.params.reload);
    // console.log(userid);

    // função do request de produtos ao back
    async function fetchMoviesJSON() {
        setIsLoading(true);
        const response = await fetch('https://upgrade-back-staging.herokuapp.com/home/itens',{
            method: 'Post',
            body: JSON.stringify({
                "user_id" : userid,
                // "max" : max,
                // "min" : min,
                // "estado" : estado,
            }),
            headers: { 'Content-Type': 'application/json' },
          });
        const teste = await response.json();
        // console.log(teste)
        setItem (teste);
        if(teste[0]){
            setResp(true);
        }else{
            setResp(false)
        }
        setIsLoading(false);
    }

    useEffect( () => {
        fetchMoviesJSON();
    }, [usingfilter]);

    const showfilter = ()=>{
        setUsefilter(!usefilter);
    }

    const aplyfilter = ()=>{
        setUsingfilter(!usingfilter);
        setUsefilter(!usefilter);
    }

    const filters = ()=>{
        if(usefilter){
            return(
                <View style={styles.filters}>
                    <Text>Filtros</Text>
                    <Text>Preço Max</Text>
                    <TextInput
                        keyboardType="number-pad"
                        placeholder="Valor do Item"
                        onChangeText={setMax}
                    />
                    <Text>Preço Min</Text>
                    <TextInput
                        keyboardType="number-pad"
                        placeholder="Valor do Item"
                        onChangeText={setMin}
                    />
                    {/* Select para categoria, aguarda rota */}

                    <RNPickerSelect
                        onValueChange={(value) => setEstado(value)}
                        placeholder = {{
                            label: 'Estado do Item', 
                            value: null, 
                            color: '#C7C7CD',
                        }}
                        items={[
                            { label: 'Novo', value: 'novo', color: 'black'},
                            { label: 'Usado', value: 'usado', color: 'black'},
                            { label: 'Velho', value: 'velho', color: 'black'},
                        ]}
                    />
                    <TouchableOpacity style={styles.aplyfilterbutton} onPress={() => aplyfilter()}>
                        <Text style={styles.textaply}>Aplicar filtros</Text>
                    </TouchableOpacity>

                </View>
            )
        }
    }


    //função para retornar os itens na view
    const buscar = ()=> {
        if (resp){
            // console.log(item)
            return (
                // percorre o array de itens
                item.map(index =>{
                    // console.log(index)
                    if(index.title == undefined){
                        setResp(false);
                    }else{
                        let filter = pesquisa.toUpperCase();
                        let products = index.title.toUpperCase();
                        if(pesquisa == ''){
                            return(
                                <View key={index._id} style={styles.itemcontainer} >
                                    <TouchableOpacity style={styles.itembutton} onPress={() => navigation.navigate("Pageitem",  {params: {item: index, id: userid} })}>
                                        <Text style={styles.titletext}>{index.title}</Text>
                                        <View style={styles.line}/>
                                        <View style={{width: '60%', flexDirection: 'row' }}>
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
                                            <Text style={styles.pricetext}> R$ {index.price}</Text>
                                        </View>
                                    </TouchableOpacity>  
                                </View>  
                            );
                        }else{
                            // console.log("produto: ", products, "pesquisa", filter)
                            if(products.includes(filter)){
                                return(
                                    <View key={index._id} style={styles.itemcontainer} >
                                        <TouchableOpacity style={styles.itembutton} onPress={() => navigation.navigate("Pageitem",  {params: {item: index, id: userid} })}>
                                            <Text style={styles.titletext}>{index.title}</Text>
                                            <View style={styles.line}/>
                                            <View style={{width: '100%', flexDirection: 'row' }}>
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
                                                <Text style={styles.pricetext}> R$ {index.price}</Text>
                                            </View>
                                        </TouchableOpacity>  
                                    </View> 
                                );
                            }
                        }
                    }
                })
            );
        }else{
            return(
                <View>
                    <Text style={styles.semitems}>nenhum item a venda</Text>
                </View>
            )
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
            {filters()}
            <ScrollView style={styles.scrollcontainer}>
                <View style={styles.container}>
                <LinearGradient 
                    colors={['#1E1E1E', '#E6E6E6']}
                    style={styles.linearGradient}
                    start={{ x: 0, y: 0.9 }}
                    >
                        <Text style={styles.texttitle}>Produtos disponiveis</Text>
                        <View style={styles.containerForm}>
                            <TextInput
                                placeholder="Buscar Produto"
                                onChangeText={value => setPesquisa(value)}
                                style={styles.busca}
                                />
                        </View>
                        <TouchableOpacity style={styles.filterbutton} onPress={() => showfilter()}>
                            <Text>Filtros</Text>
                        </TouchableOpacity>
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
        marginRight: 10,
        marginLeft: 45,
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
    semitems:{
        textAlign: 'center',
    },
    filterbutton:{
        backgroundColor: '#FF7851',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: 22,
        borderRadius: 15,
    },
    filters:{
        position: 'absolute',
        backgroundColor: '#FF7851',
        zIndex: 100,
        height: '100%',
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
    },
    aplyfilterbutton:{
        backgroundColor: 'black',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: 22,
        borderRadius: 15,
    },
    textaply:{
        color: 'white',
    }
});