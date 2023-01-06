import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Blog from "../models/Blog";

const createBlog = (req: Request, res: Response, next: NextFunction) => {
  const { title, email, description } = req.body;

  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    title,
    email,
    description,
  });

  return blog
    .save()
    .then((blog) => res.status(201).json({ blog }))
    .catch((error) => res.status(500).json({ error }));
};

const getBlog = (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.params.blogId;

  return Blog.findById(blogId)
    .then((blog) =>
      blog
        ? res.status(200).json({ blog })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getAllBlogs = (req: Request, res: Response, next: NextFunction) => {
  return Blog.find()
    .then((blogs) => res.status(200).json({ blogs }))
    .catch((error) => res.status(500).json({ error }));
};

const updateBlog = (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.params.blogId;

  return Blog.findById(blogId)
    .then((blog) => {
      if (blog) {
        blog.set(req.body);

        return blog
          .save()
          .then((blog) => res.status(201).json({ blog }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteBlog = (req: Request, res: Response, next: NextFunction) => {
  const blogId = req.params.blogId;

  return Blog.findByIdAndDelete(blogId)
    .then((blog) =>
      blog
        ? res.status(201).json({ blog, message: "Blog Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createBlog,
  getBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
