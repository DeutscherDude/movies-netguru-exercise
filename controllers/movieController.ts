import Movie from '../models/movieModel';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/userModel';

const asyncHandler = require('express-async-handler');

// @interface IUserAuthInfo extends express.Request
// @param {String} user.id
// @param {String} user.name
// @param {String} user.role

interface IUserAuthInfo extends Request {
    user?: {
        id?: String;
        name?: String;
        role?: String;
    };
}

// @desc Create a movie
// @route POST /api/movie
// @access Private
// @return {Object} movie

const postMovie = asyncHandler(async (req: IUserAuthInfo, res: Response) => {
    // User validation check
    if (req.user === null){
        res.status(401).json({
            message: 'Invalid token',
            req: req.headers.authorization
        })
    }
    else{
        // Request body descructuring and movie creation
        let { title, released, genre, director } = req.body
        const movie = new Movie({
            user: req.user?.id,
            _id: new mongoose.Types.ObjectId(),
            title,
            released,
            genre,
            director
        })
        // Saving the movie in the DB
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
    }

})

// @desc Get all movies by user id
// @route GET /api/movie
// @access Private
// @return {Object[]} movies, count of movies

const getMovies = asyncHandler(async (req: IUserAuthInfo, res: Response) => {
    if (req.user === null) {
        return res.status(401).json({
            message: 'User not found, please login with valid credentials',
            request: req.headers
        })
    }
    else {
        await Movie.find({ user: req.user?.id })
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
                    req.user,
                    error
            });
    }
});

export default { postMovie, getMovies };
