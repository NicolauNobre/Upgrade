import React from 'react';
import { StatusBar } from 'react-native';


import {NavigationContainer} from '@react-navigation/native'
import Routes from './src/routes';
import 'react-native-gesture-handler';



export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#1E1E1E" barStyle="dark-content"/>
      <Routes/>

    </NavigationContainer>
   
  );
}


