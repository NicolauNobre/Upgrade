import React, {useState, useEffect} from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import Home from '../Home';
import Perfil from '../Perfil';
import Ofertas from '../Ofertas';
import Car from '../Car';
import Registro from '../Registro';
import {Feather} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function Initial(userid) {
    // const [reload, setReload] = useState(false);
    const id = userid.route.params.params.userid;
    // console.log(id)
    const navigation = useNavigation();
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
            initialParams={
                {id: id, reload: true}
            }
            // listeners={{
            //     tabPress: (e) => {
            //         e.preventDefault;
            //         navigation.navigate('Home', {
            //             params: {reload: 'true'},
            //           })
            //     },
            // }}
            options={{
                // tabBarBadge: 3,
                tabBarIcon:({size,color}) => (
                    <Feather name="home" size={size} color={color}/>
                )   
            }}
            />
            
            <Tab.Screen 
            name="Ofertas" 
            component={Ofertas} 
            initialParams={
                {id: id, reload: true}
            }
            // listeners={{
            //     tabPress: (e) => {
            //         e.preventDefault;
            //     },
            // }}
            options={{ 
                tabBarIcon:({size,color}) => (
                    <Feather name="key" size={size} color={color}/>
                )   
            }}
            />

            <Tab.Screen 
            name="Vender" 
            component={Registro} 
            initialParams={
                {id: id, reload: true}
            }
            options={{ 
                tabBarIcon:({size,color}) => (
                    <Feather name="key" size={size} color={color}/>
                )   
            }}
            />

            <Tab.Screen 
            name="Car"
            initialParams={
                {id: id, reload: true}
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
                {id: id, reload: true}
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
  