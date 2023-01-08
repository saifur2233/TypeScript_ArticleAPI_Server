"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.get("/users/:userId", userController_1.default.getUser);
router.get("/users", userController_1.default.getAllUsers);
router.patch("/users/:userId", userController_1.default.updateUser);
router.delete("/users/:userId", userController_1.default.deleteUser);
module.exports = router;
