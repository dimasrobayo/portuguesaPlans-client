import { AxiosError } from "axios";
import mime from 'mime';
import { ImageInfo, ImagePickerAsset } from 'expo-image-picker';
import { Product } from "../../Domain/entities/Product";
import { ProductRepository } from "../../Domain/repositories/ProductRepository";
import { ApiPortuguesa, ApiPortuguesaWithFile } from "../sources/remote/api/ApiPortuguesa";
import { ResponseApiPortuguesa } from '../sources/remote/models/ResponseApiPortuguesa';

export class ProductRepositoryImpl implements ProductRepository {
    async getProductsByCategory(idCategory: string): Promise<Product[]> {
        try {
            const response = await ApiPortuguesa.get<Product[]>(`/products/findByCategory/${idCategory}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }

    async create(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiPortuguesa> {
        try {
            let data = new FormData();
            files.forEach(file => {
                // @ts-ignore
                data.append('image', {
                    uri: file.uri,
                    name: file.uri.split('/').pop(),
                    type: mime.getType(file.uri)!
                });
            });
            
            data.append('product', JSON.stringify(product));
            const response = await ApiPortuguesaWithFile.post<ResponseApiPortuguesa>('/products/create', data);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async update (product: Product): Promise<ResponseApiPortuguesa> {
        try {
            const response = await ApiPortuguesa.put<ResponseApiPortuguesa>('/products/update', product);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR UPDATE' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError);
        }
    }

    async updateWithImage(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiPortuguesa> {
        try {
            let data = new FormData();

            files.forEach(file => {
                // @ts-ignore
                data.append('image', {
                    uri: file.uri,
                    name: file.uri.split('/').pop(),
                    type: mime.getType(file.uri)!
                });
            });

            data.append('product', JSON.stringify(product));
            const response = await ApiPortuguesaWithFile.put<ResponseApiPortuguesa>('/products/updateWithImage', data);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async remove(product: Product): Promise<ResponseApiPortuguesa> {
        try {
            const response = await ApiPortuguesa.delete<ResponseApiPortuguesa>(`/products/delete/${product.id}`);
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.config.data));
            return Promise.resolve(apiError);
        }
    }
}