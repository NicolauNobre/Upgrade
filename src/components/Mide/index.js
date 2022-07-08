import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,ScrollView } from 'react-native';
import Imagens from '../Imagens'

export default function Mide() {
 return (
   <ScrollView style={styles.container}>
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
    }


})