import express from "express";
import userController from "./user.controller";
import validator from "../../middleware/validator";
import userValidatorSchema from "./user.validator";



const userRourer = express.Router();
userRourer.post("/creareUser",validator(userValidatorSchema), userController.createUser);

export default userRourer;
