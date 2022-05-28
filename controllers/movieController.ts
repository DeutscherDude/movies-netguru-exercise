import { Request, Response } from 'express';
import { StatusCodes } from '../util/statusCodes';
import { IUserAuthInfo } from '../interfaces/IRequests';
import { createMovie, findMovie, findMovieById } from "./dbController";
import { omdbGet } from "./omdbController";

const asyncHandler = require('express-async-handler');

/**
 * Method for asynchronously creating a movie
 * @route POST /api/movie
 * @access Private
 * @return {Object} movie
 *  */ 

export const postMovie = asyncHandler(async (req: IUserAuthInfo, res: Response, collection?: string) => {
    // creating a movie and passing a omdb get request to await for
    if (collection === undefined) {
        collection = 'movies'
    }
    
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
        })
})

/**
 * @desc Get all movies by user id
 * @route GET /api/movie
 * @access Private
 * @return {Object[]} movies, count of movies
 *  */ 

export const getMovies = asyncHandler(async (req: IUserAuthInfo, res: Response, collection?: string) => {
    if (collection === undefined) {
        collection = 'movies'
    }
    findMovie(req, res, collection);
});

/**
 * @desc Get a movie by id
 * @route GET /api/movie/:id
 * @access Private
 * @return {Object} movie
 */
export const getMovieById = asyncHandler(async (req: Request, res: Response, collection?: string) => {
    if (collection === undefined) {
        collection = 'movies'
    }
    findMovieById(req, res, collection);
});

/**
 * @desc Method not implemented: Update a movie by id
 * @route PATCH /api/movie/:id
 * @access Public
 */
export const patchMovie = asyncHandler(async (req: Request, res: Response) => {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        message: 'Method not allowed'
    })
});

/**
 * @desc Method not implemented: Update a movie by id
 * @route PUT /api/movie/:id
 * @access Public
 */
export const putMovie = asyncHandler(async (req: Request, res: Response) => {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        message: 'Method not allowed'
    })
});
