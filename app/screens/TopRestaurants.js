import React, {useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { firebaseApp } from '../utils/firebase';
import firebase from "firebase/app";
import "firebase/firestore";

import Toast from "react-native-easy-toast";

import ListTopRestaurant from '../components/Ranking/ListTopRestaurant';

const db = firebase.firestore(firebaseApp);

export default function TopRestaurants(props) {
    const {navigation} = props;
    const [restaurants, setRestaurants] = useState([])
    const toastRef = useRef();

    useEffect(() => {
        db.collection("restaurants")
            .orderBy("ratingTotal", "desc")
            .limit(5)
            .get()
            .then(response => {
                const restaurantArray = [];
                response.forEach(doc =>{
                    const data = doc.data();
                    data.id = doc.id;
                    restaurantArray.push(data);
                });
                setRestaurants(restaurantArray);
            })
    }, [])

    return (
        <View>
            <ListTopRestaurant restaurants={restaurants} navigation={navigation}  />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </View>
    )
}



const styles = StyleSheet.create({
    containerCard: {
      marginBottom: 30,
      borderWidth: 0,
    },
    containerIcon: {
      position: "absolute",
      top: -30,
      left: -30,
      zIndex: 1,
    },
    restaurantImage: {
      width: "100%",
      height: 200,
    },
    titleRating: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    description: {
      color: "grey",
      marginTop: 0,
      textAlign: "justify",
    },
  });