import React, { useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useUserLocal } from '../../../hooks/useUserLocal';
import { SaveUserLocalUseCase } from '../../../../Domain/useCase/userLocal/SaveUserLocal';
import { UpdateUserUseCase } from '../../../../Domain/useCase/user/Update';
import { UpdateWithImageUserUseCase } from '../../../../Domain/useCase/user/UpdateWithImageUser';
import { User } from '../../../../Domain/entities/User';
import { ResponseApiPortuguesa } from '../../../../Data/sources/remote/models/ResponseApiPortuguesa';
import { userContext } from '../../../Context/UseContext';

const profileInfoUpdateViewModel = (user: User) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [values, setValues] = useState(user);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
  const { saveUserSession } = useContext( userContext )

  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri)
      onChange('image', result.assets[0].uri);
      setFile(result.assets[0]);
    }
  }

  const takePhoto = async() => {
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
      console.log(result.assets[0].uri)
      onChange('image', result.assets[0].uri);
      setFile(result.assets[0]);
    }
  }

  const onChange = (property: string, value: any) => {
    setValues({...values, [property]: value})
  }

  const onChangeUpdate = (name: string, lastname: string, phone: string) => {
    setValues({...values, name, lastname, phone})
  }

  const update = async () => {
    if(isValidForm()) {
      setLoading(true);

      let response = {} as ResponseApiPortuguesa;
      
      if(values.image?.includes('https://')){
        response = await UpdateUserUseCase (values);
      }else{
        response = await UpdateWithImageUserUseCase(values, file!);
      }
      setLoading(false);

      if(response.success){
        saveUserSession(response.data);
        setSuccessMessage(response.message)
      }else{
        setErrorMessage(response.message);
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

    if(values.phone === ''){
      setErrorMessage('Ingresar el telefono');
      return false;
    }

    return true;
  }

  return {
    ...values,
    onChange,
    onChangeUpdate,
    update,
    pickImage,
    takePhoto,
    errorMessage,
    successMessage,
    loading,
    user
  }
}

export default profileInfoUpdateViewModel;