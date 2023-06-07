
import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native'

export default function HelpScreen() {

    return (

        <View style={style.container}>
            <View style={style.container_text}>
                <Text style={style.first_text}>
                    Problems logging in?
                </Text>
                <Text style={style.second_text}>
                    If you have problems logging in,
                    please contact us by email at
                    support@govending.com
                </Text>
            </View>
            <View style={style.view_touch}>
                <TouchableHighlight style={style.touchable}
                    underlayColor='#005AFF'>
                    <Text style={style.text}>Contact us</Text>
                </TouchableHighlight>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    
    },
    container_text: {
        alignSelf: 'center',
        flex: 3,
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingTop: 25,
        paddingRight: 60
    },
    first_text: {
        fontSize: 24,
        color: '#506176',
        fontWeight: 'bold',
        paddingBottom: 10
    },
    second_text: {
        fontSize: 16,
        color: '#506176',
        paddingTop: 10
    },
    view_touch: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: '2%',

    },
    touchable: {
        borderRadius: 5,
        backgroundColor: 'blue',
        marginHorizontal: '2%',
        marginBottom: '5%'
    },
});
