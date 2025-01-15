import express from "express";
import userRourer from "../modules/users/user.routs";
const router = express.Router();

const moduleRouter = [
  {
    path: "/user",
    router: userRourer,
  },
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
