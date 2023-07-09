import { AddressRepositoryImpl } from "../../../Data/repositories/ResponseApiPortuguesa"

const { getByUser } = new AddressRepositoryImpl()

export const GetByUserAddressUseCase = async (idUser: string) => {
  return getByUser(idUser);
}
