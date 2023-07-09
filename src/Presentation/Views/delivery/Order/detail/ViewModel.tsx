import { useContext, useEffect, useState } from "react";
import { Order } from "../../../../../Domain/entities/Order"
import { User } from "../../../../../Domain/entities/User";
import { GetDeliveryMenUserUseCase } from "../../../../../Domain/useCase/user/GetDeliveryMenUser";
import { OrderContext } from "../../../../Context/OrderContext";

interface DropDownProps {
    label: string,
    value: string
}

const DeliveryOrderDetailViewModel = (order: Order) => {
    const [total, setTotal] = useState(0.0);
    const [deliveryMen, setDeliveryMen] = useState<User[]>([])
    const [responseMessage, setResponseMessage] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] =useState<DropDownProps[]>([]);

    //CALL TO ORDER CONTEXT
    const { updateToOnTheWay } = useContext(OrderContext)

    const updateToOnTheWayOrder = async () => {
            const result = await updateToOnTheWay(order);
            setResponseMessage(result.message);
    }

    const getDeliveryMen = async () => {
        const result = await GetDeliveryMenUserUseCase();
        console.log('REPARTIDORES: ' + JSON.stringify(result, null, 3));
        setDeliveryMen(result);
    } 

    const getTotal = () => {
        order.products.forEach(p => {
            setTotal(total + (p.price * p.quantity!));
        });
    }

    return {
        total,
        deliveryMen,
        open,
        value,
        items,
        responseMessage,
        getTotal,
        getDeliveryMen,
        setOpen,
        setValue,
        setItems,
        updateToOnTheWayOrder
    }
}

export default DeliveryOrderDetailViewModel; 