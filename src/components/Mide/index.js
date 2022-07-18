import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,ScrollView } from 'react-native';
import Imagens from '../Imagens'
import {useNavigation} from '@react-navigation/native';

export default function Mide() {
    const navigation = useNavigation();
 return (
   <ScrollView style={styles.container}>
    <TouchableOpacity style={styles.buttonRegister}onPress={() => navigation.navigate("Registro")}>
        <Text style={styles.registerText}>Registrar item</Text>
    </TouchableOpacity>

    <Text style={styles.text}>Visto Recentemente</Text>
    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <Imagens/>
        <Imagens/>  
    </View>
    <View>
    <Text style={styles.text}>Oferta do Dia</Text>
    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <Imagens/>
        <Imagens/>
    </View>
    </View>

   </ScrollView>

  );
}

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        marginHorizontal: '1%'
    },
    buttonRegister:{
        marginTop: 14,
        alignSelf: 'center',
        backgroundColor: '#FF7851',
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 18,
        
    },
    registerText:{
        color: 'black'
    }



})