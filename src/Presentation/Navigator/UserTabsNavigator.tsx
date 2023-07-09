import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import {ClientOrderListScreen} from '../Views/Client/Order/OrderList';
import {ProfileInfoScreen} from '../Views/Profile/Info/ProfileInfo';
import { UserStackNavigator } from './UserStackNavigator';

const Tab = createBottomTabNavigator();

export const UserTabsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="UserStackNavigator" 
        component={UserStackNavigator} 
        options={{
          title: 'Planes',
          tabBarLabel: 'Planes',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image 
              source={ require('../../../assets/image/list.png') }
              style={{ width: 25, height: 25 }}
            />
          )
        }}
      />
      <Tab.Screen 
        name="ClientOrderListScreen" 
        component={ClientOrderListScreen} 
        options={{
          title: 'Social',
          tabBarLabel: 'Social',
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
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image 
              source={ require('../../../assets/image/user_menu.png') }
              style={{ width: 25, height: 25 }}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}