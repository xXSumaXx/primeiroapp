import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import atividade from './screens/atividade';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import ChatlistScreen from './screens/ChatlistScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="atividade" component={atividade} options={{title: 'E-mails'}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ChatlistScreen" component={ChatlistScreen} options={{title: 'Chat List'}}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{title: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}