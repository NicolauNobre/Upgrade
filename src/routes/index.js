import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome'
import Testes from '../pages/testes'
import SignIn from '../pages/SignIn'
import Cadastro from '../pages/Cadastro'
import Initial from '../pages/Initial'
import Registro from '../pages/Registro'
import Shopping from '../pages/Shopping'
import Password from '../pages/Password'
import Password2 from '../pages/Password2'
import Sales from '../pages/Sales'
import Purchases from '../pages/Purchases'
import Itens from '../pages/Itens'
import Pageitem from '../pages/Pageitem'
import Editcadastro from '../pages/Editcadastro'
import Changepassword from '../pages/Changepassword'
import Changepassword2 from '../pages/Changepassword2'
import Classpage from '../pages/Classpage'
import Checkout from '../pages/Checkout'

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
                name='Testes'
                component={Testes}  
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
                name='Password2'
                component={Password2}
                options={{headerShown: false}}                            
            />
            <Stack.Screen
                name='Sales'
                component={Sales}
                options={{headerShown: false}}           
            />
            <Stack.Screen
                name='Itens'
                component={Itens}
                options={{headerShown: false}}             
            />
            <Stack.Screen
                name='Purchases'
                component={Purchases}
                options={{headerShown: false}}             
            />
            <Stack.Screen
                name='Pageitem'
                component={Pageitem}
                options={{headerShown: false}}             
            />
            <Stack.Screen
                name='Editcadastro'
                component={Editcadastro}
                options={{headerShown: false}}             
            />
            <Stack.Screen
                name='Changepassword'
                component={Changepassword}
                options={{headerShown: false}}             
            />
            <Stack.Screen
                name='Changepassword2'
                component={Changepassword2}
                options={{headerShown: false}}             
            />
            <Stack.Screen
                name='Classpage'
                component={Classpage}
                options={{headerShown: false}}             
            />
            <Stack.Screen
                name='Checkout'
                component={Checkout}
                options={{headerShown: false}}             
            />
        </Stack.Navigator>

        
    )
}
