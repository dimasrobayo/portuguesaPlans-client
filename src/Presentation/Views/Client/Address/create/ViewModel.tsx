import { useState, useContext, useEffect } from 'react'
import { userContext } from '../../../../Context/UseContext';
import { CreateAddressUseCase } from '../../../../../Domain/useCase/address/CreateAddress';

const ClientAddressCreateViewModel = () => {
  const [values, setValues] = useState({
    address: '',
    neighborhood: '',
    referencePoint: '',
    lat: 0.0,
    lng: 0.0,
    id_user: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const { user, saveUserSession } = useContext(userContext);

  useEffect(() => {
    user.id != '' && onChange('id_user', user.id);
  }, [user])
  

  const onChange = (property: string, value: any ) => {
    setValues({...values, [property]: value})
  }

  const onChangeRefPoint = (referencePoint: string, lat: number, lng:number) => {
    setValues({ ...values, referencePoint: referencePoint, lat: lat, lng: lng });
  }

  const createAddress = async () => {
    console.log(JSON.stringify(values));

    if(isValidForm()) {
      setLoading(true);
      const response = await CreateAddressUseCase(values);
      setLoading(false);
      setResponseMessage(response.message);
      if(response.success){
        resetForm();
        user.address = values;
        user.address.id = response.data; // RESPONSE.DATA RETURN THE ID OF THE NEW ADDRESS
        saveUserSession(user);
      }
    }
  }

  const resetForm = async () => {
    setValues({
      address: '',
      neighborhood: '',
      referencePoint: '',
      lat: 0.0,
      lng: 0.0,
      id_user: user.id!
    })
  }

  const isValidForm = (): boolean => {
    if(values.address === ''){
      setResponseMessage('Ingresar el nombre');
      return false;
    }

    if(values.neighborhood === ''){
      setResponseMessage('Ingresar la descripción');
      return false;
    }

    if(values.referencePoint === ''){
      setResponseMessage('Seleccionar una imagen');
      return false;
    }

    return true;
  }

  return {
    ...values,
    onChange,
    onChangeRefPoint,
    createAddress,
    responseMessage,
    loading,
  }
}

export default ClientAddressCreateViewModel;