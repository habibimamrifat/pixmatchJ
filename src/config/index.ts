import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.port,
  Mongoose_uri: process.env.DBUri,
  BcryptSalt: process.env.BcryptSalt,
  Node_env: process.env.NODE_ENV,
  jwtTokennSecret: process.env.jwtTokenSecret,
  jwtRefreshTokenSecret: process.env.jwtRefreshTokenSecret,
  jwtTokennExireIn: process.env.jwtTokennExireIn,
  jwtRefreshTokennExpireIn: process.env.jwtRefreshTokennExpireIn,
};
export default config;
