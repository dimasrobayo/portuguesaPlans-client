import React, { useState, useContext } from 'react'
import { Product } from '../../../../../Domain/entities/Product';
import { ProductContext } from '../../../../Context/ProductContext';

const AdminProductListViewModel = () => {
    const { products, getProducts, remove } = useContext( ProductContext );
    const [responseMessage, setResponseMessage] = useState('');

    const deleteProduct =async (product:Product) => {
        const result = await remove(product)
        setResponseMessage(result.message)
    }


    return {
        products,
        getProducts,
        deleteProduct
    }
}

export default AdminProductListViewModel;