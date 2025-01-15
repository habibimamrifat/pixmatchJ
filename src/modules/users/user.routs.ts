import express from "express";
import userController from "./user.controller";
import validator from "../../middleware/validator";
import  { userValidator } from "./user.validator";



const userRourer = express.Router();
userRourer.post("/creareUser",validator(userValidator.userValidatorSchema), userController.createUser);
userRourer.post("/login",validator(userValidator.userLogInValidatorSchema), userController.logIn);

export default userRourer;
