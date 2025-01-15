import { Tuser } from "./user.interface";
import userModel from "./user.model";

const createUser = async (user: Tuser) => {
    const newuser = new userModel(user);
    return newuser.save();

}

const userServices = { createUser };
export default userServices;