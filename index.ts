import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import { movieRouter } from "./routes/movie";

dotenv.config()

connectDB()
const port = process.env.SERVER_PORT || 5000;
const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/movie', movieRouter);

app.listen(port, () => { console.log(`Server started on port ${port}`) });

module.exports = app;