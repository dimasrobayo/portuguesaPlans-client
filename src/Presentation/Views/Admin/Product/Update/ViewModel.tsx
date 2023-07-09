import React, { useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Product } from '../../../../../Domain/entities/Product';
import { Category } from '../../../../../Domain/entities/Category';
import { ProductContext } from '../../../../Context/ProductContext';
import { ResponseApiPortuguesa } from '../../../../../Data/sources/remote/models/ResponseApiPortuguesa';

const AdminProductUpdateViewModel = (product: Product, category: Category) => {
    const [values, setValues] = useState(product);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [file1, setFile1] = useState<ImagePicker.ImagePickerAsset>();
    const [file2, setFile2] = useState<ImagePicker.ImagePickerAsset>();
    const [file3, setFile3] = useState<ImagePicker.ImagePickerAsset>();
    const { update, updateWithImage } = useContext(ProductContext);

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const updateProduct = async () => {
        let files = [];
        files.push(file1!);
        files.push(file2!);
        files.push(file3!);
        
        setLoading(true);
        let response = {} as ResponseApiPortuguesa; 
        if (values.image1.includes('https://') && values.image2.includes('https://') && values.image3.includes('https://')) {
            response = await update(values);
        } else {
            response = await updateWithImage(values, files);
        }

        setLoading(false);
        setResponseMessage(response.message);
    }

    return {
        ...values,
        loading,
        responseMessage,
        onChange,
        updateProduct
    }
}

export default AdminProductUpdateViewModel;