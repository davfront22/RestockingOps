import { Text, StyleSheet, View, FlatList, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements';

export default function RestockingOrdersNo() {
    return (
        <View style={style.container}>
            <Icon
                type="material-community"
                name="clipboard-check"
                size={75}
                color="#506176"
                style={style.iconorders}
            />
            <Text style={style.first_text}>
                Don't have restocking order
            </Text>
            <Text style={style.second_text}>
                No pending orders or try again later
            </Text>
        </View>


    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F3',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    first_text: {
        fontSize: 18,
        color: '#506176',
        fontWeight: 'bold',
        paddingTop:35,
        paddingBottom:5
    },
    second_text: {
        fontSize: 17,
        color: '#506176', 
        paddingBottom:420
    },
});