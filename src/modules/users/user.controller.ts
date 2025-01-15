import { Request, Response } from 'express';

const createUser = async (req: Request, res: Response) => {
    try {
      // Your logic to create a user
      console.log(req.body);
      res.status(201).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const userController = { createUser };
export default userController;
