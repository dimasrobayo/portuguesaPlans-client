import { OrderRepositoryImp } from '../../../Data/repositories/OrderRepository'

const  { getByStatus } = new OrderRepositoryImp

export const GetByStatusOrderUseCase = async( status: string ) => {
    return await getByStatus(status);
}
