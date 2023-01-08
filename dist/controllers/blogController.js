"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Blog_1 = __importDefault(require("../models/Blog"));
const createBlog = (req, res, next) => {
    const { title, email, description } = req.body;
    const blog = new Blog_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        email,
        description,
    });
    return blog
        .save()
        .then((blog) => res.status(201).json({ blog }))
        .catch((error) => res.status(500).json({ error }));
};
const getBlog = (req, res, next) => {
    const blogId = req.params.blogId;
    return Blog_1.default.findById(blogId)
        .then((blog) => blog
        ? res.status(200).json({ blog })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const getAllBlogs = (req, res, next) => {
    return Blog_1.default.find()
        .then((blogs) => res.status(200).json({ blogs }))
        .catch((error) => res.status(500).json({ error }));
};
const updateBlog = (req, res, next) => {
    const blogId = req.params.blogId;
    return Blog_1.default.findById(blogId)
        .then((blog) => {
        if (blog) {
            blog.set(req.body);
            return blog
                .save()
                .then((blog) => res.status(201).json({ blog }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteBlog = (req, res, next) => {
    const blogId = req.params.blogId;
    return Blog_1.default.findByIdAndDelete(blogId)
        .then((blog) => blog
        ? res.status(201).json({ blog, message: "Blog Deleted" })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createBlog,
    getBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
};
