import { Auth } from "../interfaces/auth.interface";

export interface User extends Auth { 
    name:string,
    description:string
}