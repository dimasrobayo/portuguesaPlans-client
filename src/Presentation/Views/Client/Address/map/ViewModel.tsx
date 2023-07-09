import React, { useEffect, useRef, useState } from 'react'
import * as Location from 'expo-location';
import MapView, { Camera } from 'react-native-maps';
import { CreateAddressUseCase } from '../../../../../Domain/useCase/address/CreateAddress';

const ClientAddressMapViewModel = () => {
    const [location, setLocation] = useState<Location.LocationObjectCoords>();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const  mapRef = useRef<MapView | null>(null);
    const [refPoint, setRefPoint] = useState({
        name: '',
        latitude: 0.0,
        longitude: 0.0
    })

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permiso de ubicación denegado');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location?.coords);
            const newCamera: Camera = {
                center: { latitude: location.coords.latitude, longitude: location.coords.longitude },
                zoom: 18,
                heading: 0,
                pitch: 0,
                altitude: 0
            };
            mapRef.current?.animateCamera(newCamera, { duration: 2000})
        })();
    }, []);

    const onRegionChangeComplate = async(latitude: number, longitude: number) => {
        try {
            const place = await Location.reverseGeocodeAsync({
                latitude: latitude,
                longitude: longitude
            });

            let city;
            let street;
            let streetNumber;

            place.find(p => {
                city = p.city,
                street = p.street,
                streetNumber = p.streetNumber,
                setRefPoint({
                 name: `${street}, ${streetNumber}, ${city}`,
                 latitude: latitude,
                 longitude: longitude   
                });
            })
        } catch (error) {
            console.log('ERROR' + error);
        }
    }
    
    return {
        errorMsg, 
        location, 
        mapRef,
        ...refPoint,
        onRegionChangeComplate
    }
}

export default ClientAddressMapViewModel;