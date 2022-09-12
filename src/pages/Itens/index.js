import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function Itens(userid) {
    const navigation = useNavigation();
    const id = userid.route.params.params.userid;
    // console.log (id)
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Meus itens a venda</Text>
            <View style={styles.line}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1E1E1E'
    },
    text:{
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