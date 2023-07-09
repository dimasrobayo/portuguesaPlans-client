import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DeliveryOrderStackNavigator } from './DeliveryOrderStackNavigator';
import { ProfileInfoScreen } from '../Views/Profile/Info/ProfileInfo';

const Tab = createBottomTabNavigator();

export const DeliveryTabsNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="DeliveryOrderStackNavigator" 
                component={DeliveryOrderStackNavigator} 
                options={{
                title: 'Pedidos',
                tabBarLabel: 'Pedidos',
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Image 
                        source={ require('../../../assets/image/orders.png') }
                        style={{ width: 25, height: 25 }}
                    />
                )
                }}
            />
            <Tab.Screen 
                name="ProfileInfoScreen" 
                component={ProfileInfoScreen} 
                options={{
                title: 'Perfil',
                tabBarLabel: 'Perfil',
                tabBarIcon: ({color}) => (
                    <Image 
                    source={ require('../../../assets/image/user_menu.png') }
                    style={{ width: 25, height: 25 }}
                    />
                )
                }}
            />
        </Tab.Navigator>
    )
}
