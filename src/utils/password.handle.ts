import { compare, hash } from "bcryptjs"

const ecrypts = async(pass:string) => {
    const passwordHash = await hash(pass,16)
    return passwordHash;
}
const verfied = async (pass:string, passHass:string) => {
    const isCorrect = await compare(pass,passHass);
    return isCorrect;
}

export{ecrypts,verfied}