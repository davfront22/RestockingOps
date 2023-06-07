import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function MachineBox({machine}) {
    const navigation = useNavigation();
    const isOnline = machine.status === 'Online';
    return (
      <View style={{marginBottom:5}}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() =>
            navigation.navigate("MachineScreen", { machine})
          }
        >
          <View style={style.button}>
            <View>
              <Text style={style.text_order} numberOfLines={2}>
                Maquine {machine.name} {machine.shortId}
              </Text>
              <Text style={style.text_order_id} numberOfLines={2}>
              {machine.status}
              </Text>
            </View>
            <View style={style.iconorders}>
              <Icon
                type="material-community"
                name={isOnline ? "check-circle-outline" : "close-circle-outline"}
                size={30}
                color={isOnline ? "green" : "red"}
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
}
const style = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems:'center',
        height:70,
        width: 340
    },
    iconorders: {
        flex:1,
        alignItems:'flex-end',
        marginHorizontal:10

    },
    text_view: {
        color: '#005AFF',
        fontWeight: 'bold',
        paddingRight: 5,
    },
    text_order: {
        fontWeight: '400',
        paddingHorizontal: 8,
        fontSize: 15,
        color: '#506176'
        
    },
    text_order_id: {
      fontWeight: 'bold',
      paddingHorizontal: 8,
      fontSize: 15,
      color: '#ccc'
      
  }
});