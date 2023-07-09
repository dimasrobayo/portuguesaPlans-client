import React, { useState } from 'react';
import { RegisterAuthUseCase } from '../../../Domain/useCase/auth/RegisterAuth';
import * as ImagePicker from 'expo-image-picker';
import { RegisterWithImageAuthUseCase } from '../../../Domain/useCase/auth/RegisterWithImageAuth';
import { useUserLocal } from '../../hooks/useUserLocal';
import { SaveUserLocalUseCase } from '../../../Domain/useCase/userLocal/SaveUserLocal';

const registerViewModel = () => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const { user, getUserSession } = useUserLocal();
  
  const [values, setValues] = useState({
    name: '',
    lastname: '',
    email: '',
    image: '',
    phone: '',
    password: '',
    confirmpassword: ''
  });
  
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()

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
      setErrorMessage('¡Te has negado a permitir que esta aplicación acceda a tu cámara!');
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

  const onChange = (property: string, value: any) => {
    setValues({...values, [property]: value})
  }

  const register = async () => {
    if(isValidForm()) {
      setLoading(true)
      // const response = await RegisterAuthUseCase(values);
      const response = await RegisterWithImageAuthUseCase(values, file!);
      setLoading(false)
      if(!response.success){
        setErrorMessage(response.message);
      }else{
          await SaveUserLocalUseCase(response.data);
          getUserSession();
      }
    }
  }

  const isValidForm = (): boolean => {
    if(values.name === ''){
      setErrorMessage('Ingresar el nombre');
      return false;
    }

    if(values.lastname === ''){
      setErrorMessage('Ingresar el apellido');
      return false;
    }

    if(values.email === ''){
      setErrorMessage('Ingresar el correo electronico');
      return false;
    }

    if(values.phone === ''){
      setErrorMessage('Ingresar el telefono');
      return false;
    }

    if(values.password === ''){
      setErrorMessage('Ingresar la contraseña');
      return false;
    }

    if(values.confirmpassword === ''){
      setErrorMessage('Ingresar la confirmación de la contraseña');
      return false;
    }

    if(values.password !== values.confirmpassword){
      setErrorMessage('Las contraseñas no coinciden');
      return false;
    }

    if(values.image === ''){
      setErrorMessage('Seleccionar una imagen');
      return false;
    }

    return true;
  }

  return {
    ...values,
    onChange,
    register,
    pickImage,
    takePhoto,
    errorMessage,
    loading,
    user
  }
}

export default registerViewModel;