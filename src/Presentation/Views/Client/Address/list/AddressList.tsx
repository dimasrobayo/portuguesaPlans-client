import React, { useEffect } from 'react'
import styles from './Styles'
import useViewModel from './ViewModel'
import { FlatList, Text, ToastAndroid, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { UserStackParamList } from '../../../../Navigator/UserStackNavigator'
import { AddressListItem } from './Item'
import { RoundedButton } from '../../../../Components/RoundedButton'

interface Props extends StackScreenProps<UserStackParamList, 'ClientAddressListScreen'>{};

export const ClientAddressListScreen = ({navigation, route}: Props) => {
    const { checked, address, responseMessage, getAddress, changeRadioValue, createOrder } = useViewModel();

    useEffect(() => {
        if(responseMessage !== ''){
            ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
    }, [responseMessage])
    

    return (
        <View style={styles.container}>
            <FlatList 
                data={ address }
                keyExtractor={ (item) => item.id! }
                renderItem={ ({item}) =>
                    <AddressListItem 
                        address={ item } 
                        checked={ checked }
                        changeRadioValue={ changeRadioValue }
                    /> 
                }
            />

            <View style={styles.continueBTN  }>
                <RoundedButton text='CONTINUAR' onPress={ () => createOrder() } />
            </View>
        </View>
    )
}
