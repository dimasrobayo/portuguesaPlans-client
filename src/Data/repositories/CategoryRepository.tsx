import { Category } from "../../Domain/entities/Category";
import { CategoryRepository } from "../../Domain/repositories/CategoryRepository";
import { ApiPortuguesa, ApiPortuguesaWithFile } from "../sources/remote/api/ApiPortuguesa";
import { ResponseApiPortuguesa } from "../sources/remote/models/ResponseApiPortuguesa";
import mime from 'mime';
import { ImagePickerAsset } from 'expo-image-picker';
import { AxiosError } from 'axios';

export class CategoryRepositoryImpl implements CategoryRepository {
    async getAll(): Promise<Category[]> {
        try {
            const response = await ApiPortuguesa.get<Category[]>('/categories/getAll');

            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }

    async create(category: Category, file: ImagePickerAsset): Promise<ResponseApiPortuguesa> {
        try {
            let data = new FormData();
            // @ts-ignore
            data.append('image', {
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            });
            data.append('category', JSON.stringify(category));
            const response = await ApiPortuguesaWithFile.post<ResponseApiPortuguesa>('/categories/create', data);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async update(category: Category): Promise<ResponseApiPortuguesa> {
        try {
            const response = await ApiPortuguesa.put<ResponseApiPortuguesa>('/categories/update', category);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async updateWithImage(category: Category, file: ImagePickerAsset): Promise<ResponseApiPortuguesa> {
        try {
            let data = new FormData();
            // @ts-ignore
            data.append('image', {
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            });
            data.append('category', JSON.stringify(category));
            const response = await ApiPortuguesaWithFile.put<ResponseApiPortuguesa>('/categories/updateWithImage', data);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async remove(id: string): Promise<ResponseApiPortuguesa> {
        try {
            const response = await ApiPortuguesa.delete<ResponseApiPortuguesa>(`/categories/delete/${id}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }
}