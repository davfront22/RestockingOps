import React, { useRef, useState, useEffect } from 'react';
import { DrawerLayoutAndroid, Text, StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import RestockingOrdersNo from '../Components/NoOrders';
import CameraComponent from '../Components/CameraComponent';

//npx expo start --no-dev --minify sin mensajes de errores


import OrderBox from '../Components/OrderBox';
import token from '../assets/token';


const ListOrders = () => {

  const [orders, setOrders] = useState([]);
  const [openOrders, setOpenOrders] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);

  useEffect(() => {

    fetch('https://dev-webapp-inventorymgmtapi-eus.azurewebsites.net/api/RestockingOrder', {
      method: 'GET',
      headers: {
        "accept": "text/plain",
        'Authorization': token.tokencall,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error Critico " + error);
      });
  }, [])
const renderItem = ({ item }) => <OrderBox order={item} bin ={item.bins[0]}/>;
  useEffect(() => {
    const openOrders = orders.filter((order) => order.status === "Created" || order.status === "Assigned" || order.status === "WaitingForPickup" || order.status === "WaitingForRestock" || order.status === "WaitingForReturn" || order.status === "Started");
    const closedOrders = orders.filter((order) => order.status === "Finished");
    setOpenOrders(openOrders);
    setClosedOrders(closedOrders);
  }, [orders]);

  const OrdersScreen = () => {
    return (
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={200}
        drawerPosition='left'
        renderNavigationView={navigationView}>
        <ScrollView>


          <View style={styles.container}>
            <Text style={styles.text}>
              Active orders
            </Text>
            <FlatList data={openOrders}
              renderItem={renderItem}
              keyExtractor={(item) => openOrders.id}
              style={styles.FlatList}
              ListEmptyComponent={() =>
                openOrders.length === 0? <Text style={styles.textnodata}>No hay ordernes disponibles</Text> : null
              }
            />
            <Text style={styles.text}>
              Closed orders
            </Text>
            <FlatList data={closedOrders}
              renderItem={renderItem}
              keyExtractor={(item) => closedOrders.id}
              style={styles.FlatList}
              ListEmptyComponent={() =>
                closedOrders.length === 1 ? <Text style={styles.textnodata}>No hay ordenes disponibles</Text> : null
              }
            />
          </View>
        </ScrollView>
      </DrawerLayoutAndroid>
    );
  };

  const NoOrdersScreen = () => {
    return (
      <View style={{flex: 1 }}>
        <RestockingOrdersNo />
      </View>
      
    );
  };


  const drawer = useRef(null);

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.username_text}>Hi, Username</Text>
      <Text style={styles.mail_text}>useremail@gmail.com</Text>
      <View style={styles.container_support}>
        <Icon
          type="material-community"
          name="help-circle-outline"
          size={25}
          color="#506176"
        />
        <Text style={styles.support_text}>
          Support
        </Text>
      </View>
      <View style={styles.container_signout}>
        <Icon
          type="material-community"
          name="exit-to-app"
          size={25}
          color="#506176"
        />
        <Text style={styles.signout_text}>
          Sign Out
        </Text>
      </View>
    </View>
  );

  if (orders.length == 0) {
    return <NoOrdersScreen />;
  } else {
    return <OrdersScreen />;
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: 'white',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  username_text: {
    fontSize: 20,
    color: '#506176',
    fontWeight: 'bold',
    paddingTop: 25
  },
  mail_text: {
    fontSize: 12,
    color: '#506176',
  },
  signout_text: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingLeft: 8
  },
  container_support: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 75,
    paddingLeft: 15
  },
  container_signout: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 500,
    paddingLeft: 15
  },
  support_text: {
    fontSize: 14,
    color: '#506176',
    paddingTop: 1,
    paddingLeft: 8
  },
  container_fat: {
    flex: 1,
    backgroundColor: '#F4F5F3',
    marginLeft: 10
  },
  text: {
    color: '#506176',
    fontWeight: 'bold',
    fontSize: 24,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf:'flex-start'
  },
  textnodata:{
    color: '#506176',
    fontWeight: 'bold',
    marginLeft:20
  },

});

export default ListOrders;