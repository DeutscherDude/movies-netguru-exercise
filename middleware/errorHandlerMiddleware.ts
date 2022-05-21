import {Request, Response, NextFunction} from 'express';


const errorHandlerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Beep");
    next();
}

export default errorHandlerMiddleware;