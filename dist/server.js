"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const blogRoute_1 = __importDefault(require("./routes/blogRoute"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// connect to mongodb
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    console.log("MongoDB is Connected");
})
    .catch((error) => {
    console.log(error);
});
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
});
//Routes
app.use("/api/v1", authRoute_1.default);
app.use("/api/v1", userRoute_1.default);
app.use("/api/v1", blogRoute_1.default);
// Error handling
app.use("*", (req, res, next) => {
    const error = new Error("Not Found");
    console.log(error);
    return res.status(404).json({ message: error.message });
});
app.listen(port, () => {
    console.log("SERVER IS UP ON PORT:", port);
});
