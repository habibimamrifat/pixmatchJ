import config from "../../config";
import createToken from "../../util/createToken";
import { Tuser } from "./user.interface";
import userModel from "./user.model";
import bcrypt from "bcrypt";

const createUser = async (user: Tuser) => {
    const newuser = new userModel(user);
    return newuser.save();

}
const logIn= async (email:string, password:string) => {
  // Fetch user with required fields and verify password
  const user = await userModel.findOne({ email }).lean();
  if (!user) throw new Error("Email or Password didn't match");

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) throw new Error("Password didn't match");


  // Tokenize user data
  console.log(user)

  const tokenizeData = {role: user.role };
  const approvalToken = createToken(tokenizeData, config.jwtTokennSecret as string, config.jwtTokennExireIn as string);
  const refreshToken = createToken(tokenizeData, config.jwtRefreshTokenSecret as string, config.jwtRefreshTokennExpireIn as string);

  return { approvalToken, refreshToken, approveLogIn: true };
}
const getAllUsers = async () => {
    const result = await userModel.find();
    return result;
}

const userServices = { createUser,logIn ,getAllUsers};
export default userServices;