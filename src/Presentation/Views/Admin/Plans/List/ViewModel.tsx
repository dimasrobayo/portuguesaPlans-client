import React, { useState, useContext } from 'react'
import { CategoryContext } from '../../../../Context/CategoryContext';

const AdminPlansListViewModel = () => {
    const [responseMessage, setResponseMessage] = useState('');
    const { categories, getCategories, remove } = useContext( CategoryContext );

    const deleteCategory = async (idCategory: string) => {
        const result = await remove(idCategory);
        setResponseMessage(result.message);
    }

    return {
        categories,
        responseMessage,
        getCategories,
        deleteCategory
    }
}

export default AdminPlansListViewModel;