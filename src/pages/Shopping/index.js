import React from "react";
import {View,TextInput,StyleSheet, Text, StatusBar, TouchableOpacity} from "react-native"
import {Feather} from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native'


const statusbarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 8 : 64;


export default function Shopping(){
    const navigation = useNavigation();
    return (

        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.containerForm}>
                <Text style={styles.title}></Text>
                    <TextInput
                        placeholder="Buscar no Upgrade"
                    />
                    </View>

                <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}onPress={() => navigation.navigate("Initial")}>
                    <Feather name="home" size={27} color="#FF7851"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1E1E1E",
        paddingTop: statusbarHeight,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 18,
    },
    content:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title:{
        color: '#FF7851',
        fontSize: 1 ,
      },
    username:{
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonUser:{
        width: 44,
        height: 44,
        color: '#FF7851',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm:{
        backgroundColor: 'white',
        fontSize: 10,
        flex: 1,
        paddingHorizontal: 10,
        borderRadius: 25,
      }
    
})