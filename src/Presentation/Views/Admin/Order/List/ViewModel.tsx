import { useContext } from 'react'
import { OrderContext } from '../../../../Context/OrderContext';

const AdminOrderListViewModel = () => {
    const { ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrdersByStatus } = useContext(OrderContext);

    const getOrders = async(status:string) => {
        const result  = await getOrdersByStatus(status);
    }

    return {
        ordersPayed,
        ordersDispatched,
        ordersOnTheWay,
        ordersDelivery,
        getOrders
    }
}

export default AdminOrderListViewModel;