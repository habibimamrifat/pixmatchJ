import { Request, Response } from "express";
import asyncCatch from "../../util/asyncCatch";
import userServices from "./user.services";

const createUser = asyncCatch(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await userServices.createUser(req.body);
  res.status(200).json(result);
});

const userController = { createUser };
export default userController;
