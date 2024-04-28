import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/Entypo'
import AntIcon from 'react-native-vector-icons/AntDesign'
import Feather from'react-native-vector-icons/Feather'
import { useState, useEffect } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import animalPin from '../assets/animalPin.png'
import homelessPin from '../assets/homelessPin.png'
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import uuid from 'react-native-uuid';
import {auth, db} from "../FirebaseConfig";
//import Geolocation from 'react-native-geolocation-service';



export default function NewPin({ navigation, route }) {

    const [location, setLocation] = useState(
        {
            latitude: 38.5449,
            longitude: -121.7405
        }
    );

    useEffect(() => {
        /*Geolocation.getCurrentPosition(
            position => {
              setLocation(position.coords);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );*/
    }, [])

  return (
    <>
        <MapView
            provider={PROVIDER_GOOGLE} // Specify Google Maps as the provider
            style={styles.map}
            initialRegion={{
                latitude: 38.5449,
                longitude: -121.7405,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
        >
            <Marker 
                draggable
                coordinate={location}
                onDragEnd = {e => {
                    setLocation(e.nativeEvent.coordinate);
                }}
            >
                <Image
                    source={route.params.type == "animal" ? animalPin : homelessPin}
                    style={{width: 50, height: 50, resizeMode: 'contain'}}
                    resizeMode="contain"
                />
            </Marker>
        </MapView>

        <TouchableOpacity onPress={async() => {
            let newLocation = {
                latitude: location.latitude,
                longitude: location.longitude,
                type: route.params.type
            }
            
            let id = uuid.v4();
            await setDoc(doc(db, "pins", id), {
              latitude: location.latitude,
              longitude: location.longitude,
              type: route.params.type
            })

            let email = route.params.email

            const docRef = doc(db, "users", email);
            const docSnap = await getDoc(docRef);

            let num = docSnap.data().pins
            await updateDoc(doc(db, "users", route.params.email), {
              pins: num + 1
            })
            route.params.setPins([...route.params.pins, newLocation])
            navigation.navigate('Map')
        }} style={[styles.addButton, {backgroundColor: '#16a34a'}]} >
            <Text style={styles.buttonText}>Add Pin Here</Text>
            <Feather
                name="check"
                size={20}
                color="#fff"
                style={{  }}
            />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            navigation.navigate('Map');
        }} style={{position: 'absolute', alignSelf: "left", zIndex: 2, backgroundColor: "#000", borderRadius: 10, marginTop: "10%", width: 20, flex: 1, justifyContent: "center", alignItems: "center", marginLeft: "5%"}}>
            <AntIcon
                name="arrowleft"
                size={20}
                color="#fff"

            />
        </TouchableOpacity>

    </>
  );
}


const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  pins: {
    height: 60,
    resizeMode: "contain",
    marginBottom: 10
  },
  comb: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  twoThings: {
    flexDirection: "row",
    gap: 55,
    marginTop: 20
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addPopup: {
    position: 'absolute',
    height: 250,
    width: 310,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignSelf: "center",
    top: "35%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  addButton: {
    flex: 1,
    flexDirection:'row',
    width: 180,
    height: 45,
    position:'absolute',
    alignSelf: "center",
    bottom: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d4ed8",
    borderRadius: 30,
    zIndex: 1,
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});