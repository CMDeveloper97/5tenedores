import React, { useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { Divider } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-easy-toast';

import LoginForm from '../../components/Account/LoginForm';
import LoginFacebook from '../../components/Account/LoginFacebook';

export default function Login() {

    const toastRef = useRef();

    return (
        <ScrollView>
            <Image
                source={require('../../../assets/img/logo.png')}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <LoginForm  toastRef={toastRef}/>
                <CreateAccount/>
            </View>

            <Divider style={styles.divider} />
            <View style={styles.viewContainer}> 
                 <LoginFacebook/>
            </View>
            <Toast ref={toastRef} position="top" opacity={0.7} style={{marginTop:'80%'}}  />

        </ScrollView>
    )
}


function CreateAccount(){
    const navigation = useNavigation();

    return (
        <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?{" "}
            <Text 
             onPress={ () => { navigation.navigate('register') }}
            style={styles.btnRegister}>Registrate</Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo:{
        width:'100%',
        height:150,
        marginTop:20
    },
    viewContainer:{
        marginRight:40,
        marginLeft:40
    },
    textRegister:{
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        textAlign:'center'
    },
    btnRegister:{
        color:"#00a680",
        fontWeight:'bold'
    },
    divider:{
        backgroundColor:"#00a680",
        margin:40
    }
})
