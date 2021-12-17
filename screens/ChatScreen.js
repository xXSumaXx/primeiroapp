import React, { useEffect, useState, Component } from "react";
import {StatusBar} from 'expo-status-bar';
import { StyleSheet, View, Text, Image} from "react-native";
import {FontAwesome5} from '@expo/vector-icons';
import { WebView } from 'react-native-webview';


export default function ChatScreen({route}){
    const {id} = route.params;
    
    const [email, setEmail] = useState([]);

    useEffect(()=>{
        async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails/'+id);
            const email = await response.json();
            setEmail(email);
            console.log(email);
        }
        getData();
    },[]);
    
    return(
        <View style={styles.container}>
            <StatusBar style='auto'/>
            <View style={styles.titulo}>
                <View style={styles.titulo1}>
                    <Text style={styles.titulo1}>{email.tittle}</Text>
                </View>
                <View style={styles.titulo2}>
                    <FontAwesome5 style={email.star? styles.favorito1 : styles.favorito} name="star" size={16}/>
                </View>
            </View>
            <View style={styles.info}>
                <Image style={styles.image} source={{uri: email.picture}}/>
                <View style={styles.info1}>
                    <Text style={styles.info1}>{email.from}, {email.time}</Text>
                    <Text style={styles.info1}>{email.to}</Text>
                </View>
            </View>
            <WebView 
                style={styles.corpo}
                originWhitelist={['*']}
                source={{ html: email.body}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'green',
    },
    titulo:{
        flexDirection: 'row',
        height:150,
        backgroundColor: '#4F4F4F',
    },
    titulo1:{
        flex: 1,
        fontSize:27,
        padding: 5,
    },
    titulo2:{
        justifyContent:'center',
        padding: 5,
    },
    info:{
        flexDirection:'row',
        alignItems: 'center',
        height:100,
        backgroundColor: 'gray',
    },
    info1:{
        fontSize:27,
        padding: 5,
    },
    corpo:{
        flex:1,
        backgroundColor: '#fff',
    },
    corpo1:{
        color:'black',
        fontSize:20,
        padding: 5,
    },
    favorito:{
        justifyContent:'center',
        alignItems:'flex-end',
        color:"black",
    },
    favorito1:{
        justifyContent:'center',
        alignItems:'flex-end',
        color:"blue",
    },
    image:{
        height:60,
        width:60,
        margin:5,
        borderRadius:25,
    },
});