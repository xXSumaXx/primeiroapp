import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet, TextInput, TouchableOpacity, Text, View, Alert} from 'react-native';
import  AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    async function logar(){
        const headerOptions = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user,password})
        };
        const response = await fetch('https://mobile.ect.ufrn.br:3000/login', headerOptions);
        if(response.status === 200){
            const token = await response.text();
            await AsyncStorage.setItem('token', token);
            navigation.navigate('HomeScreen');
        }else{
            Alert.alert(
                'Erro',
                'Usuário ou senha inválidos',
            );
        }
    }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.loginContainer}>
        <TextInput 
            style={styles.input}
            placeholder="Usuário..." 
            value={user}
            onChangeText={setUser}/>
        <TextInput 
            style={styles.input} 
            placeholder="Senha..." 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry={true}/>
        <TouchableOpacity 
            style={styles.enviar} 
            onPress={()=>logar()}>
            <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f00',
    justifyContent: 'center',
  },
  loginContainer:{
    backgroundColor: 'yellow',
    justifyContent: 'center',
    margin: 20,
    padding: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#f9f6eb', 
    borderRadius: 10,
  },
  input:{
      height: 40,
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'gray',
      backgroundColor: 'white',
      paddingLeft: 10,
  },
  enviar:{
      padding: 10,
      width: 120,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      marginTop: 20,
      alignSelf: 'center',
  }
});
