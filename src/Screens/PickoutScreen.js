
import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image, Button } from 'react-native'

import ListItems from '../Components/ListItems';
import CameraComponent from '../Components/CameraComponent';
import SignatureComponent from '../Components/Signature'
import FinalInspection from '../Components/FinalInspection';

export default function PickoutScreen({ route }) {
  const status = route.params.status ?? 0;
  return (   
     <View style={style.container}>
      {/* <Text style={style.title}>Order {route.params.json.id}</Text> */}
          {status === 0 && <View style={style.container}>
                <Text style={style.title}>Pickut List</Text>
                <ListItems item={route.params.items} json={route.params.order} textb={'Start Pickout'} nopickut={true}/>
            </View>}
            {status === 1 && <CameraComponent view={'PickoutScreen'} items={route.params.itemsConTotal} json={route.params.json} />}
            {status === 2 && <SignatureComponent status={status} items={route.params.items} json={route.params.json} />}
            {status === 3 && <SignatureComponent status={status} items={route.params.items} json={route.params.json} signature1={route.params.url_signature} />}
            {status === 4 && <FinalInspection items={route.params.items} json={route.params.json} signature1={route.params.signature1} signature2={route.params.url_signature2} />}

  </View>
);
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginVertical: 25,
    marginHorizontal: 15,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#506176',
    paddingHorizontal: 15,
    paddingVertical: 5
},
});
