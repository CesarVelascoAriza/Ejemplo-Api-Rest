import { actualizar, borrar, insetar, seleccionar } from "../config/pg";
import { Item } from "../models/item";

const addItem = async (item: Item) => {
    console.log("items ", item);
    const respnseAdd = await insetar(item, 'items')
    console.log(respnseAdd);
    return respnseAdd;
}
const getAll = async () => {
    const respnseItems = await seleccionar(null, 'items');
    return respnseItems
}
const getAllByid = async (id: number) => {
    const respnseItems = await seleccionar(id, 'items');
    return respnseItems
}
const update = async (id: number, item: Item) => {
    console.log(id);
    item.id = id;
    const respnseItems = await actualizar(item, 'items');
    return respnseItems
}
const deleteItemById = async (id: number) => {
    const respnseItems = await borrar(id,'items')
    return respnseItems
}
export { addItem, getAll, getAllByid ,update,deleteItemById}