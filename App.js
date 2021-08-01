import 'react-native-gesture-handler';
import React, { useEffect, useContext, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { auth } from './firebase/config';
import HomeScreen from './screens/HomeScreen';
import { AppContext, initialState, reducer } from './reducer/reducer';
import AddChatScreen from './screens/AddChatScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {
    backgroundColor: '#2C6BED',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default function App() {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) dispatch({ type: 'AUTH_USER', payload: user.providerData[0] })
      else dispatch({ type: 'AUTH_USER', payload: null })
    })
    return unsubscribe
  }, [])
  return (
    <AppContext.Provider value={{ userData: state.user }} >
      <NavigationContainer>
        {
          state.user ?
          (
            <Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions} >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="AddChat" component={AddChatScreen} />
                <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
        </Stack.Navigator>
          ):(
            <Stack.Navigator initialRouteName="Login" screenOptions={globalScreenOptions} >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
          )
        }
      </NavigationContainer>
    </AppContext.Provider>
  );
}

