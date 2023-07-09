import { AxiosError } from 'axios';
import { ImageInfo } from 'expo-image-picker';
import { User } from '../../Domain/entities/User';
import { AuthRepository } from '../../Domain/repositories/AuthRepository';
import { ApiPortuguesa, ApiPortuguesaWithFile } from '../sources/remote/api/ApiPortuguesa';
import { ResponseApiPortuguesa } from '../sources/remote/models/ResponseApiPortuguesa';
import mime from 'mime';

export class AuthRepositoryImpl implements AuthRepository {
    async login(email: string, password: string): Promise<ResponseApiPortuguesa>{
        try {
            const response = await ApiPortuguesa.post<ResponseApiPortuguesa>('/users/login', {
                email,
                password
            });
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }

    async register(user:User): Promise<ResponseApiPortuguesa> {
        try {
            const response = await ApiPortuguesa.post<ResponseApiPortuguesa>('/users/create', user);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }


    async registerWithImage(user:User, file: ImageInfo): Promise<ResponseApiPortuguesa> {
        try {
            let data = new FormData();

            // @ts-ignore
            data.append('image', {
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            })
            data.append('user', JSON.stringify(user));
            
            const response = await ApiPortuguesaWithFile.post<ResponseApiPortuguesa>('/users/createWithImage', data);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }
}