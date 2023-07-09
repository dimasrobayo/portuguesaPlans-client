import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository"; 
import { Login } from "../../entities/Login";

const { login } = new AuthRepositoryImpl();

export const LoginAuthUseCase = async (email: string, password: string) => {
    return await login(email, password)
}