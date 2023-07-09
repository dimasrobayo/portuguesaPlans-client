import { OrderRepositoryImp } from "../../../Data/repositories/OrderRepository";
import { Order } from '../../entities/Order';

const { updateToOnTheWay } = new OrderRepositoryImp();

export const UpdateToOnTheWayOrderUseCase = async (order: Order) => {
  return await updateToOnTheWay(order);
}