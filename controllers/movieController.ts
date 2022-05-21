import Movie from '../models/movieModel';
import { Request, Response } from 'express';
import { StatusCodes } from '../util/statusCodes';
import { provideStringEnvVar } from '../util/envProvider';
import { IOMDbPayload, IUserAuthInfo } from '../interfaces/IRequests';
import { createMovie } from "./dbController";
import { omdbGet } from "./omdbController";

const asyncHandler = require('express-async-handler');

/**
 * Method for asynchronously creating a movie
 * @route POST /api/movie
 * @access Private
 * @return {Object} movie
 *  */ 

export const postMovie = asyncHandler(async (req: IUserAuthInfo, res: Response) => {
    // User validation check
    if (req.user === null) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Invalid token',
            req: req.headers.authorization
        })
    }
    else {
        // creating a movie and passing a omdb get request to await for
        createMovie(req, res, await omdbGet(req, res))
            .then((result: Response) => {
                if(result === null) {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        message: 'Invalid request body',
                        error: 'Missing movie details'
                });
             } else {
                res.status(StatusCodes.CREATED).json(result);
                }
            }
            );
    }

})

/**
 * @desc Get all movies by user id
 * @route GET /api/movie
 * @access Private
 * @return {Object[]} movies, count of movies
 *  */ 

export const getMovies = asyncHandler(async (req: IUserAuthInfo, res: Response) => {
    if (req.user === null) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'User not found, please login with valid credentials',
            request: req.headers
        })
    }
    else {
        await Movie.find({ user: req.user?.id })
            .exec()
            .then((results) => {
                return res.status(StatusCodes.OK).json({
                    movies: results,
                    count: results.length,
                });
            })
            .catch((error) => {
                return res.status(StatusCodes.NOT_FOUND).json({
                    error
                })
            });
    }
});

export const patchMovie = asyncHandler(async (req: Request, res: Response) => {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        message: 'Method not allowed'
    })
});

export const putMovie = asyncHandler(async (req: Request, res: Response) => {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        message: 'Method not allowed'
    })
});
