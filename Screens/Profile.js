import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { GluestackUIProvider, Button, ButtonText } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import UserAvatar from 'react-native-user-avatar';

const actions = [
  { name: "button 1", type: "b1" },
  { name: "button 2", type: "b2" },
];


export default function Profile() {
  const [contentType, setContentType] = React.useState("b1");

  const Content1 = () => <div> Content1 here </div>;
  const Content2 = () => <div> Content2 here </div>;
  return (
    <View style={styles.userInfoSection}>
        <View style={{marginLeft: 10}}>
        <UserAvatar style={[styles.title, {
              marginTop:100,
              width: 90,
              height: 90,
              borderRadius: 100,
              fontWeight: 'bold',
            }]} size={80} name="John Doe" bgColors={['#1D4ED8', '#fafafa', '#ccaabb']}/>
          </View>
        <View style={{marginLeft: 120}}>
            <Text style={[styles.title, {
              marginTop: -80,
              fontSize: 30,
              fontWeight: 'semibold',
            }]}>John Doe</Text>
          </View>
          <View style={{marginLeft: 140}}>
            <Text style={[styles.title, {
              marginTop: -50,
              fontSize: 15,
              color: '#A3A3A3',
            }]}>Davis, CA 95616</Text>
          </View>
          <div>
        {actions.map((action) => (
          <button
            key={action.type}
            style={{
              backgroundColor:
                action.type === contentType ? "lightblue" : "white",
            }}
            onClick={() => setContentType(action.type)}
          >
            {action.name}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        {contentType === "b1" && <Content1 />}
        {contentType === "b2" && <Content2 />}
      </div>
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
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 60,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});