import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/login", authController.userLogin);
router.post("/signup", authController.userRegistration);
export = router;
