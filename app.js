import express from "express";
import cookieParser from "cookie-parser";
import router from "./router.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(router);

export default app;