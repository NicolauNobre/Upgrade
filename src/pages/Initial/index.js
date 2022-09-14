import React, {useState, useEffect} from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Perfil from '../Perfil';
import Ofertas from '../Ofertas';
import Car from '../Car';
import {Feather} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function Initial(userid) {
    const id = userid.route.params.params.userid;
    // console.log(id)
    return (
        <Tab.Navigator 
        screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: '#FF7851',
            tabBarStyle:{
            backgroundColor: "#1E1E1E",
            paddingBottom: 5,
            paddingTop: 5,
            }}}
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
            name="Ofertas" 
            component={Ofertas} 
            initialParams={
                {id: id}
            }
            options={{ 
                tabBarIcon:({size,color}) => (
                    <Feather name="key" size={size} color={color}/>
                )   
            }}
            />

            <Tab.Screen 
            name="Carrinho"
            initialParams={
                {id: id}
            }
            component={Car} 
            options={{
                tabBarIcon:({size,color}) => (
                    <Feather name="shopping-cart" size={size} color={color}/>
                )   
            }}
            />

            <Tab.Screen 
            name="Perfil" 
            component={Perfil} 
            initialParams={
                {id: id}
            }
            options={{
                tabBarIcon:({size,color}) => (
                    <Feather name="user" size={size} color={color}/>
                )   
            }}
            />
        </Tab.Navigator>
    );
  }
  