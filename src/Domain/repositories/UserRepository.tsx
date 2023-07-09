import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiPortuguesa";
import { User } from "../entities/User";
import * as ImagePicker from 'expo-image-picker';

export interface UserRepository {
    updateWithoutImage(user: User): Promise<ResponseApiDelivery>;
    updateWithImage(user: User, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>;
    getDeliveryMen(user: User): Promise<User []>;
}