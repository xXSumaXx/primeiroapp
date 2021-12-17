import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import {FontAwesome5} from '@expo/vector-icons';

export default function ChatlistScreen({navigation}){
    const [atividade, setAtividade] = useState([]);

    useEffect(()=>{
        async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails')
            const atividade = await response.json();
            setAtividade(atividade);
        }
        getData();
    },[]);

    function renderItem({item}){
        return (
            <TouchableOpacity style={styles.chat} onPress={()=> navigation.navigate('ChatScreen', {id: item.id})}>
            <Image style={styles.image} source={{uri: item.picture}}/>
            <View style={styles.box}>
                <View style={styles.box1}>
                    <Text style={styles.destinatarios}>{item.to}</Text>
                    <Text style={styles.destinatarios}>{item.tittle}</Text>
                    <Text style={styles.destinatarios}>{item.summary}</Text>
                </View>
                <View>
                    <Text style={styles.horario}> <FontAwesome5 name="paperclip" size={16} color="black"/>{item.time}</Text>
                    <FontAwesome5 style={item.star? styles.favorito1 : styles.favorito} name="star" size={16}/>
                </View>
            </View>
        </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <FlatList
                data={atividade}
                renderItem={renderItem}
                keyExtractor={item=>item.id}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        
    },
    chat:{
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    image:{
        height:50,
        width:50,
        margin:5,
        borderRadius:25,
    },
    box:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    box1:{
        
    },
    destinatarios:{
        fontWeight: 'bold',
        
    },
    horario:{
        
        
    },
    favorito:{
        color:"black",
    },
    favorito1:{
        color:"blue",
    },
});