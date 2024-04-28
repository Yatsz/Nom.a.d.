import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { GluestackUIProvider, Button, ButtonText } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { TouchableOpacity } from 'react-native';
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth"
import {auth, db} from "../FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from 'react';
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import * as Location from "expo-location";


const svgIcon = `<svg width="95" height="89" viewBox="0 0 95 89" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M55.8429 1C39.1303 36.539 29.0139 56.4039 2.31365 85.0635C1.70311 85.7188 2.15761 86.8 3.0533 86.8H39.2041C39.5879 86.8 39.9393 86.5848 40.1138 86.2429L48.6929 69.4357" stroke="#81A484" stroke-width="3.06429"/>
<path d="M43.5857 1C57.665 37.056 67.6613 56.3551 93.1273 85.0836C93.7132 85.7445 93.2537 86.8 92.3704 86.8H57.2282C56.8274 86.8 56.4636 86.5656 56.298 86.2005L48.6929 69.4357" stroke="#81A484" stroke-width="3.06429"/>
</svg>`

const googleIcon =`<svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="15" cy="14.5" r="14.1902" fill="#FBFBFB"/>
<path d="M23.3745 12.7138H22.6982V12.679H15.1419V16.0373H19.8868C19.1946 17.9923 17.3345 19.3957 15.1419 19.3957C12.3599 19.3957 10.1044 17.1401 10.1044 14.3582C10.1044 11.5762 12.3599 9.32063 15.1419 9.32063C16.426 9.32063 17.5943 9.80508 18.4839 10.5964L20.8586 8.22161C19.3591 6.82412 17.3534 5.96228 15.1419 5.96228C10.5053 5.96228 6.746 9.72154 6.746 14.3582C6.746 18.9948 10.5053 22.754 15.1419 22.754C19.7785 22.754 23.5378 18.9948 23.5378 14.3582C23.5378 13.7952 23.4798 13.2457 23.3745 12.7138Z" fill="#FFC107"/>
<path d="M7.71404 10.4503L10.4725 12.4733C11.2189 10.6254 13.0265 9.32063 15.1419 9.32063C16.426 9.32063 17.5943 9.80508 18.4839 10.5964L20.8586 8.22161C19.3591 6.82412 17.3533 5.96228 15.1419 5.96228C11.917 5.96228 9.12035 7.78293 7.71404 10.4503Z" fill="#FF3D00"/>
<path d="M15.1419 22.754C17.3105 22.754 19.281 21.924 20.7709 20.5744L18.1724 18.3755C17.3011 19.0381 16.2365 19.3965 15.1419 19.3956C12.9581 19.3956 11.1039 18.0032 10.4053 16.0599L7.66743 18.1694C9.05695 20.8884 11.8788 22.754 15.1419 22.754Z" fill="#4CAF50"/>
<path d="M23.3745 12.7138H22.6982V12.679H15.1419V16.0373H19.8868C19.5557 16.9677 18.9592 17.7808 18.1711 18.376L18.1724 18.3751L20.7709 20.574C20.587 20.7411 23.5378 18.5561 23.5378 14.3581C23.5378 13.7952 23.4798 13.2457 23.3745 12.7138Z" fill="#1976D2"/>
</svg>
`


WebBrowser.maybeCompleteAuthSession();

export default function Login({navigation}) {

  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '105772593651-2tepdb024f148gc01ru6ssuhrcanhj5r.apps.googleusercontent.com',
    redirectUri: 'com.googleusercontent.apps.105772593651-2tepdb024f148gc01ru6ssuhrcanhj5r:/oauth2redirect',
  });

  useEffect(() => {
    if(response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
    }
  }, [response])

  const addUser = async(userEmail) => {
    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        await setDoc(doc(db, "users", userEmail), {
          email: userEmail,
          pins: 0
        })
    } 
    
  }



  const finder = async() => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    
    if(status == 'granted') {
        console.log("perms")
    }

    const loc = await Location.getCurrentPositionAsync();
    console.log(loc)
    let reg = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }
    return reg;
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async(user) => {
      if(user) {
        await addUser(user.email);
        let reg = await finder();
        console.log(reg)
        navigation.navigate('Tabs', {email: user.email, name: user.displayName, region: reg})
      } else {
        console.log("not logged in");
      }

      return () => unSub();
    })
  }, [])

  
        
    

  return (
      <View style={styles.container}>
        <SvgXml xml={svgIcon} width="132.5" height="120.98" style={styles.icon} />
        <Text style={styles.text}>nomad</Text>
        <Text style={styles.small}>no more are displaced</Text>
        <TouchableOpacity onPress={async() => {
          await promptAsync()
        }} style={styles.button}>
          <SvgXml xml={googleIcon} width="28.38" height="28.38" style={styles.google} />
          <Text style={styles.textTwo}>Login with Google</Text>
        </TouchableOpacity>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32, 
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    backgroundColor: '#fff',
  },
  icon: {
    marginTop: 184,
    alignItems: 'center',
    color: '1E3A8A'
  },
  text: {
    alignItems: 'center',
    fontSize: 52,
    color: '#506C53'
  },
  small: {
    alignItems: 'center',
    fontSize: 18,
    color: '#81A484',
  },
  button: {
    alignItems: 'center',
    marginTop: 65,
    backgroundColor: '#1A91FF',
    width: 312,
    height: 61,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }, google: {
    marginRight: 16,
  }, textTwo: {
    color: "#FEFEFF",
    fontSize: 20,
    fontWeight: 'bold',
  },

});