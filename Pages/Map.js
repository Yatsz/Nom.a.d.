import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/Entypo'
import AntIcon from 'react-native-vector-icons/AntDesign'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from'react-native-vector-icons/Feather'
import { useState, useEffect } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import animalPin from '../assets/animalPin.png'
import homelessPin from '../assets/homelessPin.png'
import petShelter from '../assets/petShelter.png'
import homelessShelter from '../assets/homeLessShelter.png'
import { collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore";
import {auth, db} from "../FirebaseConfig";
import {BlurView} from 'expo-blur'
import pinsData from '../assets/pins.json'

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

export default function Map({ navigation, route }) {

    

    const [pins, setPins] = useState(pinsData);

    const [loading, setLoading] = useState(false);

    const fetchData = async() => {
        
        setLoading(true);
        const colRef = collection(db, "pins");
        const docsSnap = await getDocs(colRef);
        let temp = [...pinsData];
        docsSnap.forEach(doc => {
            temp.push(doc.data());
        })
        //console.log(temp)
        setPins(temp);
        setLoading(false)
    }

    useEffect(() => {

        fetchData();
    }, [])

    const [addPopup, setAddPopup] = useState(false);

    const openAdd = () => {
        setAddPopup(true);
    }

    const closeAdd = () => {
        setAddPopup(false);
    }

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
            showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={true}
            showsUserLocation={true}
            pins={pins}
        >
            {
                pins.map((pin, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: pin.latitude,
                            longitude: pin.longitude
                        }}
                        
                    >
                        <Image
                            source={pin.type == "animal" ? animalPin : (pin.type == "petShelter" ? petShelter : (pin.type == "homelessShelter" ? homelessShelter : homelessPin))}
                            style={{width: 50, height: 50, resizeMode: 'contain'}}
                            resizeMode="contain"
                        />
                    </Marker>
                ))
            }
        </MapView>

        

        <TouchableOpacity onPress={openAdd} style={styles.addButton}>
            <Entypo
                name="plus"
                size={25}
                color="#fff"
                style={{  }}
            />
            <Text style={styles.buttonText}>Add Pin</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            fetchData();
        }} style={{position: 'absolute', alignSelf: "baseline", zIndex: 2, backgroundColor: "#000", borderRadius: 10, marginTop: "10%", width: 20, flex: 1, justifyContent: "center", alignItems: "center", marginLeft: "5%"}}>
            <Material
                name="reload"
                size={20}
                color="#fff"

            />
        </TouchableOpacity>
        
        {addPopup &&
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
            <ScaleInView style={styles.addPopup}>
                <TouchableOpacity onPress={closeAdd} style={{marginLeft: "80%", marginBottom: "8%"}}>
                    <AntIcon
                        name='close'
                        size={20}
                        color="#000"
                        
                    />
                </TouchableOpacity>
                <Text>Select the pin you would like to drop</Text>
                <Text>to alert the nearest shelter.</Text>
                <View style={styles.twoThings}>
                    <View style={styles.comb}>
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate('NewPin', {type: 'person', setPins: setPins, pins: pins, email: route.params.email})
                            setAddPopup(false);
                        }}>
                            <Image source={homelessPin} style={styles.pins}/>
                        </TouchableWithoutFeedback>
                        <Text>Person</Text>
                    </View>
                    <View style={styles.comb}>
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate('NewPin', {type: 'animal', setPins: setPins, pins: pins, email: route.params.email})
                            setAddPopup(false);
                        }}>
                            <Image source={animalPin} style={styles.pins}/>
                        </TouchableWithoutFeedback>
                        <Text>Animal</Text>
                    </View>
                </View>
            </ScaleInView>
            </>
        }
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
    paddingBottom: 20,
    paddingX: 20,
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
    backgroundColor: "#68866B",
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