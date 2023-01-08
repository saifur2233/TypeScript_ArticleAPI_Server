"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protectRoutesCreateBlog = (req, res, next) => {
    let token;
    if (req.cookies["macaron"]) {
        token = req.cookies["macaron"];
    }
    else {
        token = "";
    }
    if (token == "") {
        return;
    }
    const decoded = jsonwebtoken_1.default.verify(token, "saifur22");
    const { email } = decoded;
    req.body.email = email;
    next();
};
exports.default = protectRoutesCreateBlog;
