import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,ScrollView } from 'react-native';
import Imagens from '../Imagens'
import {useNavigation} from '@react-navigation/native';
import { color } from 'react-native-reanimated';

export default function Mide() {
    const navigation = useNavigation();
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
    container:{
        backgroundColor: "#1E1E1E"
    },
    text:{
        fontSize: 20,
        marginHorizontal: '1%',
        color: '#FF7851',
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