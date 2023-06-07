import React, { useRef, useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableHighlight, Image } from 'react-native'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import token from '../assets/token';
import ItemData from '../Components/itemData';

export default function GridScreen({ route }) {
  console.info(route.params.bins.id)
  const navigation = useNavigation();



  // variables para guardar arrays de objetos despues de llamarlos, aqui estan los objectos con sus repectivos datos
  const [resultsWaitingToBeRemoved, setResultsWaitingToBeRemoved] = useState([]);
  const [resultsWaitingForRestock, setResultsWaitingForRestock] = useState([]);



  // en estas variables se guardan los objetos repetidos con una variable llamada count para identificar cuantos objetos hay repetidos para las diferentes categorias
  const [repeatElementsWaitingForRestock, setRepeatElementsWaitingForRestock] = useState({});
  const [repeatElementsWaitingToBeRemoved, setRepeatElementsWaitingToBeRemoved] = useState({});

  useEffect(() => {

    // el siguiente array contiene los objetos de items del restocking, solo contiene ids 
    const array = route.params.bins.items;
    // con las siguientes variables filtramos y guaramos los ids en diferentes categorias
    const WaitingForRestock = array.filter(item => item.status === "WaitingForRestock");
    const WaitingToBeRemoved = array.filter(item => item.status === "WaitingToBeRemoved");

    // funcion para llamar los objetos y ver el contenidos de los ids
    const fetchData = async (id) => {
      try {
        const response = await fetch(
          `https://dev-webapp-inventorymgmtapi-eus.azurewebsites.net/api/ProductInventory/${id}`,
          {
            method: "GET",
            headers: {
              accept: "text/plain",
              Authorization: token.tokencall,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching data for ID ${id}:`, error);
        return null;
      }
    };


    // el siguiente metodo unira los elementos repetidos
    const fetchAllDataWaitingForRestock = async () => {

      const resultsWaitingForRestock = await Promise.all(WaitingForRestock.map((item) => fetchData(item.id)));
      setResultsWaitingForRestock(resultsWaitingForRestock);

      const uniqueProducts = resultsWaitingForRestock.reduce((acc, item) => {
        const productId = item.product.id;
        if (!acc.seenProductIds[productId]) {
          acc.seenProductIds[productId] = { count: 1, item };
          acc.output.push(item);
        } else {
          acc.seenProductIds[productId].count++;
        }
        return acc;
      }, { seenProductIds: {}, output: [] });

      uniqueProducts.output.forEach((item) => {
        const productId = item.product.id;
        if (uniqueProducts.seenProductIds[productId].count > 1) {
          item.count = uniqueProducts.seenProductIds[productId].count;
        }
      });
      setRepeatElementsWaitingToBeRemoved(uniqueProducts.output);

    };

    fetchAllDataWaitingForRestock();

    const fetchDataWaitingToBeRemoved = async (id) => {
      try {
        const response = await fetch(
          `https://dev-webapp-inventorymgmtapi-eus.azurewebsites.net/api/ProductInventory/${id}`,
          {
            method: "GET",
            headers: {
              accept: "text/plain",
              Authorization: token.tokencall,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching data for ID ${id}:`, error);
        return null;
      }
    };

    const fetchAllDataWaitingToBeRemoved = async () => {

      const resultsWaitingToBeRemoved = await Promise.all(WaitingToBeRemoved.map((item) => fetchDataWaitingToBeRemoved(item.id)));
      setResultsWaitingToBeRemoved(resultsWaitingToBeRemoved);


      const uniqueProducts = resultsWaitingToBeRemoved.reduce((acc, item) => {
        const productId = item.product.id;
        if (!acc.seenProductIds[productId]) {
          acc.seenProductIds[productId] = { count: 1, item };
          acc.output.push(item);
        } else {
          acc.seenProductIds[productId].count++;
        }
        return acc;
      }, { seenProductIds: {}, output: [] });

      uniqueProducts.output.forEach((item) => {
        const productId = item.product.id;
        if (uniqueProducts.seenProductIds[productId].count > 1) {
          item.count = uniqueProducts.seenProductIds[productId].count;
        }
      });

      setRepeatElementsWaitingForRestock(uniqueProducts.output);
    };

    fetchAllDataWaitingToBeRemoved();


  }, []);

  let order = route.params.order;
  let bin = route.params.bins.row + route.params.bins.slot;
  let binId = route.params.bins.id


  const renderItem = ({ item }) => <ItemData item={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.container_fat}>
      <Text style={styles.bintext}>Bin {route.params.bins.row}{route.params.bins.slot}</Text>
      </View>
     
      <View style={styles.scrollview}>
    <View>
        {Object.entries(repeatElementsWaitingForRestock).length > 0 ? (
          <View style={styles.container_fat}>
            <Text style={styles.textlittle}>Remove {resultsWaitingToBeRemoved.length} item</Text>
            <FlatList
              data={repeatElementsWaitingForRestock}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={1}
            />
          </View>
        ) : null}
        {Object.entries(repeatElementsWaitingToBeRemoved).length > 0 ? (
          <View style={styles.container_fat}>
            <Text style={styles.textlittle}>
              Add {resultsWaitingForRestock.length} item
            </Text>
            <FlatList
              data={repeatElementsWaitingToBeRemoved}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={1}
            />
          </View>
        ) : null}
        </View>
        
         
      </View>
      <View style={styles.view_touch}>
        <TouchableHighlight
          style={styles.touchable}
          onPress={() => navigation.navigate("CameraScreen", { binId, order,bin })}
          underlayColor='#005AFF'
        >
          <Text style={styles.text}>Next</Text>
        </TouchableHighlight>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container_fat: {
    alignItems: 'center',
  },
  scrollview:{ 
    backgroundColor:'white', 
    width:'100%', 
    height:'75%'
  },
  bintext: {
    fontSize: 20,
    color: '#506176',
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingBottom: 20
  },
  textlittle: {
    fontSize: 16,
    color: '#506176',
    fontWeight: 'bold',
    marginLeft: 15
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
});
