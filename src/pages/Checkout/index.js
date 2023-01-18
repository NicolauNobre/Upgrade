import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Checkout(params) {
    const cart_id = params.route.params.params.cart_id;
    // console.log(params.route.params.params.cart_id)
    const [state, setState] = useState(false)

    useEffect( () => {
        if(state){
            alert('Pagamento realizado com sucesso!');           
        }
    }, [state]);

    const changevariables = (state) => {
        setState(state.canGoBack);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity style={{justifyContent:'center', alignItems:'center', padding: 15, backgroundColor: '#FF7851'}} onPress={() => navigation.goBack()}><Text style={{ fontSize: 20, justifyContent:'center', alignItems:'center'}}>Voltar ao Carrinho</Text></TouchableOpacity>
            <WebView
                source={{ uri: `https://upgrade-back-staging.herokuapp.com/payments/checkout/?cart_id=${cart_id}` }}
                onNavigationStateChange={state => changevariables(state)}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator></ActivityIndicator>}
            />
        </View>
    )
}