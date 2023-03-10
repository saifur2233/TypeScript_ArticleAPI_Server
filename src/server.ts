import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import blogRoute from "./routes/blogRoute";
import mongoose from "mongoose";
import { config } from "./config/config";

const app: Application = express();
const port: number | string = process.env.PORT || 5000;

// connect to mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ message: "Hello World!" });
});

//Routes
app.use("/api/v1", authRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", blogRoute);

// Error handling
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  console.log(error);

  return res.status(404).json({ message: error.message });
});

app.listen(port, (): void => {
  console.log("SERVER IS UP ON PORT:", port);
});
