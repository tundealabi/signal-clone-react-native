import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import firebase from 'firebase/app'
import { auth, db } from '../firebase/config'
import { useEffect } from 'react'

const ChatRoomScreen = ({ navigation, route }) => {
    const [ chatInput, setChatInput ] = useState("");
    const [ messages, setMessages ] = useState([]);
    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection(`chats/${route.params.id}/messages`).add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: chatInput,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setChatInput("");
    };
    useEffect(() => {
        const unsubscribe = db
            .collection(`chats/${route.params.id}/messages`)
            .orderBy("timestamp","desc")
            .onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ))
        return unsubscribe;
    }, [ route ])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={styles.headerTitle} >
                    <Avatar 
                        rounded
                        source={{
                            uri: messages[0]?.data.photoURL
                        }}
                    />
                    <Text style={styles.headerTitleText} >{ route.params.chatName  }</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.headerLeftIcon}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="phone" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        })
    },[ navigation, messages ])
    return (
        <SafeAreaView style={styles.container} >
            <StatusBar style="light" />
            <KeyboardAvoidingView 
                behavior="padding"
                keyboardVerticalOffset={90}
                style={styles.chatContainer} >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }} >
                            {/* chat goes here */}
                            {
                                messages.map(({ id, data }) => (
                                    data.email === auth.currentUser.email ? (
                                        <View key={id} style={styles.sender} >
                                            <Avatar 
                                                containerStyle={styles.senderAvatar}
                                                rounded
                                                source={{
                                                    uri: data.photoURL
                                                }}
                                            />
                                            <Text style={styles.senderText}>{ data.message }</Text>
                                        </View>
                                    ):(
                                        <View key={id} style={styles.receiver}>
                                            <Avatar 
                                                containerStyle={styles.receiverAvatar}
                                                rounded
                                                size={30}
                                                source={{
                                                    uri: data.photoURL
                                                }}
                                            />
                                            <Text style={styles.receiverText} >{ data.message }</Text>
                                            <Text style={styles.receiverName} >{ data.displayName }</Text>
                                        </View>
                                    )
                                ))
                            }
                        </ScrollView>
                        <View style={styles.chatInputContainer} >
                                <TextInput 
                                    placeholder="Signal Message" 
                                    style={styles.chatInput} 
                                    value={chatInput}
                                    onChangeText={setChatInput}
                                    onSubmitEditing={sendMessage}
                                    />
                                <TouchableOpacity activeOpacity={0.5} onPress={sendMessage} disabled={!Boolean(chatInput.trim().length)} >
                                    <Ionicons name="send" size={24} color="#2B68E6"/>
                                </TouchableOpacity>
                        </View>
                        </>
                        </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatRoomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitle: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerTitleText: {
        color: "white",
        marginLeft: 10,
        fontWeight: "700"
    },
    headerLeftIcon: {
        marginLeft: 10
    },
    headerRight: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 70,
        marginRight: 20
    },
    chatContainer: {
        flex: 1,
    },
    chatInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    chatInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    },
    sender: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    receiver: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },
    senderAvatar: {
        position: "absolute",
        bottom: -15,
        right: -5
    },
    receiverAvatar: {
        position: "absolute",
        bottom: -15,
        left: -5
    },
    receiverName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },
    receiverText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    senderText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10
    }
})
