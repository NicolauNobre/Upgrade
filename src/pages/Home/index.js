import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import Header from '../../components/Header';
import Mid from '../../components/Mid';
import Midi from '../../components/Midi';
import Mide from '../../components/Mide';

export default function Home() {
  
  return (
    <ScrollView style={styles.container}>
        <Header/>
        <Mid/>
        <Midi/>
        <Mide/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
});
