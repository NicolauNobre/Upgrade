import React from 'react';
import { View, Text,StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Feather} from '@expo/vector-icons'


export default function Midi() {
 return (
    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.actionButton}>
            <View style={styles.areaButton}>
                <Feather name="monitor" size={27} color="#FF7851"/>
            </View>
            <Text style={styles.labelButton}>Monitores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
            <View style={styles.areaButton}>
                <Feather name="cpu" size={27} color="#FF7851"/>
            </View>
            <Text style={styles.labelButton}>CPUs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
            <View style={styles.areaButton}>
                <Feather name="headphones" size={27} color="#FF7851"/>
            </View>
            <Text style={styles.labelButton}>Periféricos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
            <View style={styles.areaButton}>
                <Feather name="hard-drive" size={27} color="#FF7851"/>
            </View>
            <Text style={styles.labelButton}>Memórias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
            <View style={styles.areaButton}>
                <Feather name="mouse-pointer" size={27} color="#FF7851"/>
            </View>
            <Text style={styles.labelButton}>Ofertas</Text>
        </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingStart: 14,
        marginBottom: 30,
        marginTop: 8,
    },
    actionButton:{
        alignItems: 'center',
        marginRight: 20,
    },
    areaButton:{
        backgroundColor: 'white',
        height:60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelButton:{
        marginTop: 4,
        textAlign: 'center',

    }





})