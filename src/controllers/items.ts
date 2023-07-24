import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle.error"
import { addItem, getAll, getAllByid, update, deleteItemById } from "../services/itemServieces"
import { RequestExted } from "../interfaces/RequestExted"


const message = ["ERROR_GETITEM", 'Error getItems', 'error update items', 'error post items', 'error delete items']

const getItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log(id)
        const respnseItem = await getAllByid(Number(id));
        if (respnseItem) {
            console.log(respnseItem)
            res.send(respnseItem);
        } else
            res.status(204)
        res.send()
    } catch (error) {
        handleHttp(res, message[0])
    }
}
const getItems = async (req: RequestExted, res: Response) => {
    try {
        const respnseItem = await getAll();
        console.log("Request extd user",req.user);
        res.send(respnseItem);
    } catch (error) {
        handleHttp(res, message[1], error)
    }
}
const updateItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { body } = req
        console.log(id)
        const respnseItem = await update(Number(id), body)
        res.send(respnseItem);
    } catch (error) {
        handleHttp(res, message[2])
    }
}
const postItem = async (req: Request, res: Response) => {
    try {
        const { body } = req
        console.log("body controller", body)
        const respnseItem = await addItem(body);
        console.log("respnseItem", respnseItem)
        res.send(respnseItem);
        //res.send(body);
    } catch (error) {
        handleHttp(res, message[3], error);
    }
}
const deleteItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log(id)
        const respnseItem = await deleteItemById(Number(id));
        res.send(respnseItem);

    } catch (error) {
        handleHttp(res, message[4], error)
    }
}


export { getItem, getItems, updateItem, postItem, deleteItem };