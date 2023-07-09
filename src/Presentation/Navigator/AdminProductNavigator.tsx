import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminProductListScreen from '../Views/Admin/Product/List/ProductList';
import { AdminProductCreateScreen } from '../Views/Admin/Product/Create/ProductCreate';
import { Category } from '../../Domain/entities/Category';
import { PlansStackParamList } from './AdminPlansNavigator';
import { Image, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductProvider } from '../Context/ProductContext';
import { Product } from '../../Domain/entities/Product';
import { AdminProductUpdateScreen } from '../Views/Admin/Product/Update/ProductUpdate';

export type ProductStackParamList = {
    AdminProductListScreen: { category: Category },
    AdminProductCreateScreen: { category: Category }
    AdminProductUpdateScreen: { category: Category, product: Product }
}

const Stack = createNativeStackNavigator<ProductStackParamList>();
interface Props extends StackScreenProps<PlansStackParamList, 'AdminProductNavigator'>{};

export const AdminProductNavigator = ({navigation, route}: Props) => {
    return (
        <ProductState>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name='AdminProductListScreen'
                    component={AdminProductListScreen}
                    initialParams={{ category: route.params.category}}
                    options={ ({route, navigation}) => (
                        {
                            headerShown: true,
                            title: 'Proyectos',
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('AdminPlansListScreen')}>
                                    <Image 
                                        source={ require('../../../assets/image/logo.png') }
                                        style={{ width:65, height: 35, marginRight: 10 }}
                                    />
                                </TouchableOpacity>
                            )
                        }
                    )}
                />

                <Stack.Screen 
                    name='AdminProductCreateScreen'
                    component={AdminProductCreateScreen}
                    initialParams={{ category: route.params.category }}
                    options={{
                        title: 'Nuevo producto',
                        headerShown: true
                    }}
                />

                <Stack.Screen 
                    name='AdminProductUpdateScreen'
                    component={AdminProductUpdateScreen}
                    options={{
                        title: 'Actualizar producto',
                        headerShown: true
                    }}
                />
            </Stack.Navigator>
        </ProductState>
    )
}

const ProductState = ({children}: any) => {
    return (
        <ProductProvider>
            {children}
        </ProductProvider>
    )
  }