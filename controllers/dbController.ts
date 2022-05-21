import Movie from '../models/movieModel';
import User from '../models/userModel';
import mongoose from 'mongoose';
import { IOMDbPayload, IUserAuthInfo } from "../interfaces/IRequests";
import {Request, Response} from 'express';

const asyncHandler = require('express-async-handler');

interface MovieDetails {
    title: string;
    released: string;
    genre: string;
    director: string;
}

export const createMovie = asyncHandler(async (req: IUserAuthInfo, res: Response, fetched: IOMDbPayload ) => {
    const { Title, Released, Genre, Director } = fetched;
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
