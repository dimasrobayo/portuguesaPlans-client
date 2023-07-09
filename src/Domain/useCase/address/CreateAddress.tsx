import { AddressRepositoryImpl } from "../../../Data/repositories/ResponseApiPortuguesa";
import { Address } from "../../entities/Address";

const { create } = new AddressRepositoryImpl();

export const CreateAddressUseCase = async (address: Address) => {
    return await create(address);
}