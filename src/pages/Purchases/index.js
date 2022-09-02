import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function Purchases() {
    const navigation = useNavigation();

 return (
   <View style={styles.container}>
    <Text style={styles.header}>Minhas compras</Text>
    <View style={styles.line}/>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#1E1E1E',
        flex:1, 
    },
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
    }
});