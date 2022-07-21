import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Registro from '../Registro';
import Perfil from '../Perfil';
import Ofertas from '../Ofertas';
import {Feather} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Initial(userid) {
    //console.log(userid.route.params.params.userid)
    return (
        <Tab.Navigator screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: '#FFF',
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
            options={{
                tabBarIcon:({size,color}) => (
                    <Feather name="user" size={size} color={color}/>
                )   
            }}
            />
        </Tab.Navigator>
    );
  }
  