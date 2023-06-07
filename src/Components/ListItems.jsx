import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import token from '../assets/token';

export default function ListPickup({ json, item,textb,nopickut }) {
    const navigation = useNavigation();
    const items = item;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const newProducts = [];
            for (let i = 0; i < items.length; i++) {
                const response = await fetch(
                    `https://dev-webapp-inventorymgmtapi-eus.azurewebsites.net/api/ProductInventory/${items[i].id}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "text/plain",
                            Authorization: token.tokencall,
                        },
                    }
                );
                const data = await response.json();
                newProducts.push(data);
            }
            setProducts(newProducts);
        };
        fetchProducts();
    }, []);

    const itemsConTotal = products.reduce((acumulador, item) => {
        const index = acumulador.findIndex(
            (itemConTotal) => itemConTotal.product.id === item.product.id
        );

        if (index !== -1) {
            acumulador[index].totalarticulos += 1;
        } else {
            acumulador.push({
                ...item,
                totalarticulos: 1
            });
        }
        return acumulador;
    }, []);
    let status = 1;
    return (

        <View style={styles.container}>
            <View style={styles.scrollview}>
                <FlatList
                    data={itemsConTotal}
                    renderItem={({ item }) => (
                        <Text style={styles.text_1}>Item {item.product.name} x {item.totalarticulos} </Text>
                    )}
                    keyExtractor={(item) => item.id}
                />
                 </View>
                {nopickut ?
                    <Text style={styles.text_1}>Recoger {itemsConTotal.length}  articulos de PROVEEDOR bodega a 6:00 AM hora</Text>
                    : null
                }
                <View style={styles.view_touch}>
                    <TouchableHighlight
                        style={styles.touchable}
                        onPress={() => { navigation.navigate("PickoutScreen", { itemsConTotal, status, json }) }}
                        underlayColor='#005AFF'
                    >
                        <Text style={styles.text}>Complete</Text>
                    </TouchableHighlight>
                </View>
           
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    text_view: {
        color: 'white',
        padding: 10
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#506176',
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    text_1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#506176',
        marginHorizontal:20
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
    scrollview: {
        backgroundColor: 'white',
        width: '80%',
        height: '75%',
    },
});