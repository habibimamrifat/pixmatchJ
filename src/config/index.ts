import dotenv from "dotenv"
import path from "path"
dotenv.config({path:path.join(process.cwd(),".env")})

const config ={
port:process.env.port,
Mongoose_uri:process.env.DBUri,
BcryptSalt:process.env.BcryptSalt
}
export default config