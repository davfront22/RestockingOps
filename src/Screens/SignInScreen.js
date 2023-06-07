
import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
//import SignInButton from '../Components/ButtonSingIn';

const goLogo = "https://devstgadminportaleus.blob.core.windows.net/images/go.png";

export default function SignInScreen({ navigation }) {
    const navi = useNavigation();
    return (
        <View style={style.container}>

            <View style={style.image_goferia}>
                <Image source={{ uri: goLogo }} style={{
                    width: 115, height: 82, margin: 50
                }} />
            </View>
            <View style={style.container_text}>
                <Text style={style.first_text}>Welcome back </Text>
                <Text style={style.second_text}>Sign in to your GoVending account</Text>
            </View>
            <View style={style.view_touch}>
                <TouchableHighlight
                    style={style.touchable}
                    underlayColor="lightblue"
                    onPress={() => console.log("HOLA")}>
                    <Text style={style.text_tou}>Sign in</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        flex: 2,
        alignItems: 'flex-end',
        paddingTop: 45,
        paddingRight: 25
    },
    image_goferia: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 120

    },
    container_text: {
        flex: 3,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    first_text: {
        fontSize: 24,
        color: '#506176',
        fontWeight: 'bold'
    },
    second_text: {
        fontSize: 16,
        color: '#506176',
    },
    view_touch: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'white'
    },

    touchable: {
        borderRadius: 5,
        backgroundColor: 'blue',
        marginHorizontal: '2%',
        marginBottom: '5%'
    },
    text_tou: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: '2%',
    },

});