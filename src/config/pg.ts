import "dotenv/config"
import { Client } from 'pg';
import { Item } from "../models/item";
import { User } from "../models/User";

const DBURI = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT) | 5432
})
let connetion: any;
const table = `create table items (
    id SERIAL primary key,
    nombre varchar(60),
    precio money,
    dateItem TIMESTAMP(50),
    descripcion varchar(50)
)`;
const tableUsuarios = `create table usuarios(
    name varchar(90),
    password varchar(7000),
    email varchar(90)
);`

async function connect(): Promise<void> {
    const connetion = await DBURI.connect();
    console.log(connetion)
    //console.log(await DBURI.query(tableUsuarios))
    //  DBURI.end()
}

async function insetar(params: Item, table: string): Promise<any> {

    console.log(connetion)
    const query = `insert into ${table}(nombre,precio,dateItem,descripcion) values ('${params.nombre}',${params.precio},'${params.dateItem}','${params.descripcion}') RETURNING *`
    console.log("param ", params)
    console.log("query ", query)
    const { rows } = await DBURI.query(query);
    console.log(rows[0])
    //await DBURI.end();
    return rows[0]


}
async function borrar(params: any, table: string) {
    const query = `delete from ${table} where id = ${params}`;
    console.log(query)
    return (await DBURI.query(query)).rows[0];

} async function actualizar(params: Item, table: string) {
    const query = `update ${table} set nombre = '${params.nombre}' , precio =${params.precio}, dateItem = '${params.dateItem}', descripcion='${params.descripcion}'  where id = ${params.id} RETURNING *`;
    console.log(query)
    console.log((await DBURI.query(query)).rows);
    return (await DBURI.query(query)).rows[0];
} async function seleccionar(params?: any, table?: string) {
    console.log(table, params);

    if (table && params) {
        const query = `select * from ${table} where id = ${params}`;
        console.log(query)
        return (await DBURI.query(query)).rows[0];
    }
    else {
        const query = `select * from ${table} `
        console.log(query)
        return (await DBURI.query(query)).rows;
    }

}
const buscarUsuario = async (email: string) => {
    console.log(await (DBURI.query(`select * from usuarios where email = '${email}'`)));
    return (await (DBURI.query(`select * from usuarios where email = '${email}'`))).rows[0]
}

const crearUsuario = async (user: User) => {
    console.log('user',user);
    console.log(`insert into usuarios (nombre, correo, password, description) values ('${user.name}','${user.email}','${user.password}','${user.description}') RETURNING *`);
    return (await DBURI.query(`insert into usuarios (name, email, password) values ('${user.name}','${user.email}','${user.password}') RETURNING *`)).rows[0]
}

export { connect, insetar, borrar, actualizar, seleccionar, buscarUsuario, crearUsuario };