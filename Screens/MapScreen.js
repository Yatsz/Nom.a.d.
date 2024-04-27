import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function MapsScreen() {
  return (
    <MapView
      provider={PROVIDER_GOOGLE} // Specify Google Maps as the provider
      style={styles.map}
      initialRegion={{
        latitude: 38.5449,
        longitude: -121.7405,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    />
  );
}


const styles = StyleSheet.create({
  map: {
    flex: 1
  },
});