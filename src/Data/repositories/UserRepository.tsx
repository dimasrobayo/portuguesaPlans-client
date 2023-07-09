import { AxiosError } from "axios";
import { ImagePickerAsset } from "expo-image-picker";
import mime from "mime";
import { User } from "../../Domain/entities/User";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { ApiPortuguesa, ApiPortuguesaWithFile } from "../sources/remote/api/ApiPortuguesa";
import { ResponseApiPortuguesa } from '../sources/remote/models/ResponseApiPortuguesa';

export class UserRepositoryImpl implements UserRepository {
    async updateWithoutImage(user: User): Promise<ResponseApiPortuguesa> {
        try {
            const response = await ApiPortuguesa.put<ResponseApiPortuguesa>('/users/updateWithoutImage', user);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }
    async updateWithImage(user: User, file: ImagePickerAsset): Promise<ResponseApiPortuguesa> {
        try {
            let data = new FormData();

            // @ts-ignore
            data.append('image', {
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            })
            data.append('user', JSON.stringify(user));
            
            const response = await ApiPortuguesaWithFile.put<ResponseApiPortuguesa>('/users/updateWithImage', data);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }
    async getDeliveryMen(): Promise<User[]> {
        try {
            const response = await ApiPortuguesa.get<User[]>('users/findDeliveryMen');
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }
}