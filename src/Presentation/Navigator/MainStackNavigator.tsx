import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User } from '../../Domain/entities/User';
import { LoginScreen } from '../Views/Login/Login';
import { RegisterScreen } from '../Views/Register/Register';
import { AdminTabsNavigator } from './AdminTabsNavigator';
import { DeliveryTabsNavigator } from './DeliveryTabsNavigator';
import { UserTabsNavigator } from './UserTabsNavigator';
import { ProfileUpdateScreen } from '../Views/Profile/Update/ProfileUpdateScreen';
import RolesScreen from '../Views/Roles/Roles'
import { UserProvider } from '../Context/UseContext';

export type RootStackParamList = {
    Login: undefined,
    Register: undefined,
    Roles: undefined,
    AdminTabsNavigator: undefined,
    DeliveryTabsNavigator: undefined,
    UserTabsNavigator: undefined,
    ProfileUpdateScreen: {user: User},
    AdminPlansCreateScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStackNavigator = () => {
    return (
      <UserStateContext>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{
                headerShown: true,
                title: 'Registrate'
              }}
            />
            <Stack.Screen 
              name="Roles" 
              component={RolesScreen} 
              options={{
                headerShown: true,
                title: 'Roles del Usuario'
              }}
            />
            <Stack.Screen
              name="AdminTabsNavigator"
              component={AdminTabsNavigator}
            />
            <Stack.Screen
              name="DeliveryTabsNavigator"
              component={DeliveryTabsNavigator}
            />
            <Stack.Screen
              name="UserTabsNavigator"
              component={UserTabsNavigator}
            />
            <Stack.Screen
              name="ProfileUpdateScreen"
              component={ProfileUpdateScreen}
              options={{
                headerShown: true,
                title: 'Actualizar usuario'
              }}
            />
          </Stack.Navigator>
      </UserStateContext>
    )
  };
  
  const UserStateContext = ({children}: any) => {
    return (
      <UserProvider>
        { children }
      </UserProvider>
    )
  }