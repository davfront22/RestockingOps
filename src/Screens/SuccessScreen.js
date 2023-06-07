import React from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableHighlight } from 'react-native'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
export default function SuccessScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Icon
                    type="material-community"
                    name="check-circle"
                    size={40}
                    color="green" />
                <Text style={[styles.text_1, { fontSize: 20 }]}>
                    Success
                </Text>
                <Text style={[styles.text_1, { fontSize: 13 }]}>This orders hass been uploaded</Text>
            </View>
            <View style={styles.view_touch}>
                <TouchableHighlight
                    style={styles.touchable}
                    onPress={() => navigation.navigate("HomeScreen")}
                    underlayColor='#005AFF'>
                    <Text style={styles.text}>Go home</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: {
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    view_touch: {
        flex: 1,
        justifyContent: 'flex-end',
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
    text_1: {
        color: '#506176',
        fontWeight: 'bold',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingBottom: 40
    }

});
