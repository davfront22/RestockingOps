import React, { useRef, useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableHighlight, Text,Linking,ToastAndroid } from 'react-native';


import MapStyle from '../assets/Confi/MapStyle.json'
import MapStyleSilver from '../assets/Confi/MapStyleSilver.json'

import token from '../assets/token';
export default function MapScreen() {
    const [ubication, setUbication] = useState(null);

    const [shortId, setShortId] = useState(null);

    const [allMachines, setAllMachines] = useState([]);


    const handleMarkerPress = (lat,lon,shortId) => {
        setUbication({
          latitude: lat,
          longitude: lon
        });
        setShortId(shortId);
      };

      const showToast = (status) => {
        const message = 'Escoge una Vending Machine para iniciar tu ruta';
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    };

    useEffect(() => {
        fetch('https://dev-webapp-inventorymgmtapi-eus.azurewebsites.net/api/VendingMachine/Get', {
            method: 'GET',
            headers: {
                "accept": "text/plain",
                'Authorization': token.tokencall,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setAllMachines(data);
            })
            .catch((error) => {
                console.error("Error Critico " + error);
                setAllMachines('error');
            });


    }, [])
    
    return (
      <View style={style.container}>
        {/* <Text style={style.title}>Start Route</Text> */}
        <MapView
          style={style.map}
          initialRegion={{
            latitude: 9.93333,
            longitude: -84.08333,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          customMapStyle={MapStyleSilver}
        >
          {allMachines &&
            allMachines.length > 0 &&
            (() => {
              try {
                return allMachines.map((machin) => (
                  <Marker
                    key={machin.id}
                    coordinate={{
                      latitude: machin.location.lat,
                      longitude: machin.location.lon,
                    }}
                    title={machin.name}
                    description={machin.shortId}
                    onPress={() =>
                      handleMarkerPress(
                        machin.location.lat,
                        machin.location.lon,
                        machin.shortId
                      )
                    }
                  />
                ));
              } catch (error) {
                console.error("Error mapping markers:", error);
                return <Text>Error mapping markers</Text>;
              }
            })()}
        </MapView>
        {allMachines &&
            allMachines.length > 0 &&
            (() => {
              try {
        <View style={style.view_touch}>
          <TouchableHighlight
            style={style.touchable}
            onPress={() => {
              if (!ubication) {
                showToast();
              } else {
                const url = `https://www.waze.com/ul?ll=${ubication.latitude}%2C${ubication.longitude}&navigate=yes&zoom=17`;
                Linking.openURL(url);
              }
            }}
            underlayColor="#005AFF"
          >
            <Text style={style.text}>Start Route {shortId}</Text>
          </TouchableHighlight>
        </View>
        } catch (error) {
          console.error("Error mapping markers:", error);
        }
      })()}
      </View>
    );
    
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    map: {
        width: '100%',
        height: '90%',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#506176',
      alignSelf: 'center',
      marginVertical: 15 
    },
    view_touch: {
        flex: 1,
        justifyContent: 'flex-end'
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
