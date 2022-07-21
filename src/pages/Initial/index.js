import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Registro from '../Registro';

const Tab = createBottomTabNavigator();

export default function Initial(userid) {
    //console.log(userid.route.params.params.userid)
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Registro" component={Registro} />
        </Tab.Navigator>
    );
  }
  