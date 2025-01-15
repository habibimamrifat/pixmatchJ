import express from "express";
import userController from "./user.controller";



const userRourer = express.Router();
userRourer.post("/creareUser", userController.createUser);

export default userRourer;
