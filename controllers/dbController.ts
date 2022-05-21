import Movie from '../models/movieModel';
import mongoose from 'mongoose';
import { IOMDbPayload, IUserAuthInfo } from "../interfaces/IRequests";
import { Response } from 'express';
import { StatusCodes } from '../util/statusCodes';

const asyncHandler = require('express-async-handler');

export const createMovie = asyncHandler(async (req: IUserAuthInfo, res: Response, fetched: IOMDbPayload ) => {
    const { Title, Released, Genre, Director } = fetched;
    if (Title === undefined || Released === undefined || Genre === undefined || Director === undefined) {
        return null;
    }
    
    const movie = new Movie({
        user: req.user?.id,
        _id: new mongoose.Types.ObjectId(),
        title: Title,
        released: Released,
        genre: Genre,
        director: Director
    })
    return movie.save()
})
