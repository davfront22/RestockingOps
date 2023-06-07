
import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { Text, View, StyleSheet, TouchableHighlight, Image, FlatList, ToastAndroid } from 'react-native'
import token, { tokencall } from '../assets/token';
import MapView, { Marker } from 'react-native-maps';
import { Icon } from 'react-native-elements';
import LogsData from '../Components/LogsData';
import { mdiFlaskEmpty } from '@mdi/js';
export default function MachineScreen({ route }) {
  const [logsDataVisible, setLogsDataVisible] = useState(false);

  const handleLogsDataToggle = () => {
    setLogsDataVisible(!logsDataVisible);
  };
  const showToast = (status) => {
    const message = status ? 'Maquina en proceso de reinicio!' : 'Maquina no disponible!';
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const ResetMachine = async () => {
    fetch(`https://dev-webapp-inventorymgmtapi-eus.azurewebsites.net/api/VendingMachine/ResetDevice/ResetDevice?device=${route.params.machine.deviceId}`, {
      method: 'POST',
      headers: {
        "accept": "text/plain",
        'Authorization': token.tokencall,
      },
    })
      .then(response => response.json())
      .then(data => {
        showToast(data)
      })
      .catch((error) => {
        console.error("Error Critico " + error);
      });
  };
  return (
    <View style={style.container}>
      <Text style={style.title}>Machine {route.params.machine.shortId}</Text>
      <View style={{ flexDirection: 'row', marginVertical: 15 }}>
        <View style={style.columnl}>
          <Text style={style.columnl_text}>Name</Text>
          <Text style={style.columnl_text}>Model</Text>
          <Text style={style.columnl_text}>Make</Text>
          <Text style={style.columnl_text}>Last connection</Text>
        </View>
        <View style={style.columnr}>
          <Text style={style.columnr_text}>{route.params.machine.name}</Text>
          <Text style={style.columnr_text}>{route.params.machine.model}</Text>
          <Text style={style.columnr_text}>{route.params.machine.make}</Text>
          <Text style={style.columnr_text}>{route.params.machine.lastConnectionDateTime}</Text>
        </View>
      </View>

      <View style={{ alignSelf: 'center' }}>
        <MapView
          style={style.image}
          initialRegion={{
            latitude: route.params.machine.location.lat,
            longitude: route.params.machine.location.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={false}
          followsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: route.params.machine.location.lat,
              longitude: route.params.machine.location.lon,
            }}
            title={route.params.machine.id}
            description={'Machine'}
          />
        </MapView>

      </View>
      <View style={style.container_3}>

        <Icon
          type="material-community"
          name="file-document-outline"
          size={40}
          color="#506176"
          onPress={() => console.log('presionando')}
        />
        <>
        </>
        <Icon
          type="material-community"
          name="waze"
          size={40}
          color="#506176"
          onPress={() => {
            const url = `https://www.waze.com/ul?ll=${route.params.machine.location.lat}%2C${route.params.machine.location.lon}&navigate=yes&zoom=17`;
            Linking.openURL(url);
          }}
        />
      </View>
      <View style={style.view_touch}>
        <TouchableHighlight style={style.touchable} underlayColor="lightblue" onPress={ResetMachine}>
          <Text style={style.text_tou}>Reset Machine</Text>
        </TouchableHighlight>
      </View>



    </View>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#506176',
    alignSelf: 'center',
  },
  container_3: {
    alignSelf: 'baseline',
    flexDirection: 'row',
    marginVertical:20
  },
  view_touch: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  touchable: {
    borderRadius: 5,
    backgroundColor: 'blue',
    marginHorizontal: '2%',
    marginBottom: '5%'
  },
  text_tou: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: '2%',
  },
  image: {
    width: 360,
    height: 250,
    marginVertical: 10
  },
  columnr: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20,

  },
  columnr_text: {
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12
  },
  columnl: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,

  },
  columnl_text: {
    marginBottom: 10,
    fontSize: 12
  },

});