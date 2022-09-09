import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'

export default function Home() {
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          animation="flipInY"
          source={require('../../assets/UpGrade.jpg')}
          style = {{ width:'40%'}}
          resizeMode = "contain"
        />
        <Text style={styles.title2}>Assine o plano Premium por R$9,90.</Text>
        <Text style={styles.title1}>Frete grátis em varios produtos.</Text>

      </View>
      <ScrollView style={styles.container2} horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.areaButton}>
            <Feather name="monitor" size={27} color="#FF7851"/>
          </View>
          <Text style={styles.labelButton}>Monitores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.areaButton}>
            <Feather name="cpu" size={27} color="#FF7851"/>
          </View>
          <Text style={styles.labelButton}>CPUs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.areaButton}>
            <Feather name="headphones" size={27} color="#FF7851"/>
          </View>
          <Text style={styles.labelButton}>Periféricos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.areaButton}>
            <Feather name="hard-drive" size={27} color="#FF7851"/>
          </View>
          <Text style={styles.labelButton}>Memórias</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  containerLogo:{
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
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
  container2:{
    backgroundColor: "#1E1E1E",
    paddingStart: 14,
    marginBottom: 30,
    marginTop: 50,
  },
  actionButton:{
    alignItems: 'center',
    marginRight: 20,
  },
  areaButton:{
    backgroundColor: 'white',
    height:60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelButton:{
    color: '#FF7851',
    marginTop: 4,
    textAlign: 'center',

  },
});
