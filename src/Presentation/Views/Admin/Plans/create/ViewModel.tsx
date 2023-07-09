import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { CategoryContext } from '../../../../Context/CategoryContext';

const AdminPlansCreateViewModel = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        image: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const { create } = useContext(CategoryContext);


    const onChange = (property: string, value: any ) => {
        setValues({...values, [property]: value})
    }

    const createCategory = async () => {
        if(isValidForm()) {
            setLoading(true);
            const response = await create(values, file!);
            setLoading(false);
            setResponseMessage(response.message);
            resetForm();
        }
    }

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5
      });
  
      if (!result.canceled) {
        onChange('image', result.assets[0].uri);
        setFile(result.assets[0]);
      }
    }
    
    const takePhoto = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
        setResponseMessage('¡Te has negado a permitir que esta aplicación acceda a tu cámara!');
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1
      });
  
      if (!result.canceled) {
        onChange('image', result.assets[0].uri);
        setFile(result.assets[0]);
      }
    }

    const resetForm = async () => {
      setValues({
        name: '',
        description: '',
        image: '',
      })
    }

    const isValidForm = (): boolean => {
      if(values.name === ''){
        setResponseMessage('Ingresar el nombre');
        return false;
      }
  
      if(values.description === ''){
        setResponseMessage('Ingresar la descripción');
        return false;
      }
  
      if(values.image === ''){
        setResponseMessage('Seleccionar una imagen');
        return false;
      }
  
      return true;
    }

    return {
        ...values,
        onChange,
        pickImage,
        takePhoto,
        createCategory,
        responseMessage,
        loading,
    }
}

export default AdminPlansCreateViewModel;