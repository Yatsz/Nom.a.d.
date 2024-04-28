import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated, TextInput, Keyboard } from 'react-native';
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
import {BlurView} from 'expo-blur'
//import Geolocation from 'react-native-geolocation-service';
import shelters from '../assets/data2.json'

const ScaleInView = (props) => {
  const [scaleAnim] = useState(new Animated.Value(0))  // Initial value for scale: 0

  useEffect(() => {
    Animated.spring(
      scaleAnim,
      {
        toValue: 1,
        friction: 10,
        duration: 0,
        useNativeDriver: true,
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        transform: [{scale: scaleAnim}]
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default function NewPin({ navigation, route }) {

  const [sendPop, setSendPop] = useState(false);

    const [location, setLocation] = useState(
        {
            latitude: 38.5449,
            longitude: -121.7405
        }
    );

    const [text, setText] = useState('');

    const haversineDistance = (coords1, coords2) => {
      const toRadian = angle => (Math.PI / 180) * angle;
      const earthRadius = 6371; // km

      const dLat = toRadian(coords2.latitude - coords1.latitude);
      const dLon = toRadian(coords2.longitude - coords1.longitude);

      const lat1 = toRadian(coords1.latitude);
      const lat2 = toRadian(coords2.latitude);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadius * c;
    };

    const findClosestShelter = (pinLocation, shelters) => {
      let closestShelter = null;
      let minDistance = Infinity;

      shelters.forEach(shelter => {
        const distance = haversineDistance(pinLocation, shelter);
        if (distance < minDistance) {
          minDistance = distance;
          closestShelter = shelter;
        }
      });

      console.log("Closest Shelter:", closestShelter);
      return closestShelter;
    };

    

    const newPinLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
    };

    

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
          setSendPop(true);
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

            const closestShelter = findClosestShelter(newLocation, shelters);
            console.log('Closest Shelter:', closestShelter);
            
        }} style={[styles.addButton, {backgroundColor: '#81A484'}]} >
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
        {sendPop &&
        <>
        <BlurView
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }}
                    intensity={10}
                    tint="dark"
                ></BlurView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <ScaleInView style={styles.addPopup}>
              <Text style={{marginTop: 15, fontWeight: 'bold', fontSize: 30, alignSelf: 'left'}}>Congrats!</Text>
                <Text style={{alignSelf: 'left', marginTop: 5}}>You just placed a pin to help shelters</Text>
                <Text style={{alignSelf: 'left'}}>provide resources!</Text>
                <TextInput
                multiline
                numberOfLines={5}
                  style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                    paddingTop: 12,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    width: 270,
                    height: 100,
                    alignItems: 'baseline'
                  }}
                  onChangeText={setText}
                  value={text}
                  placeholder="Write a note..."
                  
                />

                <TouchableOpacity style={styles.submitButton} onPress={() => {
                  setSendPop(false);
                  navigation.navigate('Map');
                }}>
                  <Text style={{color: "#fff"}}>Submit</Text>
                </TouchableOpacity>
            </ScaleInView>
            </TouchableWithoutFeedback>
            </>
        }
    </>
  );
}


const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#506C53",
    padding: 10,
    borderRadius: 5,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    marginLeft: 180
  },
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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