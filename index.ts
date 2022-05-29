import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import logger from "./middleware/loggerMiddleware";
import { provideNumericStringEnvVar } from "./util/envProvider";
import { movieRouter } from "./routes/movie";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";

connectDB()
const port = provideNumericStringEnvVar("SERVER_PORT");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(logger);
app.use('/api/movie', movieRouter);

app.use(errorHandlerMiddleware)
app.use('/error', (req, res) => {
    res.send('Error handling test');
});

app.listen(port, () => { console.log(`Server started on port ${port}`) });

module.exports = app;
