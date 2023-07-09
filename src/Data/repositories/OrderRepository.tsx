import { AxiosError } from 'axios';
import { Order } from '../../Domain/entities/Order';
import { OrderRepository } from '../../Domain/repositories/OrdenRepository';
import { ApiPortuguesa } from '../sources/remote/api/ApiPortuguesa';
import { ResponseApiPortuguesa } from '../sources/remote/models/ResponseApiPortuguesa';

export class OrderRepositoryImp implements OrderRepository {
    async getByStatus(status: string): Promise<Order[]> {
        try {
            const response = await ApiPortuguesa.get<Order[]>(`/orders/findByStatus/${status}`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([])
        }
    }

    async getByDeliveryAndStatus(idDelivery: string, status: string): Promise<Order[]> {
        try {
            const response = await ApiPortuguesa.get<Order[]>(`/orders/findByDeliveryAndStatus/${idDelivery}/${status}`);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([])
        }        
    }
    
    async create(order: Order): Promise<ResponseApiPortuguesa> {
        try {
            const response = await ApiPortuguesa.post<ResponseApiPortuguesa>('/orders/create', order);
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async updateToDispatched(order: Order): Promise<ResponseApiPortuguesa> {
        try {
            const response = await ApiPortuguesa.put<ResponseApiPortuguesa>('/orders/updateToDispatched', order);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }
    }

    async updateToOnTheWay(order: Order): Promise<ResponseApiPortuguesa> {
        try {
            const response = await ApiPortuguesa.put<ResponseApiPortuguesa>('/orders/updateToOnTheWay', order);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async updateToDelivered(order: Order): Promise<ResponseApiPortuguesa> {
        try {
            const response = await ApiPortuguesa.put<ResponseApiPortuguesa>('/orders/updateToDelivered', order);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiPortuguesa = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }
}