import { OrderRepositoryImp } from "../../../Data/repositories/OrderRepository";
import { Order } from "../../entities/Order";

const { create } = new OrderRepositoryImp;

export const createOrderUseCase = async (order: Order) => {
    return await create(order);
}