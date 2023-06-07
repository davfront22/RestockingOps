
import React, { useRef } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableHighlight, Button } from 'react-native'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import Signature from 'react-native-signature-canvas';
import token from '../assets/token';

export default function SignatureScreen() {

    function updateimage(base64) {
        const startBase = "";
        const regexUpdateImage = /data:image\/svg\+xml;base64,/g;
        base64 = base64.replace(regexUpdateImage,startBase);
           // console.info(base64)
        const formData = new FormData();
        formData.append('container', 'restockingorders');
        formData.append('base64String', base64);
        formData.append('type', ".svg");
        
        fetch('https://dev-webapp-inventorymgmtapi-eus.azurewebsites.net/api/Image/UploadImage', {
          method: 'POST',
          headers: {
            'Authorization': token.tokencall,
          },
          body: formData,
        })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    const ref = useRef();

    const handleOK = (signature) => {
        console.log(signature);
        updateimage(signature);
    };

    const handleClear = () => {
        ref.current.clearSignature();
    };

    const handleConfirm = () => {
        console.log("end");
        ref.current.readSignature();
    };
    return (
       
        <View style={style.container}>

            < Signature 
              // handle when you click save button
  onOK={(img) => updateimage(img)}
  onEmpty={() => console.log("empty")}
  descriptionText=""
  clearText="Clear"
  confirmText="Next"
  webStyle={`.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`}
  autoClear={true}
  imageType={"image/svg+xml"}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 650,
        padding: 10,
        backgroundColor:'white'
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

        alignItems: "center",
    },
});
