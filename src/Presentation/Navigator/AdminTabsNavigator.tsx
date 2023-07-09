import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { AdminOrderStackNavigator } from '../Navigator/AdminOrderStackNavigator';
import {ProfileInfoScreen} from '../Views/Profile/Info/ProfileInfo';
import { AdminPlansNavigator } from './AdminPlansNavigator';

const Tab = createBottomTabNavigator();

export const AdminTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen 
        name="AdminPlansNavigator" 
        component={AdminPlansNavigator} 
        options={ ({route, navigation}) => (
          {
            title: 'Planes',
            tabBarLabel: 'Planes',
            tabBarIcon: () => (
              <Image
                source={ require('../../../assets/image/list.png') }
                style={{ width: 25, height: 25 }}
              />
            )
          }
        )}
      />
      <Tab.Screen 
        name="AdminOrderStackNavigator" 
        component={AdminOrderStackNavigator} 
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