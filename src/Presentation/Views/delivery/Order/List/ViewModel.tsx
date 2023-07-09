import { useContext } from 'react'
import { OrderContext } from '../../../../Context/OrderContext';
import { userContext } from '../../../../Context/UseContext';

const DeliveryOrderListViewModel = () => {
    const { ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrderByDeliveryAndStatus } = useContext(OrderContext);
    const { user } = useContext(userContext);

    const getOrders = async(idDelivery: string, status:string) => {
        const result  = await getOrderByDeliveryAndStatus(idDelivery, status);
    }

    return {
        ordersPayed,
        ordersDispatched,
        ordersOnTheWay,
        ordersDelivery,
        user,
        getOrders
    }
}

export default DeliveryOrderListViewModel;