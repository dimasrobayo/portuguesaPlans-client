 import React, { useContext, useState,  } from 'react';
import { LoginAuthUseCase } from '../../../Domain/useCase/auth/LoginAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCase/userLocal/SaveUserLocal';
import { userContext } from '../../Context/UseContext';
import { useUserLocal } from '../../hooks/useUserLocal';

const LoginViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { user, saveUserSession } = useContext( userContext )

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    };


    const Login = async () => {
        if(isValidForm()){
            const response = await LoginAuthUseCase(values.email, values.password);

            if(!response.success){
                setErrorMessage(response.message);
            }else{
                saveUserSession(response.data);
            }
        }
    }

    const isValidEmail = (): boolean => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!values.email || regex.test(values.email) === false){
            return false;
        }
        return true;
    }

    const isValidForm = (): boolean => {
        if(values.email === ''){
            setErrorMessage('El email es requerido');
            return false;
        }

        if(isValidEmail() === false) {
            setErrorMessage('El email es incorrecto');
            return false;
        }

        if(values.password === '') {
            setErrorMessage('El password es requerido');
            return false;
        }

        return true;
    }

    return {
        ...values,
        onChange,
        Login,
        errorMessage,
        user
    }
}

export default LoginViewModel;
