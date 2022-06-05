import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import logger from "./middleware/loggerMiddleware";
import { provideStringEnvVar } from "./util/envProvider";
import { movieRouter } from "./routes/movie";
import { healthcheckRouter } from "./routes/healthcheck";
import { notFoundRouter } from "./routes/notFound";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";

connectDB()
const port = parseInt(provideStringEnvVar("SERVER_PORT"));
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(logger);

// Routings
app.use('/api/movie', movieRouter);
app.use('/api/healthcheck', healthcheckRouter);
app.use('/api', notFoundRouter);

app.use(errorHandlerMiddleware)

app.listen(port, () => { console.log(`Server started on port ${port}`) });

module.exports = app;
