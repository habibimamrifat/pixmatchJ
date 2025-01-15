import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";

const userSchema=new Schema<Tuser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
})

const userModel=model("User",userSchema);
export default userModel;