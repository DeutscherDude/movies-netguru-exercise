import Movie from '../models/movieModel';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/userModel';

const asyncHandler = require('express-async-handler');

interface IUserAuthInfo extends Request {
    user: {
        userId: Number;
        role: String;
    };
}

const postMovie = asyncHandler(async (req: Request, res: Response) => {
    let { title, released, genre, director } = req.body
    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title,
        released,
        genre,
        director
    })

    return movie.save()
        .then(result => {
            res.status(201).json({
                success: true,
                movie: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: error.message,
                error
            })
        })

})

const getMovies = asyncHandler(async (req: IUserAuthInfo, res: Response) => {
    if (req.user === null) {
        return res.status(401).json({
            message: 'User not found, please login with valid credentials',
            request: req.body
        })
    }
    else {
        Movie.find({ user: req.user.userId })
            .exec()
            .then((results) => {
                return res.status(200).json({
                    movies: results,
                    count: results.length,
                    request: req.user
                });
            })
            .catch((error) => {
                message: error.message,
                    error
            });
    }
});

export default { postMovie, getMovies };
