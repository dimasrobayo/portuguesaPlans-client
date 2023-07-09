import { createContext, useEffect, useState } from "react";
import { User } from "../../Domain/entities/User";
import { SaveUserLocalUseCase } from "../../Domain/useCase/userLocal/SaveUserLocal";
import { getUserLocalUseCase } from '../../Domain/useCase/userLocal/GetUserLocal';
import { RemoveUserLocalUseCase } from "../../Domain/useCase/userLocal/RemoveUserLocal";

export const UserInicialState: User = {
    id:                 "",
    name:               "",
    lastname:           "",
    email:              "",
    phone:              "",
    password:           "",
    confirmpassword:    "",
    image:              "",
    session_token:      "",
    roles:              [],
}

export interface UserContextProps {
    user: User;
    saveUserSession: (user: User) => Promise<void>;
    getUserSession: () => Promise<void>;
    removeUserSession: () => Promise<void>;
}

export const userContext = createContext({} as UserContextProps);

export const UserProvider = ( {children}: any ) => {
    const [user, setUser] = useState(UserInicialState)

    useEffect(() => {
        getUserSession();
    }, [])
    
    const saveUserSession = async (user:User) => {
        await SaveUserLocalUseCase(user);
        setUser(user);
    }

    const getUserSession = async() => {
        const user = await getUserLocalUseCase();
        setUser(user);
    }

    const removeUserSession = async() => {
        await RemoveUserLocalUseCase();
        setUser(UserInicialState)
    }

    return (
        <userContext.Provider value = {{
            user,
            saveUserSession,
            getUserSession,
            removeUserSession
         }}>
            {children}
        </userContext.Provider>
    )
}