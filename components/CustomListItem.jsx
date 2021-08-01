import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({ id, chatName, enterChat }) => {
    return (
        <ListItem
            onPress={() => enterChat(id, chatName)}
            bottomDivider
        >
           <Avatar 
                rounded
                source={{
                    uri: "https://img.favpng.com/7/5/4/computer-icons-online-chat-message-clip-art-png-favpng-f8V1a5q0Y06sQXNCB886TtGiv.jpg"
                }}
           />
           <ListItem.Content>
               <ListItem.Title style={{ fontWeight: '800' }} >
                   { chatName }
               </ListItem.Title>
               <ListItem.Subtitle numberOfLines={1} >
                   Enter Chat Room
               </ListItem.Subtitle>
           </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem;

const styles = StyleSheet.create({})
