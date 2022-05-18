import { Request, Response, NextFunction } from 'express';
import { timeConverter } from '../util/timeConverter';
import * as fs from 'fs';

class logAppendingError extends Error {}

/**
 * @desc Simple logger middleware that returns the time of the request, http method and response status code.
 * @param req: express.Request 
 * @param res: express.Response
 * @param next: express.NextFunction
 */

const logger = (req: Request, res: Response, next: NextFunction) => {
    let log: string;
    const currentDate = new Date();

    // on finish logs the response
    res.on("finish", () => {
        const formattedDate = timeConverter(currentDate);
        const method = req.method;
        const url = req.url;
        const status = res.statusCode;
        log = `[${formattedDate}] ${method}:${url} ${status}`;
        console.log(log);

        fs.appendFile("request_logs.txt", log + "\n", err => {
            if (err) {
                console.log(logAppendingError);
            }
        })
    });
    next();
}

export default logger;