import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


export default function Order_Box({ order, bin }) {
    const items = bin.items;
    const status = order.status;
    // status 2 WaitingForPickup 3WaitingForRestock 4WaitingForReturn
    const iconColor = {
        Created: ['white', 'white', 'white'],
        Assigned: ['white', 'white', 'white'],
        WaitingForPickup: ['white', 'white', 'white'],
        WaitingForRestock: ['white', 'white', '#506176'],
        WaitingForReturn: ['white', '#506176', '#506176'],
    }[status] || ['#506176', '#506176', '#506176'];

    const navigation = useNavigation();
    return (
        <View>
            <TouchableHighlight
                underlayColor="transparent"
                onPress={() =>
                    navigation.navigate(
                        status === "Created" ? "PickoutScreen" :
                            status === "Assigned" ? "PickoutScreen" :
                                status === "WaitingForPickup" ? "PickoutScreen" :
                                    status === "WaitingForRestock" ? "GridsScreen" :
                                        status === "WaitingForReturn" ? "ReturnScreen" :
                                            "SuccessScreen", { order, items }
                    )
                }>

                <View style={style.button}>
                    <View>
                        <Text style={style.text_order} numberOfLines={2}>Order {order.shortId}</Text>
                    </View>
                    <View style={style.iconorders}>
                        <Icon
                            type="material-community"
                            name="car-pickup"
                            size={30}
                            color={iconColor[0]}
                        />
                        <Icon
                            type="material-community"
                            name="check-circle-outline"
                            size={30}
                            color={iconColor[1]}
                        />

                        <Icon
                            type="material-community"
                            name="crane"
                            size={30}
                            color={iconColor[2]}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    )
}
const style = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        width: 340
    },
    iconorders: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: 130

    },
    text_view: {
        color: '#005AFF',
        fontWeight: 'bold',
        paddingRight: 5,
    },
    text_order: {
        fontWeight: 'bold',
        paddingHorizontal: 8,
        fontSize: 13,
        color: '#506176'

    }
});