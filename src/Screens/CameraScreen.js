
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableHighlight } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

export default function CameraScreen({ route }) {
console.log(route.params)
  let order = route.params.order;
  const binId = route.params.binId;
  let bin = route.params.bin

  const navigation = useNavigation();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
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
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return        (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textupload}>Upload a photo</Text>
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
        <View style={styles.viewtouch}>
          <TouchableHighlight onPress={() => navigation.navigate("UploadedScreen", { photo, binId,order, bin })}>
            <View>
              <Text style={styles.texttouch}>Cotinue</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
  let camera = () => {

    return (
      <>
        <Camera style={styles.container} ref={cameraRef} />
      </>
    )
  }
  return (
    <>
      <Text style={stylecamerascreen.textupload}>Upload a photo</Text>
      <Camera style={stylecamerascreen.container} ref={cameraRef} />
      <View style={stylecamerascreen.viewtouch}>
        <TouchableHighlight onPress={takePic}>
          <View>
            <Text style={stylecamerascreen.texttouch}>Take photo</Text>
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
}

const stylecamerascreen = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 50,
    marginBottom:130, 

  },
  preview: {
    width: 300, 
    height: 500 ,

  },
  viewtouch: {
    marginBottom: 20, 
    marginTop: 20

  },
  texttouch: {
    backgroundColor: "#005AFF", 
    paddingHorizontal: 120, 
    color: 'white', 
    paddingVertical: 11,
     alignSelf: 'center', 
     borderRadius: 11,
     paddingLeft:140,
     paddingRight:140

  },
  textupload: {
    color: '#506176',
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'

  },
  preview: {
    width: 300, 
    height: 500 ,
    borderWidth: 2, 
    borderColor: 'green'
  },
  viewtouch: {
    marginBottom: 20, 
    marginTop: 11,
  },
  texttouch: {
    backgroundColor: "#005AFF", 
    color: 'white', 
    paddingVertical: 12,
     alignSelf: 'center', 
     borderRadius: 12,
     paddingLeft:149,
     paddingRight:149

  },
  textupload: {
    alignSelf:'flex-start',
    color: '#506176',
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft:26
  },
  icon:{
    marginVertical:55,
    flexDirection:'row',
    alignItems:'center'
  },
  success:{
fontSize:12,
color: '#506176',
fontWeight: 'bold',
  }
});