import React from 'react';
import { Platform } from 'react-native';
import MapView from "react-native-maps";
import openMap from "react-native-open-maps";


export default function Map(props) {

    const { location, name, height } = props;


    const openAppMap = () => {
        openMap({
            provider: Platform.OS === 'ios' ? 'apple' : 'google'  ,
            latitude: location.latitude,
            longitude: location.longitude,
            travelType:'drive',
            zoom:18,
            start:'Ciudad Juarez',
            end:'CU' ,
            navigate_mode:'navigate',
            query:name
        })
        console.log();
    }

    return (
        <MapView
            onPress={openAppMap}
            style={{height:height, width:"100%"}}
            initialRegion={location}>


        <MapView.Marker
            coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
            }}
        />

        </MapView>
    );
}
