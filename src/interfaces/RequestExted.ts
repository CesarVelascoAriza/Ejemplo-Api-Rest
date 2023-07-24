import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface RequestExted extends Request {
    user?: string | JwtPayload;
}