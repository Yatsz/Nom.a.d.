import React, { useState, useRef, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SvgXml } from 'react-native-svg';
import Card from '../Components/Card';
import data from '../assets/data.json'
import dataTwo from '../assets/data2.json'


const picOne = "https://scontent.fsac1-2.fna.fbcdn.net/v/t39.30808-6/309312075_472241038281646_7174456296279349525_n.png?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=D9bOufGPtJoAb7vjJ_E&_nc_ht=scontent.fsac1-2.fna&oh=00_AfB_njCBtH5bbid7yc-vYg8x9MSe5QAZRckddKxYIHnsNw&oe=66337D00"


const Tab = createMaterialTopTabNavigator();

const homelessShelterIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.91666 17.5L11.6667 2.5" stroke="#737373" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.0833 17.5L8.33334 2.5" stroke="#737373" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.9167 17.5L10 12.5L7.08334 17.5" stroke="#737373" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.66666 17.5H18.3333" stroke="#737373" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const animalShelterIcon = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 7.66667C14.0833 7.08333 14.9083 7.66667 15.5833 7.66667C16.1359 7.66667 16.6658 7.44717 17.0565 7.05647C17.4472 6.66577 17.6667 6.13587 17.6667 5.58333C17.6667 5.0308 17.4472 4.50089 17.0565 4.11019C16.6658 3.71949 16.1359 3.5 15.5833 3.5C15.4728 3.5 15.3668 3.4561 15.2887 3.37796C15.2106 3.29982 15.1667 3.19384 15.1667 3.08333C15.1667 2.5308 14.9472 2.00089 14.5565 1.61019C14.1658 1.21949 13.6359 1 13.0833 1C12.5308 1 12.0009 1.21949 11.6102 1.61019C11.2195 2.00089 11 2.5308 11 3.08333C11 3.75833 11.5833 4.58333 11 5.16667L5.16667 11C4.58333 11.5833 3.75833 11 3.08333 11C2.5308 11 2.00089 11.2195 1.61019 11.6102C1.21949 12.0009 1 12.5308 1 13.0833C1 13.6359 1.21949 14.1658 1.61019 14.5565C2.00089 14.9472 2.5308 15.1667 3.08333 15.1667C3.31667 15.1667 3.5 15.35 3.5 15.5833C3.5 16.1359 3.71949 16.6658 4.11019 17.0565C4.50089 17.4472 5.0308 17.6667 5.58333 17.6667C6.13587 17.6667 6.66577 17.4472 7.05647 17.0565C7.44717 16.6658 7.66667 16.1359 7.66667 15.5833C7.66667 14.9083 7.08333 14.0833 7.66667 13.5L13.5 7.66667Z" stroke="#737373" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function HomelessSheltersScreen() {
  const renderItem = ({ item, index }) => {

    return (
      <AnimatedCard
        item={item}
        index={index}
      />
    )
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataTwo}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
}

const AnimatedCard = ({ item, index }) => {
  const position = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(position, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        delay: index * 100,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
        delay: index * 100,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.animatedContainer, { opacity, transform: [{ translateY: position }] }]}>
      

      <Card
        houseName={item.houseName}
        address={item.address}
        openHours={item.openHours}
        description={item.description}
        imageUrl={item.image}
        volunteerLink={item.volunteerLink}
        donateLink={item.donateLink}
      />
      
        
    </Animated.View>
    
  );
};

function AnimalSheltersScreen() {

  const renderItem = ({ item, index }) => {

    return (
      <AnimatedCard
        item={item}
        index={index}
      />
    )
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default function ShelterList() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
    <Tab.Navigator style={styles.navigator} 
    screenOptions={({ route }) => ({
      tabBarIndicatorStyle: {
        backgroundColor: '#81A484', // Blue color for the indicator
      },
      tabBarActiveTintColor: '#81A484', // Blue color when tab is active
      tabBarInactiveTintColor: '#737373', // Grey color when tab is inactive
      tabBarLabelStyle: { textTransform:'none' },
    })}
  >
    <Tab.Screen
      name="HomelessShelters"
      component={HomelessSheltersScreen}
      options={{
        title: 'Homeless Shelters',
        tabBarIcon: ({ focused, color, size }) => {
          // Replace `fill="#123456"` in your SVG XML with `fill="${color}"`
          const modifiedIcon = homelessShelterIcon.replace(/#737373/g, color);
        return <SvgXml xml={modifiedIcon} width={size} height={size} />;
        },
      }}
    />
    <Tab.Screen
      name="AnimalShelters"
      component={AnimalSheltersScreen}
      options={{
        title: 'Animal Shelters',
        tabBarIcon: ({ focused, color, size }) => {
           const modifiedIcon = animalShelterIcon.replace('#737373', color);
       return <SvgXml xml={modifiedIcon} width={size} height={size} />;
        },
      }}
    />
  </Tab.Navigator>
  </View>

  
    
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigator: {
    marginTop: 80,
  }
});