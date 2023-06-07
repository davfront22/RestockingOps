import React, { useRef, useState, useEffect } from 'react';
import { DrawerLayoutAndroid, Text, StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';


import MachineBox from '../Components/MachineBox';
import token from '../assets/token';


export default function ViewMachine() {

  const renderItem = ({ item }) => <MachineBox machine={item} />;

  const [allMachines, setAllMachines] = useState([]);
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

  const Machines = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Machines</Text>
        <FlatList data={allMachines}
          renderItem={renderItem}
          keyExtractor={(item) => allMachines.id}
          style={styles.FlatList}
          ListEmptyComponent={() =>
            allMachines.length === 0 ? <Text>
              No hay maquinas disponibles
            </Text>
              : null
          }
        />
      </View>
    )
  }
  const NoMachines = () => {
    return (
      <View style={style.container}>
        <Icon
          type="material-community"
          name="alert-circle"
          size={75}
          color="#506176"
          style={style.iconorders}
        />
        <Text style={style.first_text}>
          Don't have machines
        </Text>
        <Text style={style.second_text}>
          No machines available or try again later
        </Text>
      </View>

    );

  };
  if (allMachines == 'error') {
    return <NoMachines />;
  } else {
    return <Machines
    />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F5F3',// Agregamos esta propiedad para centrar verticalmente
  },
  text: {
    color: '#506176',
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: 'flex-start'
  },
});
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F3',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  first_text: {
    fontSize: 18,
    color: '#506176',
    fontWeight: 'bold',
    paddingTop: 35,
    paddingBottom: 5
  },
  second_text: {
    fontSize: 17,
    color: '#506176',
    paddingBottom: 420
  },
});
