import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';

import { validateEmail } from '../../utils/validation';
import { size , isEmpty} from 'lodash';
import * as firebase from 'firebase';


export default function RegisterForm(props) {

    const { toastRef } = props;

    const [showPasswword, setShowPassword] = useState(false);
    const [showrepeatPasswword, setShowrepeatPasswword] = useState(false);
    const [formData, setformData] = useState(defaultFormValues());
    const [loading, setloading] = useState(false)

    const navigation = useNavigation();

    const onSubmit = () =>{
        if( isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)  ){
            toastRef.current.show("Todos los campos son obligatorios");
        } else if(!validateEmail(formData.email)){
            toastRef.current.show("El email no tiene formato correcto.");
        } else if(formData.password !== formData.repeatPassword){
            toastRef.current.show("Las contraseñas no son iguales.");
        } else if(size(formData.password) < 6){ 
            toastRef.current.show("La contraseña tiene que tener al menos 6 caracteres.");
        } else{
            setloading(true);
            firebase.auth().createUserWithEmailAndPassword(formData.email,formData.password)
                .then( response =>{
                    setloading(false);
                    navigation.navigate('account');
                })
                .catch( err => {
                    setloading(false);
                    if(err.message === 'The email address is already in use by another account.'){
                        return toastRef.current.show("El email ya se encuentra registrado.")
                    }
                    toastRef.current.show(err.message)
                })
        }

    }

    const onChange = (e, type) =>{
        setformData({ ...formData, [type] :  e.nativeEvent.text });
    }
    
    return (
        <View style={styles.formContainer}>
            <Input 
                onChange={ e => onChange(e,'email') }
                placeholder="Correo electronico"
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
             <Input 
              onChange={ e => onChange(e,'repeatPassword') }
                placeholder="Repetir contraseña"
                containerStyle={styles.inputForm}
                passwordRules={true}
                secureTextEntry={true}
                secureTextEntry={!showrepeatPasswword}
                rightIcon={
                <Icon 
                    type="material-community" 
                    name={showrepeatPasswword ? "eye-off-outline" : "eye-outline" }  
                    iconStyle={styles.iconRight}  
                    onPress={()=> setShowrepeatPasswword(!showrepeatPasswword)}  
                />
                }
                
            />
            <Button
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />

            <Loading isVisible={loading} text="Creando cuenta..." />

        </View>
    )
}

function defaultFormValues(){
    return {
        email:'',
        password:'',
        repeatPassword:''
    }
}

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,
        paddingBottom:100
    },
    inputForm:{
        width:"100%",
        marginTop:20
    },
    btnContainerRegister:{
        marginTop:20,
        width:"95%"
    },
    btnRegister:{
        backgroundColor:'#00a680'
    },
    iconRight:{
        color:"#c1c1c1",
        marginBottom:10
    }
})
