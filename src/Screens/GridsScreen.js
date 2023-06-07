import React, { useRef, useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableHighlight } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import GridBox from '../Components/GridBox';


export default function GridsScreen({ route }) {
    const navigation = useNavigation();
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        const allBinsFinalized = route.params.order.bins.every((bin) => bin.status === 'Finished' || bin.status === 'WaitingToBeRemoved');
        setShowButton(allBinsFinalized);
    }, []);

    const handleCompleteRestocking = () => {
        navigation.navigate('ReadyScreen', { order: route.params.order });
    };

    const renderItem = ({ item: bin }) => <GridBox bins={bin} order={route.params.order} />;

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


            <View style={styles.scrollview}>
                <FlatList data={route.params.order.bins}
                    renderItem={renderItem}
                    keyExtractor={(item) => route.params.order.bins}
                    numColumns={2}
                />
            </View>


            {showButton && (
                <View style={styles.view_touch}>
                    <TouchableHighlight
                        style={styles.touchable}
                        onPress={handleCompleteRestocking}
                        underlayColor='#005AFF'
                    >
                        <Text style={styles.text}>Complete</Text>
                    </TouchableHighlight>
                </View>
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    scrollview: {
        backgroundColor: 'white',
        width: '100%',
        height: '75%'
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

