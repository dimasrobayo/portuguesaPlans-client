import React, { useEffect } from 'react'
import styles from './Styles';
import { FlatList, Image, Text, ToastAndroid, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { AdminOrderStackParamList } from '../../../../Navigator/AdminOrderStackNavigator'
import { OrderDetailItem } from './Item';
import { DateFormatter } from '../../../../utils/DateFormatter';
import DropDownPicker from 'react-native-dropdown-picker';
import useViewModel from './ViewModel';
import { RoundedButton } from '../../../../Components/RoundedButton';

interface Props extends StackScreenProps<AdminOrderStackParamList, 'AdminOrderDetailScreen'>{};

export const AdminOrderDetailScreen = ({navigation, route}: Props) => {
    const { order } = route.params;
    const { total, open, items, value, responseMessage, getTotal, setOpen, getDeliveryMen, setItems, setValue, dispatchOrder } = useViewModel(order);

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

                {
                    order.status === 'PAGADO'
                    ?
                    <View>
                        <Text style={styles.deliveries}>Repartidores Disponibles</Text>
                        <View style={ styles.dropDown }>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                placeholder="Selecciona un repartidor"
                            />
                        </View>
                    </View>
                    :
                    <View>
                        <Text style={styles.deliveries}>Repartidor Asignado:</Text>
                        <Text style={styles.infoDescription}>{order.delivery?.name} {order.delivery?.lastname}</Text>
                        <Text style={styles.infoDescription}>{order.delivery?.phone}</Text>
                    </View>
                }

                <View style={ styles.totalInfo }>
                    <Text style={styles.total}>TOTAL: ${ total }</Text>
                    <View style={styles.button}>
                        {
                            order.status === 'PAGADO' &&
                            <RoundedButton text='DESPACHAR ORDEN' onPress={() => dispatchOrder()}/>
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}
