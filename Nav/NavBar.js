import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapsScreen from '../Screens/MapScreen';
import Profile from '../Screens/Profile';
import ShelterList from '../Screens/ShelterList';
import pinIcon from "../assets/pinIcon.png"
import homeIcon from '../assets/homeIcon.png'
import profileIcon from '../assets/profileIcon.png'
import pinIconSelected from '../assets/pinIconSelected.png'
import homeIconSelected from '../assets/homeIconSelected.png'
import profileIconSelected from '../assets/profileIconSelected.png'

const Tab = createBottomTabNavigator();

export default function NavBar({route}) {

  const [email, setEmail] = useState(route.params.email)

  useEffect(() => {
    setEmail(route.params.email)
  }, [])

  return (
      <Tab.Navigator 
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: '#fff',
              height: 100,
              borderRadius: 25,
              borderTopColor: '#fff',
              ...styles.shadow
            }
          }}
      >
        <Tab.Screen name="Home" component={MapsScreen} initialParams={{ email }} options={{
          tabBarIcon: ({focused}) => (
            focused ? (
              <View>
                <Image source={pinIconSelected} style={{width: 35, height: 35}}/>
              </View>
            ) : (
              <View>
                <Image source={pinIcon} style={{width: 35, height: 35}}/>
              </View>
            )
          )
        }}/>
        <Tab.Screen name="Profile" component={ShelterList} options={{
          tabBarIcon: ({focused}) => (
            focused ? (
              <View>
                <Image source={homeIconSelected} style={{width: 30, height: 30}}/>
              </View>
            ) : (
              <View>
                <Image source={homeIcon} style={{width: 30, height: 30}}/>
              </View>
            )
          )
        }}/>
        <Tab.Screen name="Settings" component={Profile} initialParams={{ email }} options={{
          tabBarIcon: ({focused}) => (
            focused ? (
              <View>
                <Image source={profileIconSelected} style={{width: 30, height: 30}}/>
              </View>
            ) : (
              <View>
                <Image source={profileIcon} style={{width: 30, height: 30}}/>
              </View>
            )
          )
        }}/>
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});