import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function Purchases() {
    const navigation = useNavigation();

 return (
   <View style={styles.container}>
    <Text style={styles.text}>Página minhas compras</Text>

   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize: 25,
        fontWeight: 'bold'
    },

});