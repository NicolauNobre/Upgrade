import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Registro from '../Registro';
import Perfil from '../Perfil';
import Ofertas from '../Ofertas';
import {Feather} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function Initial() {
    //const id = (userid.route.params.params.userid)
    //console.log(id)
    return (
        <Tab.Navigator screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: '#FF7851',
            tabBarStyle:{
            backgroundColor: "#1E1E1E",
            paddingBottom: 5,
            paddingTop: 5,
            }}
        }
            >
            <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
                tabBarIcon:({size,color}) => (
                    <Feather name="home" size={size} color={color}/>
                )   
            }}
            />
            <Tab.Screen 
            name="Registro" 
            component={Registro} 
            options={{
                // params: {params: id},
                tabBarIcon:({size,color}) => (
                    <Feather name="crosshair" size={size} color={color}/>
                )   
            }}
            />
            <Tab.Screen 
            name="Ofertas" 
            component={Ofertas} 
            options={{ 
                tabBarIcon:({size,color}) => (
                    <Feather name="key" size={size} color={color}/>
                )   
            }}
            />
            <Tab.Screen 
            name="Perfil" 
            component={Perfil} 
            o
            options={{
                tabBarIcon:({size,color}) => (
                    <Feather name="user" size={size} color={color}/>
                )   
            }}
            />
        </Tab.Navigator>
    );
  }
  