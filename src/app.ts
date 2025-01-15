import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandeler from "./middleware/globalErrorHandler";
import routeNotFound from "./middleware/routNotFoundHandler";
import router from "./routes";

const app: Application = express();

// perser
app.use(express.json());
//middleware
app.use(cors());

// router 
app.use("/api/v1",router)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandeler)
app.use(routeNotFound)

export default app;
