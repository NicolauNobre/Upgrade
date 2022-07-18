import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'

export default function Mid() {
 return (
    <View style={styles.containerLogo}>
        <Animatable.Image
        animation="flipInY"
          source={require('../../assets/UpGrade.jpg')}
          style = {{ width:'40%'}}
          resizeMode = "contain"
          />
        <Text style={styles.title2}>Assine o plano Premium por R$9,90.</Text>
        <Text style={styles.title1}>Frete grátis em varios produtos.</Text>

        </View>
  );
}
const styles = StyleSheet.create({


containerLogo:{
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',

  },
  title2:{
    backgroundColor: '#1E1E1E',
    color: '#FF7851',
    fontSize: 15,
    fontWeight: '400'
  },
  title1:{
    backgroundColor: '#1E1E1E',
    color: '#FF7851',
    fontSize: 15,
    fontWeight: '400'
  },

})