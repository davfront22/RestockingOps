import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableHighlight, Image, Modal, Button, TextInput } from 'react-native'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import token from '../assets/token';

const InputModal = ({ visible, onClose }) => {
    const [text, setText] = useState('');

    const handleInputChange = (value) => {
        setText(value);
    };

    const handleSave = () => {
        //console.log(text);
        onClose();
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={style.modal}>
                <TextInput placeholder="Ingrese texto" onChangeText={handleInputChange} />
                <TouchableHighlight onPress={handleSave}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{ color: 'blue' }}>Save</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </Modal>
    );
};




export default function UploadedScreen({ route }) {
    const navigation = useNavigation();


    function FunctionCompleteBin()  {
        const jsonString = JSON.stringify(route.params.order);

        fetch(`https://dev-webapp-inventorymgmtapi-eus.azurewebsites.net/api/Restocking/CompleteBin?binId=${route.params.binId}`, {
            method: 'PUT',
            headers: {
                'accept': 'text/plain',
                'Authorization': token.tokencall,
                'Content-Type': 'application/json',
            },
            body: jsonString,
        })
            .then(response => response.text())
            .then(result => {
                updateimage(route.params.photo.base64)
                navigation.navigate("HomeScreen");
            })
            .catch(error => {
                console.error(error);
            });
    }

    function updateimage(base64) {
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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const [modalVisible, setModalVisible] = useState(false);

    const handleButtonPress = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };
    return (

        <View style={style.container}>
            <Image source={{ uri: "data:image/png;base64," + route.params.photo.base64 }} style={style.preview} />
            <Text style={style.textphotoupload}>Photo Uploaded</Text>
            <View>
                <TouchableHighlight onPress={handleButtonPress}>
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <Text style={style.addcomment}>Add a comment</Text>
                    </View>
                </TouchableHighlight>
                <InputModal visible={modalVisible} onClose={handleCloseModal} style={{ backgroundColor: 'green', padding: 80, marginBottom: 500 }} />
            </View>
            <View style={style.viewtouch}>
                <TouchableHighlight onPress={() => FunctionCompleteBin()}>
                    <View>
                        <Text style={style.texttouch}>Complete Bin {route.params.bin}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingBottom: 300
    },
    preview: {
        backgroundColor: 'black',
        width: 150,
        height: 300,
        marginTop: 50,
        borderWidth: 2,
        borderColor: 'black'
    },
    viewtouch: {
        position: 'absolute',
        marginBottom: 20,
        marginTop: 723

    },
    texttouch: {
        backgroundColor: "#005AFF",
        paddingHorizontal: 120,
        color: 'white',
        paddingVertical: 11,
        alignSelf: 'center',
        borderRadius: 12
    },
    addcomment: {
        color: '#005AFF',
        fontWeight: 'bold',
    },
    textphotoupload: {
        fontSize: 20,
        color: '#506176',
        fontWeight: 'bold',
        paddingBottom: 40,
        marginTop: 20
    }
});


