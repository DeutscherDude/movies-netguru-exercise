import Movie from '../models/movieModel'
import asyncHandler from 'express-async-handler';
import { getFirstDayOfMonth, getLastDayOfMonth } from '../util/timeProvider';
import { Response, NextFunction } from 'express';
import { IUserAuthInfo } from './../interfaces/IRequests';
import { StatusCodes } from '../util/statusCodes';

const checkUserCounter = asyncHandler(async (req: IUserAuthInfo, res: Response, next: NextFunction) => {
    if (req.user!.role === 'basic') {
        const moviesCount = await getCreatedMovieCount(req.user!.id!, getFirstDayOfMonth(), getLastDayOfMonth());

        if (moviesCount >= 5) {
            res.status(StatusCodes.BAD_REQUEST).send({
                message: 'You can only create 5 movies per month'
            });
        } else {
            next();
        }
    } else {
        next()
    }
})

/**
 * @desc Get the number of movies created by a user
 * @param userId : string
 * @param firstDayOfMonth : Date
 * @param lastDayOfMonth : Date
 * @returns count of movies created by user
 */
export async function getCreatedMovieCount (userId: string, firstDayOfMonth: Date, lastDayOfMonth: Date) {
    return Movie.find({
        user: userId,
        createdAt: {
            $gte: firstDayOfMonth,
            $lt: lastDayOfMonth
        }
    }).count();
}


export default checkUserCounter;
