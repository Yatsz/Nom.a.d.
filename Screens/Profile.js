import {React, useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SvgXml } from 'react-native-svg';
import { CurrentRenderContext } from '@react-navigation/native';
import Volunteer from '../Components/Volunteer';
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import {auth, db} from "../FirebaseConfig";



const location = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6667 8.33329C16.6667 13.3333 10 18.3333 10 18.3333C10 18.3333 3.33334 13.3333 3.33334 8.33329C3.33334 6.56518 4.03572 4.86949 5.28596 3.61925C6.53621 2.36901 8.2319 1.66663 10 1.66663C11.7681 1.66663 13.4638 2.36901 14.7141 3.61925C15.9643 4.86949 16.6667 6.56518 16.6667 8.33329Z" stroke="#A3A3A3" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 10.8334C11.3807 10.8334 12.5 9.71409 12.5 8.33337C12.5 6.95266 11.3807 5.83337 10 5.83337C8.61929 5.83337 7.5 6.95266 7.5 8.33337C7.5 9.71409 8.61929 10.8334 10 10.8334Z" stroke="#A3A3A3" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


`

const Chipotle = `https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/1200px-Chipotle_Mexican_Grill_logo.svg.png`

const ihop = `https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/dhkhzpxnauyszjqw6jqr`

const ProfileHeader = ({pin, name}) => {

  let avatar = "";
  console.log(pin)

  let arr = name.split(" ")
  console.log(arr)
  avatar += arr[0][0] + arr[1][0];

  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{avatar}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <View style={styles.location}>
          <SvgXml xml={location} width="20" height="20" />
          <Text style={styles.userLocation}>Davis, CA 95616</Text>
        </View>
        <View style={styles.pinsContainer}>
        <Icon name="pin" size={20} color="#68866B" />
        <Text style={styles.pinsText}>{pin} PINS</Text>
      </View>
      </View>

      
    </View>
  );
};



const Profile = ({route}) => {

  const [left, setLeft] = useState(true);

  const [pinCount, setPinCount] = useState(0)
  const [email, setEmail] = useState(route.params.email)

  const getPins = async() => {
    
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    let num = docSnap.data().pins
    setPinCount(num);
  }

  count = 0;
  count++

  useEffect(() => {
    setEmail(route.params.email)
    getPins()
  })

  return (
    <>
    <ProfileHeader pin={pinCount} name={route.params.personName} />
    <View style={{marginTop: 50, flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => {
        setLeft(true)
      }} style={!left ? {backgroundColor: "#fff", padding: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30, width: '50%', height: 41, alignItems: 'center'} : {backgroundColor: "#68866B", padding: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30, width: '50%', height: 41, alignItems: 'center'}}>
        <Text style={!left ? {fontSize: 18, fontWeight: 'bold'} : {fontSize: 18, color: '#fff', fontWeight: 'bold'}}>Volunteer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={left ? {backgroundColor: "#fff", padding: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30, width: '50%', height: 41, alignItems: 'center'} : {backgroundColor: "#68866B", padding: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30, width: '50%', height: 41, alignItems: 'center'}} onPress={() => {
        setLeft(false)
      }}>
        <Text style={!left ? {fontSize: 18,  color: '#fff', fontWeight: 'bold'} : {fontSize: 18, fontWeight: 'bold'}}>Coupons Earned</Text>
      </TouchableOpacity>
    </View>
    {
      left ?
        <ScrollView style={styles.eventContainer} contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.eventHeader}>Upcoming Events</Text>
          <View style={styles.eventCard}>
        <View style={styles.eventCardHeader}>
          <Text style={styles.eventCardTitle}>Aggie House</Text>
          <Image source={require('../assets/shelter.png')} style={styles.pin}/>
        </View>

        <View style={styles.eventCardBody}>

          <View style={styles.eventCardRow}>
            <Icon name="calendar" size={20} color="#0A0A0A" />
            <Text style={styles.eventCardTextDate}>April 15, 2024</Text>
            <Icon name="clock-outline" size={20} color="#0A0A0A" />
            <Text style={styles.eventCardText}>10AM - 12PM</Text>
          </View>
          
          <Text style={styles.eventCardDescription}>
            Help prepare food for the residents of Aggie House!
          </Text>
        </View>

        <TouchableOpacity style={styles.eventButton}>
          <Text style={styles.eventButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.eventCard}>
        <View style={styles.eventCardHeader}>
          <Text style={styles.eventCardTitle}>Heart For Paws</Text>
          <Image source={require('../assets/animal.png')} style={styles.pin}/>
        </View>

        <View style={styles.eventCardBody}>

          <View style={styles.eventCardRow}>
            <Icon name="calendar" size={20} color="#0A0A0A" />
            <Text style={styles.eventCardTextDate}>April 18, 2024</Text>
            <Icon name="clock-outline" size={20} color="#0A0A0A" />
            <Text style={styles.eventCardText}>8AM - 10AM</Text>
          </View>
          
          <Text style={styles.eventCardDescription}>
          Take the dogs at Hearts For Paws on a walk!
          </Text>
        </View>

        <TouchableOpacity style={styles.eventButton}>
          <Text style={styles.eventButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      
      
        
        </ScrollView>
      :

      <ScrollView style={styles.couponContainer} contentContainerStyle={styles.scrollViewContent}>
  {/* IHOP Card */}
  <View style={styles.couponCard}>
    <View style={styles.cardLogoContainer}>
      <Image
        source={{uri: ihop}} // Replace with actual path to IHOP logo
        style={styles.cardLogo}
        resizeMode="contain"
      />
    </View>
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>IHOP</Text>
      <Text style={styles.cardSubtitle}>Free Short Stack of Pancakes</Text>
      <Text style={styles.cardDate}>Earned April 15, 2024</Text>
    </View>
    <Icon name="chevron-right" size={30} color="#C0C0C0" />
  </View>

  {/* Chipotle Card */}
  <View style={styles.couponCard}>
    <View style={styles.cardLogoContainer}>
      <Image
        source={{uri: Chipotle}} // Replace with actual path to Chipotle logo
        style={styles.cardLogo}
        resizeMode="contain"
      />
    </View>
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>Chipotle</Text>
      <Text style={styles.cardSubtitle}>25% off Entree</Text>
      <Text style={styles.cardDate}>Earned April 27, 2024</Text>
    </View>
    <Icon name="chevron-right" size={30} color="#C0C0C0" />
  </View>
</ScrollView>
    }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  eventHeader: {
    textAlign: 'left',
    marginTop: 16,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 'bold'
  },
  eventContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 2,
    elevation: 4,
    width: 350,
    height: 154,
    padding: 16,
  },
  eventCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
   
  },
  eventCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pin: {
    width: 34,
    height: 38.06,
  },
  eventCardBody: {
    marginBottom: 8,
  },
  eventCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventCardText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#0A0A0A',
  },
  eventCardTextDate: {
    marginLeft: 5,
    marginRight: 24,
    fontSize: 16,
    color: '#0A0A0A',
  },
  eventCardDescription: {
    fontSize: 12,
    color: '#666',
  },
  eventButton: {
    backgroundColor: '#68866B',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3.16,
  },
  eventButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  couponContainer: {
    padding: 10,
    backgroundColor: '#F9F9F9',
    
  },
  couponCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
    elevation: 4,
    width: 350,
    height: 100,
  },
  cardLogoContainer: {
    padding: 10,
  },
  cardLogo: {
    width: 63,
    height: 63,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
  },
  cardDate: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  coupons: {
    fontSize: 18,
  },
  
  volunteer: {
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: 'row',
    marginLeft: -20,
    marginTop: 100,
  },
  location: {
    flexDirection: 'row',
  },
  avatarContainer: {
    marginLeft: 40,
    backgroundColor: '#81A484',
    borderRadius: 6718.08,
    width: 86,
    height: 86,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinsContainer: {
    flexDirection: 'row',
    
    backgroundColor: '#CAE0CC',
    borderRadius: 1.65,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 87,
    height: 27,
  },
  pinsText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#68866B',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 32.25,
  },
  userInfo: {
    marginLeft: 23,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 27,
  },
  userLocation: {
    fontSize: 18,
    color: '#A3A3A3',
  },
  
})

export default Profile 