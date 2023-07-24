import { Request, Response, Router } from "express";
import { deleteItem, getItem, getItems, postItem, updateItem } from "../controllers/items";
import { logMiddleware } from "../middleware/log";
import { checkjwt } from "../middleware/session";

const router = Router();
router.get('/',checkjwt, getItems)
router.get('/:id',logMiddleware ,getItem)
router.post('/',checkjwt ,postItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

export { router };