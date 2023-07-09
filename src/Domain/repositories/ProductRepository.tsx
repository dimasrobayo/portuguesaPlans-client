import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiPortuguesa";
import { Product } from "../entities/Product";

export interface ProductRepository {
    getProductsByCategory(idCategory: string): Promise<Product[]>;
}