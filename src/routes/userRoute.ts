import express, { NextFunction, Request, Response } from "express";
import userController from "../controllers/userController";

const router = express.Router();
console.log("Hello test 1");
router.get("/users", userController.getUser);

export = router;
