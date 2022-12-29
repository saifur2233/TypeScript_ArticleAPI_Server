"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUser = (req, res, next) => {
    return res.status(200).json({ message: "Hello test 2" });
};
exports.default = {
    getUser,
};
