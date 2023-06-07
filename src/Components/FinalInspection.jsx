import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Image,FlatList,ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import token from '../assets/token';
export default function FinalInspection({json, items, signature1, signature2, url_fecth}) {
    
    function CompletePickut() {
      const json_actualizado = JSON.stringify(json);
        fetch('https://dev-webapp-inventorymgmtapi-eus.azurewebsites.net/api/Restocking/Pickup', {
            method: 'PUT',
            headers: {
              'accept': 'text/plain',
              'Authorization':  token.tokencall,
              'Content-Type': 'application/json'
            },
            body: (
                      json_actualizado
                  ),
          })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('Error:', error));
        
      navigation.navigate("HomeScreen");

      }
    const productos = items
    const navigation = useNavigation();
    return (

       <View style={styles.container}>

<View >
<FlatList
      data={productos}
      renderItem={({ item }) => (
           <Text style={styles.text_1}>Item {item.product.name} x {item.totalarticulos} </Text>
      )}
      keyExtractor={(item) => item.id}
    />
</View>

<View style={styles.container_sig}>
<Image
        source={{ uri: `${signature1}` }}
        style={styles.image}
      />   

         <Image
        source={{ uri: `${signature2}` }}
        style={styles.image}
      />
</View>
       

     
       <View style={styles.view_touch}>
                    <TouchableHighlight
                        style={styles.touchable}
                        onPress={() => {CompletePickut()}}
                        underlayColor='#005AFF'>
                        <Text style={styles.text}>Complete</Text>
                    </TouchableHighlight>
                </View>
       </View>
    )
}
const styles = StyleSheet.create({
  text_1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#506176',
    marginVertical:20,
  },
  container: {
    flex: 1,
  },
  scrollview: {
    backgroundColor: 'white',
    width: '100%',
    height: '75%'
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
  image: {
    width: 200, 
    height: 200
  },
  container_sig:{
    alignItems:'center',
    marginVertical:30
  }
});