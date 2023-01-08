"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const blogController_1 = __importDefault(require("../controllers/blogController"));
const router = express_1.default.Router();
router.post("/blogs", blogController_1.default.createBlog);
router.get("/blogs/:blogId", blogController_1.default.getBlog);
router.get("/blogs", blogController_1.default.getAllBlogs);
router.patch("/blogs/:blogId", blogController_1.default.updateBlog);
router.delete("/blogs/:blogId", blogController_1.default.deleteBlog);
module.exports = router;
