import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { DeliveryOrderListScreen } from '../Views/delivery/Order/List/OrderList';
import { Image } from 'react-native';
import { OrderProvider } from '../Context/OrderContext';
import { DeliveryOrderDetailScreen } from '../Views/delivery/Order/detail/OrderDetail';
import { Order } from '../../Domain/entities/Order';
import { DeliveryOrderMapScreen } from '../Views/delivery/Order/map/OrderMap';

export type DeliveryOrderStackParamList = {
    DeliveryOrderListScreen: undefined,
    DeliveryOrderDetailScreen: {order: Order}
    DeliveryOrderMapScreen: {order: Order}
}

const Stack = createNativeStackNavigator<DeliveryOrderStackParamList>();

export const DeliveryOrderStackNavigator = () => {
    return (
        <OrderStatus>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="DeliveryOrderListScreen"
                    component={DeliveryOrderListScreen}
                    options={{
                        headerShown: true,
                        title: 'Ordenes',
                        headerLeft: () => (
                            <Image 
                                source={ require('../../../assets/image/logo.png') }
                                style={{ width:35, height: 35, marginRight: 10 }}
                            />
                        )
                    }}
                /> 
                <Stack.Screen
                    name="DeliveryOrderDetailScreen"
                    component={DeliveryOrderDetailScreen}
                    options={{
                    headerShown: true,
                    title: 'Detalle de la orden'
                    }}
                />

                <Stack.Screen
                    name="DeliveryOrderMapScreen"
                    component={DeliveryOrderMapScreen}
                />
            </Stack.Navigator>                                   
        </OrderStatus>
    )
}

const OrderStatus = ({children}: any) => {
    return (
        <OrderProvider>
            { children }
        </OrderProvider>
    )
}
