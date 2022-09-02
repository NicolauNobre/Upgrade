import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome'
import SignIn from '../pages/SignIn'
import Cadastro from '../pages/Cadastro'
import Home from '../pages/Home'
import Initial from '../pages/Initial'
import Registro from '../pages/Registro'
import Shopping from '../pages/Shopping'
import Password from '../pages/Password'
import Car from '../pages/Car'
import Sales from '../pages/Sales'
import Purchases from '../pages/Purchases'
import Itens from '../pages/Itens'
import Pageitem from '../pages/Pageitem'



const Stack = createNativeStackNavigator();


export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={{headerShown: false}}                            
            />
            <Stack.Screen
                name='SignIn'
                component={SignIn}  
                options={{headerShown: false}}          
            />
            <Stack.Screen
                name='Cadastro'
                component={Cadastro}  
                options={{headerShown: false}}          
            />
            <Stack.Screen
                name='Home'
                component={Home}  
                options={{headerShown: false}}          
            />
            <Stack.Screen
                name='Initial'
                component={Initial}  
                options={{headerShown: false}}          
            />
            <Stack.Screen
                name='Registro'
                component={Registro}
                options={{headerShown: false}}         
            />
            <Stack.Screen
                name='Shopping'
                component={Shopping}
                options={{headerShown: false}}                            
            />
            <Stack.Screen
                name='Password'
                component={Password}
                options={{headerShown: false}}                            
            />
            <Stack.Screen
                name='Car'
                component={Car}
                options={{headerShown: false}}                            
            />
            <Stack.Screen
                name='Sales'
                component={Sales}
                options={{headerShown: false}}           
            />
            <Stack.Screen
                name='Purchases'
                component={Purchases}
                options={{headerShown: false}}        
            />
            <Stack.Screen
                name='Itens'
                component={Itens}
                options={{headerShown: false}}             
            />
            <Stack.Screen
                name='Pageitem'
                component={Pageitem}
                options={{headerShown: false}}             
            />
        </Stack.Navigator>

        
    )
}
