import React, { useEffect } from 'react'
import useViewModel from './ViewModel'
import { OrderListItem } from './Item';
import { MyColor } from '../../../../theme/AppTheme';
import { TabBar, TabView } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { DeliveryOrderStackParamList } from '../../../../Navigator/DeliveryOrderStackNavigator';

interface Props {
  status: string
}

const OrderListRoute = ({ status }: Props) => {
  const { ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, user, getOrders } = useViewModel();
  const navigation = useNavigation<StackNavigationProp<DeliveryOrderStackParamList, 'DeliveryOrderListScreen'>>();

  useEffect(() => {
    getOrders(user?.id!, status);
  }, [user])
  
  return (
    <View>
      <FlatList 
        data={
          status === 'DESPACHADO'
          ? ordersDispatched
          : status === 'EN CAMINO'
          ? ordersOnTheWay
          : status === 'ENTREGADO'
          ? ordersDelivery
          : [] 
        }
        keyExtractor={ (item) => item.id!}
        renderItem={ ({item}) => <OrderListItem order={item} navigation={navigation} /> }
      />
    </View>
  )
}

const renderScene = ({ route }: any) => {
  switch (route.key) {
    case 'first':
      return <OrderListRoute status='DESPACHADO' />;
    case 'second':
      return <OrderListRoute status='EN CAMINO' />;
    case 'third':
      return <OrderListRoute status='ENTREGADO' />;
    default:
      return <OrderListRoute status='PAGADO' />;
  }
};


export const DeliveryOrderListScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'DESPACHADO' },
    { key: 'second', title: 'EN CAMINO' },
    { key: 'third', title: 'ENTREGADO' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: MyColor.primary,  }}
          activeColor='black'
          inactiveColor='gray'
          scrollEnabled={true}
          style={{ paddingTop: 10, backgroundColor: 'white', height: 60, alignItems: 'center', justifyContent: 'center'}}
        />
      )}
    />
  );
}
