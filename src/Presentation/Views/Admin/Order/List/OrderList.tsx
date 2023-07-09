import React, { useEffect } from 'react'
import { FlatList, Text, View, useWindowDimensions } from 'react-native'
import useViewModel from './ViewModel'
import { TabBar, TabView } from 'react-native-tab-view';
import { MyColor } from '../../../../theme/AppTheme';
import { OrderListItem } from './Item';
import { AdminOrderStackParamList } from '../../../../Navigator/AdminOrderStackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface Props {
  status: string
}

const OrderListRoute = ({ status }: Props) => {
  const { ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrders } = useViewModel();
  const navigation = useNavigation<StackNavigationProp<AdminOrderStackParamList, 'AdminOrderListScreen'>>();

  useEffect(() => {
    getOrders(status);
  }, [])
  
  return (
    <View>
      <FlatList 
        data={
          status === 'PAGADO' 
          ? ordersPayed 
          : status === 'DESPACHADO'
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
      return <OrderListRoute status='PAGADO' />;
    case 'second':
      return <OrderListRoute status='DESPACHADO' />;
    case 'third':
      return <OrderListRoute status='EN CAMINO' />;
    case 'fourth':
      return <OrderListRoute status='ENTREGADO' />;
    default:
      return <OrderListRoute status='PAGADO' />;
  }
};


export const AdminOrderListScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'PAGADO' },
    { key: 'second', title: 'DESPACHADO' },
    { key: 'third', title: 'EN CAMINO' },
    { key: 'fourth', title: 'ENTREGADO' },
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
