import Movie from '../models/movieModel';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

const asyncHandler = require('express-async-handler');

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
                mvoie: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: error.message,
                error
            })
        })

})

const getMovies = asyncHandler(async (req: Request, res: Response) => {
    Movie.find()
        .exec()
        .then((results) => {
            return res.status(200).json({
                movies: results,
                count: results.length
            });
        })
        .catch((error) => {
            message: error.message,
                error
        });
});

export default { postMovie, getMovies };