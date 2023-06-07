import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
export default function GridBox({ bins, order }) {
    console.log(bins.status)
    let binStatus = false;
        if (bins.status != "Finished") {
            binStatus = true;
        }
    const navigation = useNavigation();
    return (
<TouchableHighlight onPress={() => {
    if(binStatus == true) {
        navigation.navigate("GridScreen", {order, bins});
    }
}}
underlayColor="transparent"
>
            <View style={{
                margin: 20,
                backgroundColor: binStatus ? 'white' : 'green',
                borderWidth: 2,
                borderColor: binStatus ? 'gray' : 'green',
                height: 150,
                width: 150,
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: 10,
            }}>
                <Text style={{
                    color: binStatus ? 'gray' : 'white',
                    padding: 10
                }} >{bins.row}{bins.slot}
                    </Text>
            </View>
        </TouchableHighlight>
    )
}
const style = StyleSheet.create({
    text_view: {
        color: 'white',
        padding: 10
    },
});