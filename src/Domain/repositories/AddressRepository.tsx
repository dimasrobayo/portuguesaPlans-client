import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiPortuguesa";
import { Address } from "../entities/Address";

export interface AddressRepository {
    getByUser(idUser: string): Promise<Address[]>;
    create(address: Address): Promise<ResponseApiDelivery>;
}
