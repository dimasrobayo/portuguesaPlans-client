import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from '../Views/Client/Category/List/CategoryList';
import { Image, TouchableOpacity } from "react-native";
import { ClientProductListScreen } from "../Views/Client/Product/List/ProductList";
import { ClientProductDetailScreen } from '../Views/Client/Product/Detail/ProductDetail';
import { Product } from "../../Domain/entities/Product";
import { ShoppingBagProvider } from "../Context/ShoppingBagContext";
import { ClientShoppingBagScreen } from "../Views/Client/shopping_bag/ShoppingBag";
import { ClientAddressListScreen } from "../Views/Client/Address/list/AddressList";
import { ClientAddressCreateScreen } from "../Views/Client/Address/create/AddressCreate";
import { ClientAddressMapScreen } from "../Views/Client/Address/map/AddressMap";

export type UserStackParamList = {
  ClientCategoryListScreen: undefined,
  ClientProductListScreen: {idCategory: string},
  ClientProductDetailScreen: {product: Product},
  ClientShoppingBagScreen: undefined,
  ClientAddressListScreen: undefined,
  ClientAddressCreateScreen: {refPoint: string, latitude: number, longitude: number} | undefined,
  ClientAddressMapScreen: undefined
}

const Stack = createNativeStackNavigator<UserStackParamList>();

export const UserStackNavigator = () => {
    return (
      <ShoppingBagState>
        <Stack.Navigator screenOptions = {{ headerShown: false }}>
          <Stack.Screen
            name='ClientCategoryListScreen'
            component={ClientCategoryListScreen}
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
                  <TouchableOpacity onPress={() => navigation.navigate('ClientShoppingBagScreen')}>
                    <Image 
                      source={ require('../../../assets/image/shopping_cart.png') }
                      style={{ width:30, height: 30 }}
                    />
                  </TouchableOpacity>
                )
              }
            )}
          />

          <Stack.Screen 
            name='ClientProductListScreen'
            component={ ClientProductListScreen }
            options={ ({route, navigation}) => (
              {
                headerShown:true,
                title: 'Productos',
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('ClientShoppingBagScreen')}>
                    <Image 
                      source={ require('../../../assets/image/shopping_cart.png') }
                      style={{ width:30, height: 30 }}
                    />
                  </TouchableOpacity>
                )
              }
            )}
          />

          <Stack.Screen 
            name='ClientProductDetailScreen'
            component={ ClientProductDetailScreen }
          />

          <Stack.Screen 
            name='ClientShoppingBagScreen'
            component={ ClientShoppingBagScreen }
            options={{
              title: 'Mi orden',
              headerShown: true
            }}
          />

          <Stack.Screen 
            name='ClientAddressListScreen'
            component={ ClientAddressListScreen }
            options={ ({route, navigation}) => (
              {
                headerShown:true,
                title: 'Mis Direcciones',
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('ClientAddressCreateScreen')}>
                    <Image 
                      source={ require('../../../assets/image/add.png') }
                      style={{ width:30, height: 30 }}
                    />
                  </TouchableOpacity>
                )
              }
            )}
          />

          <Stack.Screen 
            name='ClientAddressCreateScreen'
            component={ ClientAddressCreateScreen }
            options={{
              title: 'Nueva Dirección',
              headerShown: true
            }}
          />

          <Stack.Screen 
            name='ClientAddressMapScreen'
            component={ ClientAddressMapScreen }
            options={{
              title: 'Ubica tu dirección en el mapa',
              headerShown: true
            }}
          />
        </Stack.Navigator>
      </ShoppingBagState>
    )
}

const ShoppingBagState = ({children}: any) => {
  return (
    <ShoppingBagProvider>
      {children}
    </ShoppingBagProvider>
  )
}