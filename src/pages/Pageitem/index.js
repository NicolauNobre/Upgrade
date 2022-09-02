import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function Pageitem(item) {
    const navigation = useNavigation();
    // console.log(item.route.params.params.item)
    global.index = item.route.params.params.item;
 return (
   <View style={styles.container}>
    <Text style={styles.prod}>Informações sobre o produto:</Text>
    <View style={styles.line}/>
    <Text style={styles.text}>Aqui vai ficar a imagem</Text>
    <Text style={styles.text}>Nome: {index.title}</Text>
    <Text style={styles.text}>R$: {index.price}</Text>
    <Text style={styles.text}>Quantidade: {index.amount}</Text>
    <Text style={styles.text}>Condição: {index.condition}</Text>
    <Text style={styles.text}>{index.description}</Text>

   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1E1E1E',
    },
    text:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFF',
        backgroundColor: '#FF7851',
        width: '50%',
    },
    prod:{
        alignSelf: 'center',
        fontSize: 25,
        color: 'white',
        
        
    },
    line:{
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    }

});