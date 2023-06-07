import React from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableHighlight } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import token from '../assets/token';



export default function ReadyScreen({ route }) {
    const json = route.params.order

    function UpdateOrder(){
        let Json = JSON.stringify(route.params.order)
        fetch('https://dev-webapp-inventorymgmtapi-eus.azurewebsites.net/api/Restocking/Complete', {
            method: 'PUT',
            headers: {
              Accept: 'text/plain',
              'Authorization': token.tokencall,
              'Content-Type': 'application/json',
            },
            body: Json ,
          })
            .then((response) => response.text())
            .then((responseData) => {
              console.log(responseData);
            })
            .catch((error) => {
              console.error(error);
            });
          navigation.navigate("SuccessScreen")
    }

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.container_titles}>
                <Text style={styles.title}>
                    Order {route.params.order.shortId}
                </Text>
                <Text style={styles.second_title}>
                    {route.params.order.id}
                </Text>
            </View>
            <View style={styles.container_columns}>
                <View style={styles.columnl}>
                    <Text style={styles.columnl_text}>Start time</Text>
                    <Text style={styles.columnl_text}>End time</Text>
                    <Text style={styles.columnl_text}>Total items restocking</Text>
                    <Text style={styles.columnl_text}>Total bins restocking</Text>
                </View>
                <View style={styles.columnr}>
                    <Text style={styles.columnr_text}>{json.restockingStarted}</Text>
                    <Text style={styles.columnr_text}>{json.restockingFinished}</Text>
                    <Text style={styles.columnr_text}>{json.totalItems}</Text>
                    <Text style={styles.columnr_text}>{json.binNumber}</Text>
                </View>
            </View>
            <View style={styles.container_comment}>
                <Text style={{fontWeight:'bold', marginVertical:10}}>
                    Comments
                </Text>
                <View style={styles.values}>
  <ScrollView>
    <Text numberOfLines={10}>
    </Text>
  </ScrollView>
</View>

            </View>
            <View style={styles.view_touch}>
                <TouchableHighlight
                    style={styles.touchable}
                    onPress={() => UpdateOrder()}
                    underlayColor='#005AFF'
                >
                    <Text style={styles.text}>Complete Restocking</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container_columns: {
        flexDirection: 'row',
        marginVertical: 20,
        marginHorizontal: 10,
        justifyContent: 'center',
        marginTop: 120
    },
    columnr: {
        alignItems: 'flex-end',

    },
    container_comment:{
        marginHorizontal:20
    },
    columnr_text: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 12
    },
    columnl: {
        alignItems: 'flex-start',

    },
    columnl_text: {
        marginBottom: 10,
        fontSize: 12
    },
    container_titles: {
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        color: '#506176',
        fontWeight: 'bold',
        paddingTop: "2%",
    },
    second_title: {
        fontSize: 10,
        color: '#9F9F9F',
        fontWeight: 'bold',
    },
    values: {
        backgroundColor: 'white',
        width: '90%',
        height: 150,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 10,
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
});