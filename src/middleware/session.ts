import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwt.handle";
import { RequestExted } from "../interfaces/RequestExted";

const data = {
    'mensaje': 'Sesion No valida'
}

const checkjwt = (req: RequestExted, res: Response, nex: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || null;
        const jst = jwtByUser?.split(' ').pop();
        const isOK = verifyToken(`${jst}`);
        console.log(isOK)
        console.log(jst)
        console.log(jwtByUser)
        if (!isOK) {
            res.status(401)
            res.send(data);
        } else {
            req.user =isOK 
            nex()
        }

    } catch (error) {
        console.error("error",error)
        res.status(401)
        res.send(data);
    }
}


export { checkjwt }