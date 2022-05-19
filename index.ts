import express, { Express } from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import logger from "./middleware/loggerMiddleware";
import { provideNumericStringEnvVar } from "./util/envProvider";
import { movieRouter } from "./routes/movie";

dotenv.config()

connectDB()
const port = provideNumericStringEnvVar("SERVER_PORT");
const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(logger);
app.use('/api/movie', movieRouter);

app.listen(port, () => { console.log(`Server started on port ${port}`) });

module.exports = app;