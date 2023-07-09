import { OrderRepositoryImp } from '../../../Data/repositories/OrderRepository';

const { getByDeliveryAndStatus } = new OrderRepositoryImp();

export const GetByDeliveryAndStatusOrderUseCase = async (idDelivery: string, status: string) => {
    return await getByDeliveryAndStatus(idDelivery, status);
}
