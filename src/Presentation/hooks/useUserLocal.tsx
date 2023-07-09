import React, { useEffect, useState } from 'react'
import { User } from '../../Domain/entities/User';
import { getUserLocalUseCase } from '../../Domain/useCase/userLocal/GetUserLocal';

export const useUserLocal = () => {
    const [user, setUser] = useState<User>()
    
    useEffect(() => {
        getUserSession();
    }, [])
    
    const getUserSession = async () => {
        const user = await getUserLocalUseCase();
        setUser(user);
        // console.log('USUARIO SESSION' + JSON.stringify(user));
    }
    
    return {
        user,
        getUserSession
    }
}
