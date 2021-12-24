import React, { useState, useEffect, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { map } from "lodash";
import { ListItem, Rating, Icon } from 'react-native-elements';
import Toast from 'react-native-easy-toast';

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import "firebase/firestore";


import Loading from '../../components/Loading';
import Carousel from '../../components/Carousel';
import Map from '../../components/Map';
import ListReviews from '../../components/Restaurants/ListReviews';

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get('window').width;

export default function Restaurant(props) {
    const {navigation, route} = props;
    const {id, name} = route.params;
    const [restaurant, setRestaurant] = useState(null);
    const [rating, setRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [userLogged, setUserLogged] = useState(false);

    const toastRef = useRef()

    navigation.setOptions({ title: name });

    firebase.auth().onAuthStateChanged((user=>{
        user ? setUserLogged(true) : setUserLogged(false);
    }));

    //useEffect(() => {
        // db.collection("restaurants").doc(id)
        //     .onSnapshot(function(doc) {
        //         const data = doc.data();
        //         data.id = doc.id;
        //         setRestaurant(data);
        //         setRating(data.rating);
        //     });
  //  }, [])

  useFocusEffect(
    useCallback(() => {
      db.collection("restaurants")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data();
          data.id = response.id;
          setRestaurant(data);
          setRating(data.rating);
        });
    }, [])
  );

  useEffect(() => {
    if(userLogged && restaurant){
        db.collection("favorites")
            .where("idRestaurant","==", restaurant.id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get()
            .then((response)=>{
                if(response.docs.length === 1){
                    setIsFavorite(true);
                }
            })
    }
  }, [userLogged, restaurant])

  const addFavorite = () => {
        if(!userLogged){
            toastRef.current.show("Para usar el sistema de favoritos, inicia sesión")
        }else{
            setIsFavorite(true);
            const payload = {
                idUser: firebase.auth().currentUser.uid,
                idRestaurant: restaurant.id
            }
            db.collection("favorites")
                .add(payload)
                .then(()=>{
                    toastRef.current.show("Restaurante añado a favoritos.")
                })
                .catch(()=>{
                    setIsFavorite(false);
                    toastRef.current.show("Error al añadir el restaurante a favoritos.")
                })
        }
  }

  const removeFavorite = () => {
    setIsFavorite(false);
    db.collection('favorites')
        .where("idRestaurant","==", restaurant.id)
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then(response => {
            response.forEach(doc => {
                 const idFavorite = doc.id;

                 db.collection("favorites")
                 .doc(idFavorite)
                 .delete()
                 .then(()=>{
                    toastRef.current.show("Restaurante eliminado de favoritos.")
                 })
                 .catch(()=>{
                    setIsFavorite(true);
                    toastRef.current.show("Error al eliminar el restaurante a favoritos.")
                 })

            });
        })
  }

    if(!restaurant) return <Loading isVisible={true} text="Cargando..." />

    return (
        <ScrollView vertical style={styles.viewBody}>
            <View style={styles.viewFavorites}>
                <Icon
                    type='material-community'
                    name={isFavorite ? 'heart' : "heart-outline"}
                    color={isFavorite ? "#f00" : "#000"}
                    size={35}
                    underlayColor="transparent"
                    onPress={ isFavorite ? removeFavorite : addFavorite }
                />
            </View>
            <Carousel
                arrayImages={restaurant.images}
                height={250}
                width={screenWidth}
            />
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={rating}
            />
            <RestaurantInfo
                location={restaurant.location}
                name={restaurant.name}
                address={restaurant.address}
            />
            <ListReviews
                navigation={navigation}
                idRestaurant={restaurant.id}
            />
            <Toast ref={toastRef} position='center' opacity={0.9}/>
        </ScrollView>
    )
}


function TitleRestaurant(props){
    const { name, description, rating } = props;

    return(
        <View style={styles.viewRestaurantsTitle} >
            <View style={{flexDirection:'row'}}>
                <Text style={styles.nameRestaurant} >{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
                <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
    )

}

function RestaurantInfo(props){
    const {location, name, address} = props;

    const listInfo = [
        {
        text: address,
        iconName: "map-marker",
        iconType: "material-community",
        action:null
         },
         {
        text: '656-225-54',
        iconName: "phone",
        iconType: "material-community",
        action:null
        }
    ];


    return (
        <View style={styles.viewRestaurantsInfo}>
            <Text style={styles.viewRestaurantsInfoTitle}>Información sobre el restaurante.</Text>

            <Map
                location={location}
                name={name}
                height={150}
            />

            {map(listInfo, (item, index) => (
                <ListItem
                    key={index}
                    title={item.text}
                    leftIcon={{
                        name: item.iconName,
                        type: item.iconType,
                        color: "#00a680"
                    }}
                    containerStyle={styles.containerListItem}
                />
            ))}

        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:'#fff'
    },
    viewRestaurantsTitle:{
        padding: 15
    },
    nameRestaurant:{
        fontSize:20,
        fontWeight:'bold'
    },
    descriptionRestaurant:{
        marginTop:5,
        color:'gray'
    },
    rating:{
        position:'absolute',
        right:0
    },
    viewRestaurantsInfo:{
        margin:15,
        marginTop:25
    },
    viewRestaurantsInfoTitle:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10
    },
    containerListItem:{
        borderBottomColor:'#d8d8d8',
        borderBottomWidth:1
    },
    viewFavorites:{
        position:'absolute',
        top:0,
        right:0,
        zIndex:2,
        backgroundColor:'white',
        borderBottomLeftRadius:100,
        padding:8,
        paddingLeft:20
    }
})
