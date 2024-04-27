import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';


const svgIcon = `<svg width="95" height="89" viewBox="0 0 95 89" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M55.8429 1C39.1303 36.539 29.0139 56.4039 2.31365 85.0635C1.70311 85.7188 2.15761 86.8 3.0533 86.8H39.2041C39.5879 86.8 39.9393 86.5848 40.1138 86.2429L48.6929 69.4357" stroke="#1E3A8A" stroke-width="3.06429"/>
<path d="M43.5857 1C57.665 37.056 67.6613 56.3551 93.1273 85.0836C93.7132 85.7445 93.2537 86.8 92.3704 86.8H57.2282C56.8274 86.8 56.4636 86.5656 56.298 86.2005L48.6929 69.4357" stroke="#1E3A8A" stroke-width="3.06429"/>
</svg>`

export default function Login() {
  return (
    <View style={styles.container}>
      <SvgXml xml={svgIcon} width="93.97" height="85.8" style={styles.icon} />
      <Text style={styles.text}>nom.a.d.</Text>
      <Text style={styles.small}>no more are displaced</Text>
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
    alightItems: 'center',
    fontSize: 52,
    color: '#1E3A8A'
  },
  small: {
    alignItems: 'center',
    fontSize: 18,
    color: '#1E3A8A',
  },
});