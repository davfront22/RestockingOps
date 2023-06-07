import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GoogleAuthentication } from 'expo-google-app-auth';

const MapGoogle = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleSignIn = async () => {
    try {
      const { accessToken } = await GoogleAuthentication.logInAsync({
        androidClientId: 'your_android_client_id_here',
        iosClientId: 'your_ios_client_id_here',
        scopes: ['profile', 'email'],
      });
      setAccessToken(accessToken);
    } catch (error) {
      console.log('Error signing in', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
      {!accessToken && (
        <View style={styles.signInContainer}>
          <Button title="Sign In with Google" onPress={handleSignIn} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  signInContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default MapGoogle;
