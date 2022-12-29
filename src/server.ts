import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRoute from "./routes/userRoute";

const app: Application = express();

const PORT: number = 4000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ message: "Hello World!" });
});

//Routes
app.use("/api/v1", userRoute);

app.listen(PORT, (): void => {
  console.log("SERVER IS UP ON PORT:", PORT);
});
