import React, { useContext, useEffect, useState } from 'react'
import { Address } from '../../../../../Domain/entities/Address';
import { GetByUserAddressUseCase } from '../../../../../Domain/useCase/address/GetByUserAddress';
import { userContext } from '../../../../Context/UseContext';
import { createOrderUseCase } from '../../../../../Domain/useCase/order/CreateOrder';
import { Order } from '../../../../../Domain/entities/Order';
import { ShoppingBagContext } from '../../../../Context/ShoppingBagContext';

const AddressListViewModel = () => {
    const [checked, setChecked] = useState('');
    const [address, setAddress] = useState<Address[]>([]);
    const { shoppingBag } = useContext( ShoppingBagContext );
    const [responseMessage, setResponseMessage] = useState('');
    const {user, saveUserSession, getUserSession} = useContext(userContext);

    useEffect(() => {
        getAddress();
        if (user.address !== null && user.address !== undefined) {
            changeRadioValue(user.address!);
            //console.log('USUARIO CON DIRECCION: ' + JSON.stringify(user));
        }
    }, [user])
    
    const changeRadioValue = async (address: Address) => {
        setChecked(address.id!);
        user.address = address;
        await saveUserSession(user);
        getUserSession();
    } 

    const getAddress = async () => {
        const result = await GetByUserAddressUseCase(user.id!);
        setAddress(result);
    }

    const createOrder = async () => {
        const order: Order = {
            id_client: user.id!,
            id_address: user.address?.id!,
            products: shoppingBag
        }
        const result = await createOrderUseCase(order);
        setResponseMessage(result.message)
    }
    
    return {
        checked,
        address,
        responseMessage,
        getAddress,
        changeRadioValue,
        createOrder
    }
}

export default AddressListViewModel;
