import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase/config';

const AddChatScreen = ({ navigation }) => {
    const [inputText, setInputText] = useState("");
    const createChat = async () => {
        console.log(inputText)
        try {
            await db
            .collection("chats")
            .add({
                chatName: inputText
            })
            navigation.goBack();
        } catch (err) {
            console.log('err-from-add-chat',err)
            alert(err.message)
        }
        
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats"
        })
    }, [navigation])
    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter a chat name" 
                value={inputText} 
                onChangeText={setInputText}
                leftIcon={{ type:'font-awesome', name:'wechat', size:24 }}
                />
                <Button  disabled={!inputText} onPress={createChat} title="Create new Chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        padding: 30,
        height: "100%"        
    }
})
