import React from 'react';
import { View,Text,TouchableOpacity,Image,StyleSheet } from 'react-native';

export default function Imagens() {
 return (
   <TouchableOpacity style={styles.container}>
    <Image
    source={require('../../assets/UpGrade.jpg')}
    style={styles.Img}
    
    />
    <Text style={styles.text}>
        Info do item
    </Text>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Img:{
        width: 100,
        height: 100,
    },
    text:{
        color: '#FF7851',
        fontSize: 15
    }
})