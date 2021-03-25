import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, StyleSheet, Image, View, Dimensions } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import ListNoteScreen from './src/screens/ListNoteScreen';
import NodeDetails from './src/screens/NodeDetails';
import NoteProvider from './src/contexts/NoteProvider';
import colors from './src/mics/colors';

const Stack = createStackNavigator();

export default function App() {
  const [greet, setGreet] = useState('');
  const [ user, setUser] = useState({});

  const findUser = async () => {
    const result = await AsyncStorage.getItem('user')
    if (result !== null) {
      setUser(JSON.parse(result))
    }
  };

  const findGreet = () => {
    const hrs = new Date().getHours()
    if (hrs === 0 || hrs < 12) return setGreet('buổi sáng');
    if (hrs === 1 || hrs < 17) return setGreet('buổi chiều');
    setGreet('buổi tối')
};

  useEffect(() => {
    findUser();
    findGreet();
  },[]);

  function SplashScreen({navigation}) {
    setTimeout(() => {
      navigation.replace('ListNoteScreen')
    }, 2200);
    return (
      <View style={styles.container}>
        <Image style={{marginTop: 180}} source={require('./assets/IconName.png')}></Image>
        <Text style={styles.green}>{`Chào ${greet}`} 
          <Text style={styles.greenName}>{` ${user.name}`}</Text>
        </Text>
      </View>
    )
  }

  const renderNoteScreen = (props) => <ListNoteScreen {...props} user = {user} />
  
  if (!user.name) return <HomeScreen onFinish={findUser}/>
  
  return (
    <NoteProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerTitle: '', headerTransparent: true}}>
          <Stack.Screen component={renderNoteScreen} name="ListNoteScreen"/>
          <Stack.Screen component={NodeDetails} name="NodeDetails"/>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NoteProvider>
  );
}

const { width } = Dimensions.get('window') ;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  green: {
    fontSize: 22,
    opacity: 0.6,
    textTransform: 'lowercase',
    color: colors.BLUELIGHT
  },
  greenName: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 25
  }
});
