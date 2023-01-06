import express, { NextFunction, Request, Response } from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.get("/users/:userId", userController.getUser);
router.get("/users", userController.getAllUsers);
router.patch("/users/:userId", userController.updateUser);
router.delete("/users/:userId", userController.deleteUser);

export = router;
