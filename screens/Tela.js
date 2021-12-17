import React, {useEffect, useState} from "react";
import {StatusBar} from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";

export default function ChatScreen({route}){
    const {id} = route.params;

    const [chat, setChat] = useState([]);

    useEffect(()=>{
        async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails/'+id);
            const chat = await response.json();
            setChat(chat);
        }
        getData();
    },[]);

    function renderItem({item}){
        return <View style={item.autor? styles.mensagemAutor : styles.mensagem}>
            <Text>{item.texto}</Text>
        </View>
    }

    return(
        <View style={styles.container}>
            <StatusBar style='auto'/>
            <View style={styles.containerChat}>
                <FlatList
                    data={chat.mensagens}
                    renderItem={renderItem}
                    keyExtractor={item=>item.id}
                    showsVerticalScrollindicator={false}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}></TextInput>
                <TouchableOpacity style={styles.enviar}><Text>Enviar</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 5,
    },
    containerChat:{
        flex: 1,
        
    },
    inputContainer:{
        flexDirection: 'row',
        height: 50,
    },
    mensagem:{
        height: 30,
        backgroundColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
        padding: 5,
        alignSelf: 'flex-start'
    },
    mensagemAutor:{
        height: 30,
        backgroundColor: 'purple',
        borderRadius: 5,
        justifyContent: 'center',
        padding: 5,
        alignSelf: 'flex-end'
    },
    input:{
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        margin: 5,
    },
    enviar:{
        width: 60,
        justifyContent: 'center',
        alignItems: 'center', 
    }
});