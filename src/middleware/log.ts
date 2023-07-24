import { NextFunction, Request, Response } from "express";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('hola soy el log Middleware')
    const headers = req.headers;
    
    console.log('hola mundo',headers['user-agent'])
    next()
}

export {logMiddleware}