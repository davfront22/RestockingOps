
import React, { useRef } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableHighlight, Button } from 'react-native'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Signature from 'react-native-signature-canvas';
import token from "../assets/token";

export default function SignatureComponent({ status, json, items,signature1 }) {

    const navigation = useNavigation();
    let user_signature = ''
    if (status === 2) {
        user_signature = "usuario_A"
    } else if (status === 3) {
        user_signature = "usuario_L"
    }
    function updateimage(base64) {
        const formData = new FormData();
        formData.append('container', 'restockingorders');
        formData.append('base64String', base64.replace("data:image/png;base64,", ""));
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
                
                status++;
                if (status === 3) {
                   let url_signature = result;
                    navigation.navigate("PickoutScreen", { url_signature, status, json, items});
                } else if (status === 4) {
                    let url_signature2 = result;
                    navigation.navigate("PickoutScreen", { url_signature2, status, json, items, signature1});
                }
            })
            .catch(error => console.log('error', error));
    }


    return (
        <View style={style.container}>
            <Text style={style.text_1}>{user_signature}</Text>
            < Signature
                ref={Signature}
                onOK={(img) => updateimage(img)}
                descriptionText=""
                confirmText="Next"
                webStyle={`
                .m-signature-pad--footer .button {
                }
                .m-signature-pad--footer .button.clear {
                  background-color: red;
                  color: #FFF;
                  width: 70px;

                }
                .m-signature-pad--footer .button.save {
                    background-color: blue;
                    color: #FFF;
                    width: 360px;
                  position: absolute;
                  bottom: -290px;
                  left: 0px;
                  right: 0;
                  margin-bottom: 25px;
                  height: 40px;
                }
              `}
                autoClear={true}
                imageType={"image/png"}
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
        backgroundColor: 'white'
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

        alignItems: "center",
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        paddingHorizontal: 130,
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
    text_1: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical:20
    },
});
