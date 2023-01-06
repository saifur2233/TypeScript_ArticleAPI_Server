import express, { NextFunction, Request, Response } from "express";
import blogController from "../controllers/blogController";

const router = express.Router();

router.post("/blogs", blogController.createBlog);
router.get("/blogs/:blogId", blogController.getBlog);
router.get("/blogs", blogController.getAllBlogs);
router.patch("/blogs/:blogId", blogController.updateBlog);
router.delete("/blogs/:blogId", blogController.deleteBlog);

export = router;
