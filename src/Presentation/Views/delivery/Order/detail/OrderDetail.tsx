import React, { useEffect } from 'react'
import styles from './Styles';
import { FlatList, Image, Text, ToastAndroid, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { DeliveryOrderStackParamList } from '../../../../Navigator/DeliveryOrderStackNavigator';
import { OrderDetailItem } from './Item';
import { DateFormatter } from '../../../../utils/DateFormatter';
import DropDownPicker from 'react-native-dropdown-picker';
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../../Components/RoundedButton';

interface Props extends StackScreenProps<DeliveryOrderStackParamList, 'DeliveryOrderDetailScreen'>{};

export const DeliveryOrderDetailScreen = ({navigation, route}: Props) => {
    const { order } = route.params;
    const { total, responseMessage, getTotal, getDeliveryMen, updateToOnTheWayOrder } = useViewModel(order);

    useEffect(() => {
        if (responseMessage !== '') {
          ToastAndroid.show(responseMessage, ToastAndroid.LONG);
        }
      }, [responseMessage])
      
    
    useEffect(() => {
        if (total === 0.0) {
            getTotal();
        }
        getDeliveryMen();
      }, [])

    return (
        <View style={styles.container}>
            <View style={styles.products}>
                <FlatList 
                    data={ order.products }
                    keyExtractor={ (item) => item.id! }
                    renderItem={ ({item}) => <OrderDetailItem product={item}/> }
                />
            </View>
            <View style={styles.info}>
                <View style={{...styles.infoRow, marginTop:25}}>
                    <View style={styles.infoText}>
                        <Text style={styles.infoTitle}>Fecha del pedido</Text>
                        <Text style={styles.infoDescription}>{DateFormatter(order.timestamp!)}</Text>
                    </View>

                    <Image 
                        style={ styles.infoImage }
                        source={require('../../../../../../assets/image/reloj.png')}
                    />
                </View>

                <View style={{...styles.infoRow, marginTop:25}}>
                    <View style={styles.infoText}>
                        <Text style={styles.infoTitle}>Cliente y Teléfono</Text>
                        <Text style={styles.infoDescription}>
                            {order.client?.name} {order.client?.lastname} - {order.client?.phone}
                        </Text>
                    </View>

                    <Image 
                        style={ styles.infoImage }
                        source={require('../../../../../../assets/image/user.png')}
                    />
                </View>

                <View style={{...styles.infoRow, marginTop:25}}>
                    <View style={styles.infoText}>
                        <Text style={styles.infoTitle}>Dirección de entrega</Text>
                        <Text style={styles.infoDescription}>
                            {order.address?.address} - {order.address?.neighborhood}
                        </Text>
                    </View>

                    <Image 
                        style={ styles.infoImage }
                        source={require('../../../../../../assets/image/location.png')}
                    />
                </View>

                <View style={{...styles.infoRow, marginTop:25}}>
                    <View style={styles.infoText}>
                        <Text style={styles.infoTitle}>Repartidor Asignado</Text>
                        <Text style={styles.infoDescription}>
                            {order.delivery?.name} {order.delivery?.lastname} - {order.delivery?.phone}
                        </Text>
                    </View>

                    <Image 
                        style={ styles.infoImage }
                        source={require('../../../../../../assets/image/my_user.png')}
                    />
                </View>
                
                <View style={ styles.totalInfo }>
                    <Text style={styles.total}>TOTAL: ${ total }</Text>
                    <View style={styles.button}>
                        {
                            order.status === 'DESPACHADO' &&
                            <RoundedButton text='ORDEN EN CAMINO' onPress={() => updateToOnTheWayOrder()}/>
                        }
                        {
                            order.status === 'EN CAMINO' &&
                            <RoundedButton text='IR A RUTA' onPress={() => navigation.navigate('DeliveryOrderMapScreen', {order: order})} />
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}
