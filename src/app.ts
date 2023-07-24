import "dotenv/config"
import express from "express";
import cors from "cors";
import {router} from './routes'
import {connect} from "./config/pg";
///
const PORT = process.env.port || 3001;

///
const app = express();
app.use(cors({
    origin:['*']
}));

app.use(express.json());

app.use(router);
connect().then(()=>console.log("connet on ready"))

///abrir el puerto 
app.listen(PORT,()=> console.log(`Listen por el puerto ${PORT}`) )