import { Request, Response, Router } from "express";
import { readdirSync } from "fs";


const PHAT_ROUTER = `${__dirname}`;

const router = Router();

const cleanFileName = (fileName: string) => {
    const file = fileName.split('.').shift()
    return file
}

readdirSync(PHAT_ROUTER).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if (cleanName !== 'index') {
        import(`./${cleanName}`).then((moduleRouter)=>{
            console.log(`se esta cargando la ruta /${cleanName}`);
            router.use(`/${cleanName}`,moduleRouter.router)
        })
       // router.use(`/${cleanName}`)
    }
});
export { router };