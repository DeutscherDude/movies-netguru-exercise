import { Request, Response, NextFunction } from 'express';
import { provideStringEnvVar } from "../util/envProvider"

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