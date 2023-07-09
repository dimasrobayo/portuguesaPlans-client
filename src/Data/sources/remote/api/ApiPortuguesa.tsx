import axios, { AxiosHeaders } from 'axios';
import { User } from '../../../../Domain/entities/User';
import { LocalStorage } from '../../local/LocalStorage';

const ApiPortuguesa = axios.create({
    baseURL: 'http://192.168.1.105:4004/api',
    headers: {
        'Content-type': 'application/json'
    }
})

const ApiPortuguesaWithFile = axios.create({
    baseURL: 'http://192.168.1.105:4004/api',
    headers: {
        'Content-type': 'multipart/form-data',
        'accept': 'application/json'
    }
});

// INTERCEPTORS
ApiPortuguesa.interceptors.request.use(
    async(config) => {
        const data = await LocalStorage().getItem('user');
        if (data) {
            const user: User = JSON.parse(data as any);
            (config.headers as AxiosHeaders).set("Authorization", `${user?.session_token!}`);
        }
        return config;
    },
    async(error) => {
        console.log(error)
    }
);

ApiPortuguesaWithFile.interceptors.request.use(
    async(config) => {
        const data = await LocalStorage().getItem('user');
        if (data) {
            const user: User = JSON.parse(data as any);
            (config.headers as AxiosHeaders).set("Authorization", `${user?.session_token!}`);
        }
        return config;
    },
    async(error) => {
        console.log(error)
    }
);

export { ApiPortuguesa, ApiPortuguesaWithFile }