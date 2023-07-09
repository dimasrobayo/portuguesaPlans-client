import React, { useEffect } from 'react'
import styles from './Styles'
import stylesMap from './StylesMap';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Image, Text, ToastAndroid, View } from 'react-native'
import { UserStackParamList } from '../../../../Navigator/UserStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import useViewModel from './ViewModel'
import { RoundedButton } from '../../../../Components/RoundedButton'

interface Props extends StackScreenProps<UserStackParamList, 'ClientAddressMapScreen'>{};

export const ClientAddressMapScreen = ({navigation, route}: Props) => {
    const {errorMsg, location, mapRef, name, latitude, longitude, onRegionChangeComplate} = useViewModel();

    useEffect(() => {
        if(errorMsg != '') {
            ToastAndroid.show(errorMsg, ToastAndroid.LONG)
        }
    }, [errorMsg])
    
    return (
        <View style={styles.container}>
            <MapView 
                ref={ mapRef }
                customMapStyle={ stylesMap }
                style={styles.map} 
                provider={PROVIDER_GOOGLE}
                onRegionChangeComplete={(region) => {
                    onRegionChangeComplate(region.latitude, region.longitude)
                }}
            />

            <Image 
                style={styles.imageLocation}
                source={require('../../../../../../assets/image/location_home.png')}
            />
            
            <View style={styles.refPoint}>
                <Text style={styles.refPointText}>{name ? name : 'Ubicando Posición'}</Text>
            </View>

            <View style={styles.buttonRefPoint}>
                <RoundedButton 
                    text='SELECCIONAR PUNTO'
                    onPress={() => {
                        navigation.navigate({
                            name: 'ClientAddressCreateScreen',
                            merge: true,
                            params: { refPoint: name, latitude: latitude, longitude: longitude }
                        })
                    }}
                />
            </View>
        </View>
    )
}
