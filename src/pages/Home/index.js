import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerLogo}>
        <LinearGradient colors={['#1E1E1E', '#E6E6E6']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0.6 }}
        >    
            </LinearGradient>
          <Image
            animation="flipInY"
            source={require('../../assets/UpGrade.jpg')}
            style = {{ width:'40%'}}
            resizeMode = "contain"
            />
          <ScrollView style={styles.container3} horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.buttonslider}>
              <Text style={styles.textslider}>Exemplo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonslider}>
              <Text style={styles.textslider}>Exemplo2</Text>
            </TouchableOpacity>
          </ScrollView>
      </View>
      <View style={styles.containerpremium}>
        <LinearGradient colors={['#FF7851', '#1E1E1E']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
        >
          <Text style={styles.title2}>Assine o plano Premium por R$9,90.</Text>
          <Text style={styles.title1}>Frete grátis em varios produtos.</Text>
        </LinearGradient>
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
const windowWidth = Dimensions.get('window').width - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
  },
  containerLogo:{
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerpremium:{
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  title2:{
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    width: '80%',
    alignSelf: 'center',
    marginTop: 3,
    marginBottom: 3,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  title1:{
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    width: '80%',
    alignSelf: 'center',
    marginTop: 3,
    marginBottom: 3,
    textAlign: 'center'
  },
  container2:{
    backgroundColor: "#E6E6E6",
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 15,
    alignSelf: 'center'
  },
  container3:{
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 15,
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
  buttonslider:{
    width: windowWidth,
    height: 100,
    marginEnd: 15,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    textAlignVertical: 'bottom',
  },
  textslider:{
    fontSize: 30,
    textAlignVertical: 'bottom',
    textAlign: 'center',
  },
  linearGradient:{
    width: '80%',
    borderRadius: 3,
  }
});
