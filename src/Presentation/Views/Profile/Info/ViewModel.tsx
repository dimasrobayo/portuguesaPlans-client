import { useContext } from 'react';
import { userContext } from '../../../Context/UseContext';

const ProfileInfoViewModel = () => {
    const { user, removeUserSession } = useContext( userContext );
    
    return { removeUserSession, user }
}

export default ProfileInfoViewModel;
