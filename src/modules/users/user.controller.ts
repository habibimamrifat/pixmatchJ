import { Request, Response } from "express";
import asyncCatch from "../../util/asyncCatch";
import userServices from "./user.services";
import config from "../../config";

const createUser = asyncCatch(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await userServices.createUser(req.body);
  res.status(200).json(result);
});
const logIn = asyncCatch(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("Login Payload:", { email }); // Minimal logging for debugging

  const { approvalToken, refreshToken} = await userServices.logIn(email, password);

  res.cookie("refreshToken", refreshToken, {
    secure: config.Node_env === "production",
    httpOnly: true,
    sameSite: "strict", // Extra CSRF protection
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    body: { approvalToken,refreshToken}
  });
});

const getAllUsers = asyncCatch(async (req: Request, res: Response) => {
const result = await userServices.getAllUsers();
res.status(200).json(result);
});

const userController = { createUser,logIn,getAllUsers };
export default userController;
