import { buscarUsuario, crearUsuario } from "../config/pg"
import { Auth } from "../interfaces/auth.interface"
import { User } from "../models/User";
import { signToken } from "../utils/jwt.handle";
import { ecrypts, verfied } from "../utils/password.handle";

const resgistrarNewUser = async (authUser: User) => {
    console.log(authUser)
    const checkIs = await buscarUsuario(authUser.email);
    console.log(checkIs)
    if (checkIs) {
        return '{"user":"Usuario ya existente" }';
    } else {
        const passEn = await ecrypts(authUser.password);
        authUser.password = passEn;
        const registrarUsuario = await crearUsuario(authUser);
        return registrarUsuario
    }
}

const loginUser = async ({ email, password }: Auth) => {
    const checkIs = await buscarUsuario(email);
    console.log(checkIs)
    if (!checkIs) {
        return `{"user": "${email}","err":"Usuario No existente" }`;
    } else {
        const passwordHass = checkIs.password
        const isCorrect = await verfied(password, passwordHass);
        if (!isCorrect) return `{"user": "${email}", "err":"passwor inconrrecto"}`;
        else { 
            const token = signToken(checkIs.email)
            const data ={
                token: await token,
                usuario:checkIs
            }
            return data
        }

    }
}

export { resgistrarNewUser, loginUser }