import { Request, Response } from "express"
import { loginUser, resgistrarNewUser } from "../services/auth"

const registrerController = async (req: Request, res: Response) => {

    const { body } = req
    console.log(body)
    const responseUser = await resgistrarNewUser(body);
    res.send(responseUser);
}

const loginController = async (req: Request, res: Response) => {
    const { body } = req;
    const responseUser = await loginUser(body);
    console.log(responseUser)
    if (responseUser==='Usuario No existente') {
        res.status(202)
        res.send(responseUser)
    } else {
        res.send(responseUser)
    }
}

export { loginController, registrerController }