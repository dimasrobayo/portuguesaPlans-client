import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiPortuguesa";
import { Order } from "../entities/Order";

export interface OrderRepository {
    getByStatus(status:string): Promise<Order[]>;
    create(order:Order): Promise<ResponseApiDelivery>;
    updateToDispatched(order:Order): Promise<ResponseApiDelivery>;
    getByDeliveryAndStatus(idDelivery: string, status: string): Promise<Order[]>;
}