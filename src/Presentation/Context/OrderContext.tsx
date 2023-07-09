import { Order } from '../../Domain/entities/Order';
import { ResponseApiPortuguesa } from '../../Data/sources/remote/models/ResponseApiPortuguesa';
import { createContext, useState, useEffect } from 'react';
import { GetByStatusOrderUseCase } from '../../Domain/useCase/order/GetByStatus';
import { UpdateToDispatchedOrderUseCase } from '../../Domain/useCase/order/UpdateToDispatchedOrder'
import { GetByDeliveryAndStatusOrderUseCase } from '../../Domain/useCase/order/GetByDeliveryAndStatusOrder';
import { UpdateToOnTheWayOrderUseCase } from '../../Domain/useCase/order/UpdateToOnTheWayOrder';
import { UpdateToDeliveredOrderUseCase } from '../../Domain/useCase/order/UpdateToDeliveredOrder';

export interface OrderContextProps {
    ordersPayed: Order[],
    ordersDispatched: Order[],
    ordersOnTheWay: Order[],
    ordersDelivery: Order[],
    getOrdersByStatus(status: string): Promise<void>,
    updateToDispatched(order: Order): Promise<ResponseApiPortuguesa>,
    getOrderByDeliveryAndStatus(idDelivery: string, status: string): Promise<void>,
    updateToDelivered(order: Order): Promise<ResponseApiPortuguesa>,
    updateToOnTheWay(order: Order): Promise<ResponseApiPortuguesa>,
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({children}: any) => {

    const [ordersPayed, setOrdersPayed] = useState<Order[]>([]);
    const [ordersDispatched, setOrdersDispatched] = useState<Order[]>([]);
    const [ordersOnTheWay, setOrdersOnTheWay] = useState<Order[]>([]);
    const [ordersDelivery, setOrdersDelivery] = useState<Order[]>([]);

    useEffect(() => {
        setOrdersPayed([]);
        setOrdersDispatched([]);
        setOrdersOnTheWay([]);
        setOrdersDelivery([]);
    }, [])
    

    const getOrdersByStatus = async (status: string) => {
        const result = await GetByStatusOrderUseCase(status);
        if (status === 'PAGADO') {
            setOrdersPayed(result);
        }
        else if (status === 'DESPACHADO') {
            setOrdersDispatched(result);
        }
        else if (status === 'EN CAMINO') {
            setOrdersOnTheWay(result);
        }
        else if (status === 'ENTREGADO') {
            setOrdersDelivery(result);
        }
    }

    const getOrderByDeliveryAndStatus = async (idDelivery: string, status: string) => {
        const result = await GetByDeliveryAndStatusOrderUseCase(idDelivery, status);
        if (status === 'PAGADO') {
            setOrdersPayed(result);
        }
        else if (status === 'DESPACHADO') {
            setOrdersDispatched(result);
        }
        else if (status === 'EN CAMINO') {
            setOrdersOnTheWay(result);
        }
        else if (status === 'ENTREGADO') {
            setOrdersDelivery(result);
        }
    }

    const updateToDispatched = async (order: Order) => {
        const result = await UpdateToDispatchedOrderUseCase(order);
        getOrdersByStatus('PAGADO');
        getOrdersByStatus('DESPACHADO');
        return result;
    }

    const updateToOnTheWay = async (order: Order) => {
        const result = await UpdateToOnTheWayOrderUseCase(order);
        getOrderByDeliveryAndStatus(order.id_delivery!,  'DESPACHADO');
        getOrderByDeliveryAndStatus(order.id_delivery!, 'EN CAMINO');
        return result;
    }

    const updateToDelivered = async (order: Order) => {
        const result = await UpdateToDeliveredOrderUseCase(order);
        getOrderByDeliveryAndStatus(order.id_delivery!, 'EN CAMINO');
        getOrderByDeliveryAndStatus(order.id_delivery!,  'ENTREGADO');
        return result;
    }

    return (
        <OrderContext.Provider
            value={{
                ordersPayed,
                ordersDispatched,
                ordersOnTheWay,
                ordersDelivery,
                getOrdersByStatus,
                updateToDispatched,
                getOrderByDeliveryAndStatus,
                updateToOnTheWay,
                updateToDelivered
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}