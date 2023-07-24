import { Router } from "express";
import { loginController, registrerController } from "../controllers/auth";

const router = Router()

router.post('/registrer',registrerController);
router.post('/login',loginController)

export {router};