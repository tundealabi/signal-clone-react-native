import React, { useState ,useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image, Text } from "react-native-elements";
import { auth } from '../firebase/config';

const RegisterScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login"
        })
    
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                userCredential.user.updateProfile({
                    displayName: fullName,
                    photoURL: 
                        profilePictureUrl || 
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                })
            })
            .catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
            console.log('err-creating user with email',error);
          });
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <StatusBar style="light" />
           <Text h3 style={{ marginBottom: 50 }} >
               Create a Signal account
           </Text>
            <View style={styles.inputContainer} >
                <Input  placeholder="Full Name" textContentType="name" value={fullName} onChangeText={setFullName}/>
                <Input placeholder="Email" textContentType="emailAddress" value={email} onChangeText={setEmail} />
                <Input placeholder="Password" textContentType="password" value={password} secureTextEntry onChangeText={setPassword} />
                <Input 
                    placeholder="Profile Picture URL (optional)"
                    autoCapitalize="none"
                    value={profilePictureUrl}
                    onChangeText={setProfilePictureUrl}
                    onSubmitEditing={register}
                />
                </View>
                <Button title="Register" containerStyle={styles.button} raised onPress={register} />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen;

const styles = StyleSheet.create({ 
    container: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
         padding: 10,
         backgroundColor: 'white'
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
