import { Request, Response, NextFunction } from 'express';
import { provideStringEnvVar } from "../util/envProvider"

/**
 * This is a failsafe error handling middleware.
 * Upon receiving an internally unhandled error, this middleware will
 * return a JSON response with the error message and stack trace (if in development mode).
 * 
 * @param err: Error
 * @param req: express.Request 
 * @param res: express.Response
 * @param next: express.NextFunction
 */

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {

    const env = provideStringEnvVar("NODE_ENV");
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode).json({
        status: statusCode,
        message: err.message,
        stack: env === "development" ? err.stack : null
    })

    next();
}

export default errorHandlerMiddleware;