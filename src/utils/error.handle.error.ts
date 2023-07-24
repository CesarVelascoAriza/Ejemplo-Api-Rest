import { Response } from "express";

export const handleHttp = (res: Response, err: string, errorRaw?: any) => {
    console.error(errorRaw);
    res.status(500);
    res.send({ err });

}
