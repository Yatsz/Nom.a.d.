import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from '../Pages/Map';
import NewPin from '../Pages/NewPin';
import { useEffect, useState } from 'react';



const Stack = createStackNavigator();

export default function MapsScreen({route}) {

  const [email, setEmail] = useState(route.params.email)

  useEffect(() => {
    setEmail(route.params.email)
  }, [])

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Map" initialParams={{email}} component={Map} />
      <Stack.Screen name="NewPin" component={NewPin} />
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  map: {
    flex: 1
  },
});