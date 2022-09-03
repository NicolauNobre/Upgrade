import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';


export default function Pageitem(item) {
    const navigation = useNavigation();
    const [quant, setQuant] = useState('1');
    const [vquant, setVquant] = useState('');
    // console.log(item.route.params.params.item)
    global.index = item.route.params.params.item;

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
                <Text style={styles.itemtext}>Quantidade disponivel: {index.amount}</Text>
                <TextInput
                    keyboardType="number-pad"
                    placeholder="Quantidade desejada"
                    onChangeText={setQuant}
                    style={styles.iteminput}
                />
                <Text style={styles.itemtext}>Condição: {index.condition}</Text>
                <Text style={styles.pricetext}>R$ {index.price}</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>comprar</Text>
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
    iteminput:{
        marginTop: 10,
        width: '70%',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        borderRadius: 50,
        backgroundColor: 'white',
        alignSelf: 'center',
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