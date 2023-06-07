import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableHighlight } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import token from '../assets/token';



export default function CameraComponent({view, items, json}) {
  const navigation = useNavigation();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container_camera}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={styles.icon}>
          <Icon
            type="material-community"
            name="check-circle"
            size={23}
            color="green"
          />
          <Text style={styles.success}>Success!</Text>
        </View>
        </View>
      
        <View style={styles.view_touch}>
          <TouchableHighlight
            style={styles.touchable}
            onPress={() => postImage(photo.base64)}
            underlayColor='#005AFF'>
            <Text style={styles.text}>Continue</Text>
          </TouchableHighlight>
        </View>
     
      </SafeAreaView>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.container_camera}>
          <Camera style={styles.camera} ref={cameraRef} />
        </View>
        <View style={styles.view_touch}>
          <TouchableHighlight
            style={styles.touchable}
            onPress={takePic}
            underlayColor='#005AFF'>
            <Text style={styles.text}>Take photo</Text>
          </TouchableHighlight>
        </View>
      </View>

    </>
  );
  let url_image = '';
  function postImage(base64) {

    const formData = new FormData();
    formData.append('container', 'restockingorders');
    formData.append('base64String', base64);
    formData.append('type', ".png");

    fetch('https://dev-webapp-inventorymgmtapi-eus.azurewebsites.net/api/Image/UploadImage', {
      method: 'POST',
      headers: {
        'Authorization': token.tokencall,
      },
      body: formData,
    })
      .then(response => response.text())
      .then(result => {
        url_image = result;
        let status = 2
        navigation.navigate(view, { items, json, status});
      })
      .catch(error => console.log('error', error));
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  container_3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 25
  },
  touchable: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginHorizontal: 1,
    paddingHorizontal:60
},
container_camera:{
  alignItems:'center'
},
  camera: {
    marginVertical: 20,
    height: 520,
    width: 325
  },
  preview: {
    marginVertical: 20,
    height: 520,
    width: 325,
    borderWidth: 2,
    borderColor: 'green'
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 130
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
  icon: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  success: {
    fontSize: 12,
    color: '#506176',
    fontWeight: 'bold',
  }
});