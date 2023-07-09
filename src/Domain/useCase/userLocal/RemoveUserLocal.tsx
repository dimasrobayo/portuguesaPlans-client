import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";

const { removeItem } = new UserLocalRepositoryImpl();

export const RemoveUserLocalUseCase = async () => {
    return await removeItem();
}