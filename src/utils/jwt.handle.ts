import { sign,verify } from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET  || 'token.prueba.node';

const signToken =async (id:string) => {
    const jst = sign({id},jwt_secret,{algorithm:"HS512",expiresIn:"30M"})
    return jst
}

const verifyToken =  (token:string) => {
   return  verify(token,jwt_secret)
}

export {signToken,verifyToken}