import Movie from '../models/movieModel';
import mongoose from 'mongoose';
import { IOMDbPayload, IUserAuthInfo } from "../interfaces/IRequests";
import { Response } from 'express';
import { StatusCodes } from '../util/statusCodes';

const asyncHandler = require('express-async-handler');


/**
 * Method for asynchronously creating a movie
 * @access Private
 * @param req: IUserAuthInfo, extends express.Request
 * @param res: express.Response
 * @param fethed: IOMDbPayload, extends express.Response
 * @param collection: optional string. Pass to create this document in a specific collection
 * @return {Object} movie
 */
export const createMovie = asyncHandler(async (req: IUserAuthInfo, res: Response, fetched: IOMDbPayload, collection: string) => {
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
    },
        {
            collection: collection
        })
    return movie.save()
})

/**
 * @desc Get all movies by user id
 * @access Private
 * @return {Object[]} movies, count of movies
 */
export const findMovie = asyncHandler(async (req: IUserAuthInfo, res: Response, collection?: string) => {
    if (collection === undefined){
        collection = 'movies'
    }

    await Movie.find({ user: req.user?.id }, { collection: collection })
        .exec()
        .then((result) => {
            return res.status(StatusCodes.OK).json({
                movies: result,
                count: result.length
            });
        })
        .catch((err) => {
            return res.status(StatusCodes.NOT_FOUND).json({
                err
            });
        });
});


/**
 * @desc Get a movie by id
 * @access Private
 * @param req: IUserAuthInfo, extends express.Request
 * @param res: express.Response
 * @param collection - optional string. Pass to find this document in a specific collection  
 * @return {Object} movie
 */
export const findMovieById = asyncHandler(async (req: IUserAuthInfo, res: Response, collection?: string) => {
    if (collection === undefined){
        collection = 'movies'
    }

    await Movie.find({
        user: req.user?.id,
        _id: req.params._id
    },
        {
            collection: collection
        })
        .exec()
        .then((result) => {
            return res.status(StatusCodes.OK).json(result);
        })
        .catch((err) => {
            return res.status(StatusCodes.NOT_FOUND).json({
                err
            });
        });
})
