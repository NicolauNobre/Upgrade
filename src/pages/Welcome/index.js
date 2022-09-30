import React from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable'
import {useNavigation} from '@react-navigation/native'

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.containerLogo}>
        <Animatable.Image
        animation="flipInY"
          source={require('../../assets/UpGrade.jpg')}
          style = {{ width:'100%'}}
          resizeMode = "contain"
        />
      </View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Cansou de ter peças empoeirando?</Text>
        <Text style={styles.title}>Isso acaba agora.</Text>
        <Text style={styles.text}>Faça o login.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </Animatable.View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#1E1E1E'
  },
  containerLogo:{
    flex:1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center'

  },
  containerForm:{
    flex:2,
    borderTopLeftRadius:10,
    borderTopRightRadius: 10,
    paddingStart: '15%',
    paddingEnd: '5%'
  },
  title:{
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600'

  },
  text:{
    color: 'white'
  },
  button:{
    position: 'absolute',
    backgroundColor: '#FF7851',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText:{
    fontSize: 20,
    color: 'white',
  }

})