
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../../components/Header'
import Mid from '../../components/Mid'
import Midi from '../../components/Midi'
import Mide from '../../components/Mide';


import {useNavigation} from '@react-navigation/native';

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
    backgroundColor: '#E6E6E6',
  },
});
