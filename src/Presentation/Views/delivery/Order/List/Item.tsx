import React from 'react'
import { Order } from '../../../../../Domain/entities/Order'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DateFormatter } from '../../../../utils/DateFormatter'
import { StackNavigationProp } from '@react-navigation/stack'
import { DeliveryOrderStackParamList } from '../../../../Navigator/DeliveryOrderStackNavigator'

interface Props {
    order: Order,
    navigation: StackNavigationProp<DeliveryOrderStackParamList, 'DeliveryOrderListScreen', undefined>
}

export const OrderListItem = ( {order, navigation}: Props ) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DeliveryOrderDetailScreen', {order: order})}
        >
            <View style={styles.container}>
                <Text style={styles.order}>Orden # {order.id}</Text>
                <Text style={{...styles.info, marginTop: 10}}>Fecha del Pedido: {DateFormatter(order.timestamp!)}</Text>
                <Text style={styles.info}>Cliente: {order.client?.name} {order.client?.lastname}</Text>
                <Text style={styles.info}>Entregar en: {order.address?.address}</Text>
                <Text style={styles.info}>Barrio: {order.address?.neighborhood}</Text>
                <View style={styles.divider}></View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    order: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
        marginTop: 10

    },
    info: {
        fontSize: 13
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor:'grey',
        marginTop: 10
    }
})
