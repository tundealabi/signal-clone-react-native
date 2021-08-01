import React, { useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image } from "react-native-elements";
import { auth } from '../firebase/config';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const logUserIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((err) => alert(err.message))
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <KeyboardAvoidingView behavior="padding" style={styles.container} >
                <StatusBar style="light" />
                <Image 
                    source={{
                    uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                }}
                    style={styles.signalImage}
                />
                <View style={styles.inputContainer} >
                    <Input placeholder="Email" textContentType="emailAddress" autoCapitalize="none" value={email} onChangeText={setEmail} />
                    <Input placeholder="Password" textContentType="password" value={password} secureTextEntry onChangeText={setPassword} />
                    </View>
                    <Button title="Login" containerStyle={styles.button} onPress={logUserIn} />
                    <Button 
                        title="Register" 
                        containerStyle={styles.button} 
                        type="outline" 
                        onPress={() => navigation.navigate('Register')}
                        />
                <View style={{ height: 100 }} />
            
            </KeyboardAvoidingView>
         </TouchableWithoutFeedback>
    )
}

export default LoginScreen

const styles = StyleSheet.create({ 
    container: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center'
    },
    signalImage: {
        width: 200,
        height: 200 
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
