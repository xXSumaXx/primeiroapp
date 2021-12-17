import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Image, View, FlatList} from 'react-native';

export default function Storys(){
    const [stories, setStories] = useState([]);

    useEffect(function(){
        async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3000/stories');
            const storiesServidor = await response.json();
            setStories(storiesServidor)
        }
        getData();
    }, [])

    function renderItem({item}){
        return <View style={styles.story}>
            <Image style={styles.imgstory} source={{uri: item.imgPerfilUri}}/>
            <Text>{item.nomeUsuario}</Text>
        </View>
    }

    return(
        <View style={styles.stories}>
            <FlatList
                data = {stories}
                renderItem={renderItem}
                keysExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    stories:{
      flexDirection: 'row',
      height: 90,
      backgroundColor: '#00f',
    },
    story:{
      alignItems: 'center',
      height: 90,
      width: 90,
      backgroundColor: '#f0f',
    },
    imgstory:{
      height: 70,
      width: 70,
      borderRadius: 35,
    },
  });
  