import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity } from 'react-native';
import { AdminOrderListScreen } from '../Views/Admin/Order/List/OrderList';
import { AdminOrderDetailScreen } from '../Views/Admin/Order/detail/OrderDetail';
import { Order } from '../../Domain/entities/Order';
import { OrderProvider } from '../Context/OrderContext';

export type AdminOrderStackParamList = {
    AdminOrderListScreen: {isUpdate: boolean} | undefined,
    AdminOrderDetailScreen: { order: Order },
}

const Stack = createNativeStackNavigator<AdminOrderStackParamList>();

export const AdminOrderStackNavigator = () => {
    return (
        <OrderStatus>
            <Stack.Navigator 
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name="AdminOrderListScreen"
                    component={AdminOrderListScreen}
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
                    name="AdminOrderDetailScreen"
                    component={AdminOrderDetailScreen}
                    options={{
                        headerShown: true,
                        title: 'Detalles de la orden'
                    }}
                />
            </Stack.Navigator>
        </OrderStatus>
    )
}

const OrderStatus = ({children}: any) => {
    return (
      <OrderProvider>
        {children}
      </OrderProvider>
    )
  }