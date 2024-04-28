import React, { useState, useRef} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { DefaultTheme, Button} from 'react-native-paper';


const arrow = `
<svg width="27" height="8" viewBox="0 0 27 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.924175 0.292893C1.65641 -0.0976311 2.84359 -0.0976311 3.57583 0.292893L13.5 5.58579L23.4242 0.292893C24.1564 -0.0976311 25.3436 -0.0976311 26.0758 0.292893C26.8081 0.683417 26.8081 1.31658 26.0758 1.70711L14.8258 7.70711C14.0936 8.09763 12.9064 8.09763 12.1742 7.70711L0.924175 1.70711C0.191942 1.31658 0.191942 0.683417 0.924175 0.292893Z" fill="#D5D4D4"/>
</svg>
`;

const arrowUp = `<svg width="27" height="8" viewBox="0 0 27 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.7008 7.70711C24.9686 8.09763 23.7814 8.09763 23.0492 7.70711L13.125 2.41421L3.20082 7.70711C2.46859 8.09763 1.28141 8.09763 0.549175 7.70711C-0.18306 7.31658 -0.18306 6.68342 0.549175 6.29289L11.7992 0.292893C12.5314 -0.0976315 13.7186 -0.0976315 14.4508 0.292893L25.7008 6.29289C26.4331 6.68342 26.4331 7.31658 25.7008 7.70711Z" fill="#D5D4D4"/>
</svg>
`

const theme = {
    ...DefaultTheme,
    
    colors: {
      ...DefaultTheme.colors,
      primary: "#1D4ED8",
    },
  };

  const themeTwo = {
    ...DefaultTheme,
    
    colors: {
      ...DefaultTheme.colors,
      primary: "#16A34A",
    },
  };

const Card = ({ houseName, address, openHours, description, imageUrl }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const expandedHeight = 130; // Example height in pixels.

  const animationController = useRef(new Animated.Value(0)).current;

  const toggleExpansion = () => {
    Animated.timing(animationController, {
      toValue: isExpanded ? 0 : expandedHeight, // toggle between 0 and the height of the content
      duration: 300,
      useNativeDriver: false, // 'height' is not supported by the native animated module
    }).start();

    setIsExpanded(!isExpanded); // toggle the state
  };

  // Since we're animating height from 0 to expandedHeight, we don't need to interpolate
  const animatedStyle = {
    height: animationController, // directly use the animated value for height
  };
    return (
        <View style={[styles.cardContainer, isExpanded && styles.expandedContainer]}>
        <View style={styles.topCard}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{houseName}</Text>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.openHours}>{openHours}</Text>
            </View>
        </View>
        
        <Animated.View style={[styles.expandedContent, animatedStyle]}>
        {isExpanded && (
          <>
            <View style={styles.cardTwo}>
            <View style={styles.buttonContainer}>
              <Button
                icon="hand-heart"
                mode="contained"
                theme={theme}
                style={styles.volunteer}
                labelStyle={styles.volunteerLabel}
                onPress={() => console.log('Pressed volunteer')}>
                Volunteer
              </Button>
              <Button
                icon="gift" 
                mode="contained"
                theme={themeTwo}
                style={styles.donate}
                labelStyle={styles.donateLabel}
                onPress={() => console.log('Pressed donate')}>
                Donate
              </Button>
              </View>
                <Text style={styles.description}>{description}</Text>
                
            </View>
          </>
        )}
      </Animated.View>

      {/* Arrow SVG at the bottom */}
      <TouchableOpacity onPress={toggleExpansion} style={styles.arrowContainer}>
        <SvgXml xml={isExpanded ? arrowUp : arrow} width="24" height="24" />
      </TouchableOpacity>
    </View>
    );
  
}

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 4,
      shadowOpacity: 0.25,
      elevation: 3, 
      
      alignItems: 'center',
      marginVertical: 10, 
      width: 350,
      height: 185,
    },
    cardTwo: {
        marginTop: 20,
        flexDirection: 'row',
        width: 310,
        
    },
    donate: {
        marginTop: 8,
        borderRadius: 4,
        width: 128, 
        height: 40,
    },
    volunteer: {
        borderRadius: 4,
        width: 128, 
        height: 40,
    },
    donateLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    volunteerLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    expandedContainer: {
    backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 4,
      shadowOpacity: 0.25,
      elevation: 3, 
      
      alignItems: 'center',
      marginVertical: 10, 
      width: 350,
      height: 315,
        
      },
    arrowContainer: {
        marginTop: 8,
    },
    topCard: {
        flexDirection: 'row',
    },
    buttonContainer: {
        marginRight: 25,
    },
    imageContainer: {
      backgroundColor: '#F3F3F3',
      
      borderRadius: 5,
      width: 128,
      height: 128,
    },
    image: {
      width: 128, 
      height: 128,
      borderRadius: 5,
    },
    detailsContainer: {
      flex: 1,
      marginLeft: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    address: {
      fontSize: 12,
      color: 'black',
      marginTop: 4,
    },
    openHours: {
      fontSize: 12,
      color: '#16A34A', // dark gray
      marginTop: 4,
    },
    description: {
      fontSize: 14,
      color: 'gray',
      width: 156,
    },
    icon: {
        marginTop: 16,
        alignItem: 'center',
    }
    // Add more styles for other subcomponents if needed
  });


  

export default Card;
