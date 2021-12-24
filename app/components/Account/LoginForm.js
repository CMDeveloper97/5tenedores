import React,{ useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';

import { validateEmail } from '../../utils/validation';
import { isEmpty} from 'lodash';
import * as firebase from 'firebase';


export default function LoginForm(props) {

    const { toastRef } = props;

    const [showPasswword, setShowPassword] = useState(false);
    const [formData, setformData] = useState(defaultFormValues());
    const [loading, setloading] = useState(false)

    const navigation = useNavigation();

    const onChange = (e, type) =>{
        setformData({ ...formData, [type] :  e.nativeEvent.text });
    }


    const onSubmit = () =>{
       if( isEmpty(formData.email) || isEmpty(formData.password)  ){
            toastRef.current.show("Todos los campos son obligatorios");
       }else if(!validateEmail(formData.email)){
            toastRef.current.show("El email no tiene formato correcto.");
       }else{
           setloading(true);
           firebase.auth().signInWithEmailAndPassword(formData.email,formData.password)
           .then( response => {
                setloading(false);
               navigation.navigate('account');
            })
            .catch( err => {
                setloading(false);
                toastRef.current.show("Email o contraseña incorrectos.")
            })
       }
    }

    return (
        <View style={styles.formContainer}>
             <Input
                onChange={ e => onChange(e,'email') }
                placeholder="Correo electronico"
                keyboardType="email-address"
                containerStyle={styles.inputForm}
                rightIcon={<Icon type="material-community" name="at" iconStyle={styles.iconRight}/>}
                />
            <Input
                onChange={ e => onChange(e,'password') }
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                passwordRules={true}
                secureTextEntry={!showPasswword}
                rightIcon={
                <Icon
                    type="material-community"
                    name={showPasswword ? "eye-off-outline" : "eye-outline" }
                    iconStyle={styles.iconRight}
                    onPress={()=> setShowPassword(!showPasswword)}
                />
                }

            />
             <Button
                title="Unirse"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onSubmit}
            />

            <Loading isVisible={loading} text="Iniciando Sesión..." />
        </View>
    )
}

const defaultFormValues = () => {
    return {
        email:'',
        password:'',
    }
}

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginTop:30
    },
    inputForm:{
        width:"100%",
        marginTop:20
    },
    btnContainerLogin:{
        marginTop:20,
        width:'95%'
    },
    btnLogin:{
        backgroundColor:'#00a680'
    },
    iconRight:{
        color:"#c1c1c1",
        marginBottom:10
    }
})
