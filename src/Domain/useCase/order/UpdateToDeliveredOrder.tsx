import { OrderRepositoryImp } from "../../../Data/repositories/OrderRepository";
import { Order } from '../../entities/Order';

const { updateToDelivered } = new OrderRepositoryImp();

export const UpdateToDeliveredOrderUseCase = async (order: Order) => {
  return await updateToDelivered(order);
}