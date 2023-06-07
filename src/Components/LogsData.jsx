import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image, FlatList } from 'react-native'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
export default function LogsData({machine}) {
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    useEffect(() => {
      // Aquí se cargaría el archivo JSON con los datos de la tabla
      const jsonData = [
        { id: 1, date: '24/04/23', user: 'Daniel@g0pass.com', des:'Clear Machine' , log:'Machine' },
        { id: 2, date: '24/04/23', user: 'Daniel@g0pass.com', des:'Clear Machine' , log:'Machine' },
      ];
      setData(jsonData);
    }, []);


    return (

            <View style={styles.container}>
                <Text style={styles.title}>Machine {machine.id}</Text>
              <Text style={styles.title}>Reset Machine</Text>
              <View style={styles.table}>
      <View style={styles.row}>
        <View style={styles.column}><Text>Date</Text></View>
        <View style={styles.column}><Text>User</Text></View>
        <View style={styles.column}><Text>Description</Text></View>
        <View style={styles.column}><Text>Logs</Text></View>
      </View>
      {data.map(item => (
        <View style={styles.row} key={item.id}>
          <View style={styles.column}><Text>{item.date}</Text></View>
          <View style={styles.column}><Text>{item.user}</Text></View>
          <View style={styles.column}><Text>{item.des}</Text></View>
          <View style={styles.column}><Text>{item.log}</Text></View>
        </View>
      ))}
    </View>
            </View>

            
          );
        }
        
        const styles = StyleSheet.create({
            container: {
                backgroundColor: 'white',
                paddingHorizontal: 15,
                marginVertical:20
            },
          title: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#506176',
            paddingHorizontal: 15,
            marginBottom:15
        },
          table: {
            borderWidth: 1,
            borderColor: '#000',
            flexDirection: 'column',
          },
          row: {
            flexDirection: 'row',
          },
          column: {
            flex: 1,
            borderWidth: 1,
            borderColor: '#000',
            padding: 2,
          },
        });