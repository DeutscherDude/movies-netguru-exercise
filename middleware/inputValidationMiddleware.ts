import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from '../util/statusCodes';

const verifyBody = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;
    if (title === undefined || title === null || title === '') {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Title is required',
        });
    }
    else {
        next();
    }
})

export default verifyBody;
