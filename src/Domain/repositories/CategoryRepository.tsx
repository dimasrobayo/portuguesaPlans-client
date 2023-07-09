import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiPortuguesa";
import { Category } from "../entities/Category";
import * as ImagePicker from 'expo-image-picker';

export interface CategoryRepository {
    create(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>;
}