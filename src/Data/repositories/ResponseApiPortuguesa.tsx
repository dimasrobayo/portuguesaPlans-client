import { AxiosError } from "axios";
import { Address } from "../../Domain/entities/Address";
import { AddressRepository } from "../../Domain/repositories/AddressRepository";
import { ResponseApiPortuguesa } from "../sources/remote/models/ResponseApiPortuguesa";
import { ApiPortuguesa } from "../sources/remote/api/ApiPortuguesa";

export class AddressRepositoryImpl implements AddressRepository {
    async getByUser(idUser: string): Promise<Address[]> {
        try {
            const response = await ApiPortuguesa.get<Address[]>(`/address/findByUser/${idUser}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([])
        }
    }
    
    async create(address: Address): Promise<ResponseApiPortuguesa> {
        try {
            const response = await ApiPortuguesa.post<ResponseApiPortuguesa>('/address/create', address);  
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }
}