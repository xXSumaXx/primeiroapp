import React, { useEffect, useState } from "react";
import {StatusBar} from 'expo-status-bar';
import { StyleSheet, View, Text, Image} from "react-native";
import {FontAwesome5} from '@expo/vector-icons';

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
                <Text style={styles.titulo1}>{email.tittle}</Text>
                <View>
                    <FontAwesome5 style={email.star? styles.favorito1 : styles.favorito} name="star" size={16}/>
                </View>
            </View>
            <View style={styles.info}>
                <Image style={styles.image} source={{uri: email.picture}}/>
                <View style={styles.info1}>
                    <Text style={styles.titulo1}>{email.from}, {email.time}</Text>
                    <Text style={styles.titulo1}>{email.to}</Text>
                </View>
            </View>
            <View style={styles.corpo}>
                <Text style={styles.corpo1}>{email.body}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'green',
    },
    titulo:{
        flexDirection: 'row',
        width:'100%',
        height:150,
        backgroundColor: '#4F4F4F',
    },
    titulo1:{
        fontSize:27,
        padding: 5,
    },
    info:{
        flexDirection:'row',
        alignItems: 'center',
        height:100,
        backgroundColor: 'gray',
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