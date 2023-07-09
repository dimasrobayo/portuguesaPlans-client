import { createContext, useState, useEffect } from 'react';
import { Category } from "../../Domain/entities/Category";
import * as ImagePicker from 'expo-image-picker';
import { ResponseApiPortuguesa } from "../../Data/sources/remote/models/ResponseApiPortuguesa";
import { GetAllCategoryUseCase } from '../../Domain/useCase/category/GetAllCategory';
import { CreateCategoryUseCase } from '../../Domain/useCase/category/CreateCategory';
import { UpdateCategoryUseCase } from '../../Domain/useCase/category/UpdateCategory';
import { UpdateWithImageCategoryUseCase } from '../../Domain/useCase/category/UpdateWithImageCategory';
import { DeleteCategoryUseCase } from '../../Domain/useCase/category/DeleteCategory';

export interface CategoryContextProps {
    categories: Category[],
    getCategories(): Promise<void>,
    create(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiPortuguesa>,
    update(category: Category): Promise<ResponseApiPortuguesa>,
    updateWithImage(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiPortuguesa>,
    remove(id: string): Promise<ResponseApiPortuguesa>
}

export const CategoryContext = createContext( {} as CategoryContextProps)

export const CategoryProvider = ( {children}: any) => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (categories.length === 0) {
            getCategories();
        }
    }, []);

    const getCategories = async(): Promise<void> => {
        const result = await GetAllCategoryUseCase();        
        setCategories(result);
    }

    const create = async (category: Category, file: ImagePicker.ImageInfo): Promise<ResponseApiPortuguesa> => {
        console.log(category);
        
        const response = await CreateCategoryUseCase(category, file!);
        getCategories();
        return response;
    }

    const update = async (category: Category): Promise<ResponseApiPortuguesa> => {
        const response = await UpdateCategoryUseCase(category);
        getCategories();
        return response;
    }
    
    const updateWithImage = async (category: Category, file: ImagePicker.ImageInfo): Promise<ResponseApiPortuguesa> => {
        const response = await UpdateWithImageCategoryUseCase(category, file);
        getCategories();
        return response;
    }

    const remove = async (id: string): Promise<ResponseApiPortuguesa> => {
        const response = await DeleteCategoryUseCase(id);
        getCategories();
        return response;
    }

    return (
        <CategoryContext.Provider value={{
            categories,
            getCategories,
            create,
            update,
            updateWithImage,
            remove
        }}>
            { children }
        </CategoryContext.Provider>
    )

}