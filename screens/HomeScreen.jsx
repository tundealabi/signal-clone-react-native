import React, { useContext, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import CustomListItem from '../components/CustomListItem';
import { AppContext } from '../reducer/reducer';
import { auth, db } from '../firebase/config';
import { useState } from 'react';
import { useEffect } from 'react';


const HomeScreen = ({ navigation }) => {
    const { userData } = useContext(AppContext);
    const [ chats, setChats ] = useState([]);
    const enterChat = (id, chatName) => {
        navigation.navigate('ChatRoom',{
            id,
            chatName
        })
    }
    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe;
    },[])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
    headerStyle: {
        backgroundColor: "#fff"
    },
    headerTitleStyle: {
        color: "black"
    },
    headerTintColor: "black",
    headerLeft: () => (
        <TouchableOpacity activeOpacity={0.5} onPress={() => auth.signOut()}>
            <View style={{ marginLeft: 20 }} >
                <Avatar rounded source={{
                    uri: userData.photoURL || "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png"
                }} />
            </View>
        </TouchableOpacity>
    ),
    headerRight: () => (
        <View style={styles.headerRight}>
            <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name="camerao" size={24} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')} >
                <SimpleLineIcons name="pencil" size={24} />
        </TouchableOpacity>
        </View>
    )
        })
    }, [navigation])
   
   
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    chats.map(({ id, data:{ chatName } }) => (
                        <CustomListItem  key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 80,
        marginRight: 20
    }
})
