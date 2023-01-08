"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const userLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return;
    }
    User_1.default.findOne({ email: email })
        .then((user) => {
        //console.log(user?.password);
        if (password == (user === null || user === void 0 ? void 0 : user.password)) {
            const token = jsonwebtoken_1.default.sign({
                email: email,
            }, "saifur22", {
                expiresIn: process.env.JWT_EXPIRES_TIME,
            });
            return res
                .status(200)
                .cookie("macaron", token, {
                maxAge: 9000000 * 10000,
                httpOnly: true,
                secure: true,
            })
                .json({ user, token });
        }
        else {
            return res
                .status(500)
                .json({ message: "Username and Password don't match!" });
        }
    })
        .catch((error) => {
        return res.status(500).json({ error });
    });
};
const userRegistration = (req, res, next) => {
    const { name, email, phone, password } = req.body;
    const user = new User_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        email,
        phone,
        password,
    });
    console.log(user);
    const token = jsonwebtoken_1.default.sign({
        email: email,
    }, "saifur22", {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
    return user
        .save()
        .then((user) => res
        .status(201)
        .cookie("macaron", token, {
        maxAge: 9000000 * 10000,
        httpOnly: true,
        secure: true,
    })
        .json({ user, token }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    userLogin,
    userRegistration,
};
