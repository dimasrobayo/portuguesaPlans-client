import { OrderRepositoryImp } from '../../../Data/repositories/OrderRepository'
import { Order } from '../../entities/Order';

const { updateToDispatched } = new OrderRepositoryImp();

export const UpdateToDispatchedOrderUseCase = async (order: Order) => {
    return await updateToDispatched(order);
}
