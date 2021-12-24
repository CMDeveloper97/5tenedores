import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { FacebookApi } from "../../utils/social";


export default function LoginFacebook() {

    const login = async () => {
       await Facebook.initializeAsync(FacebookApi.application_id);
       
       const result = await Facebook.logInWithReadPermissionsAsync({
            permissions: FacebookApi.permissions
       }) 

       console.log(result);

    }

    return (
        <SocialIcon
            title="Iniciar sesión con Facebook"
            button
            type="facebook"
            onPress={login}
           />
    )
}

const styles = StyleSheet.create({})
