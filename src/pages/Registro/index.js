import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import Citem from '../../components/Citem'
import Infoitem from '../../components/Infoitem'
import {useNavigation} from '@react-navigation/native'

export default function Registro() {
  const navigation = useNavigation();
    return (
      <ScrollView style={styles.container}>
          <Citem/>
          <Infoitem/>
      </ScrollView>
    );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E6E6E6',
    },
});