import { createContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ResponseApiPortuguesa } from '../../Data/sources/remote/models/ResponseApiPortuguesa';
import { Product } from '../../Domain/entities/Product';
import { CreateProductUseCase } from '../../Domain/useCase/product/CreateProduct';
import { GetProductsByCategoryUseCase } from '../../Domain/useCase/product/GetProductsByCategory';
import { DeleteProductUseCase } from '../../Domain/useCase/product/DeleteProduct';
import { UpdateProductUseCase } from '../../Domain/useCase/product/UpdateProduct';
import { UpdateWithImageProductUseCase } from '../../Domain/useCase/product/UpdateWithImageProductUseCase';

export interface ProductContextProps {
    products: Product[],
    getProducts(idCategory: string): Promise<void>,
    create(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiPortuguesa>,
    update(product: Product): Promise<ResponseApiPortuguesa>,
    updateWithImage(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiPortuguesa>,
    remove(product: Product): Promise<ResponseApiPortuguesa>
}

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ( {children}: any) => {
    const [products, setProducts] = useState<Product[]>([]);

    const getProducts = async (idCategory: string): Promise<void> => {
        const result = await GetProductsByCategoryUseCase(idCategory);
        setProducts(result);
    }

    const create = async (product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiPortuguesa> => {
        const response = await CreateProductUseCase(product, files);
        getProducts(product.id_category!);
        return response;
    }

    const update = async (product: Product): Promise<ResponseApiPortuguesa> => {
        const response = await UpdateProductUseCase(product);
        getProducts(product.id_category!);
        return response
    }

    const updateWithImage = async (product: Product, files: ImagePicker.ImagePickerAsset[]) => {
        const response = await UpdateWithImageProductUseCase(product, files);
        getProducts(product.id_category!);
        return response;
    }

    const remove = async (product:Product): Promise<ResponseApiPortuguesa> => {
        const response = await DeleteProductUseCase(product);
        getProducts(product.id_category!);
        return response;
    }

    return (
        <ProductContext.Provider value={{
            products,
            getProducts,
            create,
            update,
            updateWithImage,
            remove
        }}>
            {children}
        </ProductContext.Provider>
    )
}