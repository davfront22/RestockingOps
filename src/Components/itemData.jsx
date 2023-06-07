import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function ItemData({ item }) { 
    const { count = 1, product } = item;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{count} {product.name}</Text>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        padding: 10,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        paddingRight: 5
    },
    image: {
        width: 100, 
        height: 170, 
        marginTop:10,
        backgroundColor: 'white'                     
    }
});
// limpieza de codigo 05/05/23