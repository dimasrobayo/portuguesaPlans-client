import React from 'react';
import { Category } from '../../Domain/entities/Category';
import { CategoryProvider } from '../Context/CategoryContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity } from 'react-native';
import { AdminPlansListScreen } from '../Views/Admin/Plans/List/PlansList';
import { AdminPlansCreateScreen } from '../Views/Admin/Plans/create/PlansCreate';
import { AdminPlansUpdateScreen } from '../Views/Admin/Plans/update/PlansUpdate';
import { AdminProductNavigator } from './AdminProductNavigator';

export type PlansStackParamList = {
    AdminPlansListScreen: undefined,
    AdminPlansCreateScreen: undefined,
    AdminPlansUpdateScreen: { category: Category },
    AdminProductNavigator: { category: Category }
}

const Stack = createNativeStackNavigator<PlansStackParamList>();

export const AdminPlansNavigator = () => {
    return (
        <PlansState>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="AdminPlansListScreen"
                    component={AdminPlansListScreen}
                    options={ ({route, navigation}) => (
                        {
                            headerShown: true,
                            title: 'Planes',
                            headerLeft: () => (
                                <Image 
                                    source={ require('../../../assets/image/logo.png') }
                                    style={{ width:65, height: 35, marginRight: 10 }}
                                />
                            ),
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('AdminPlansCreateScreen')}>
                                    <Image 
                                        source={ require('../../../assets/image/add.png') }
                                        style={{ width:35, height: 35 }}
                                    />
                                </TouchableOpacity>
                            )
                            
                        }
                    )}
                />
                <Stack.Screen
                    name="AdminPlansCreateScreen"
                    component={AdminPlansCreateScreen}
                    options={{
                        headerShown: true,
                        title: 'Nueva categoria'
                    }}
                />
                <Stack.Screen
                    name="AdminPlansUpdateScreen"
                    component={AdminPlansUpdateScreen}
                    options={{
                        headerShown: true,
                        title: 'Editar categoria'
                    }}
                />
                <Stack.Screen
                    name="AdminProductNavigator"
                    component={AdminProductNavigator} 
                />
            </Stack.Navigator>
        </PlansState>
    )
}

const PlansState = ({children}: any) => {
    return (
        <CategoryProvider>
            { children }
        </CategoryProvider>
    )
}