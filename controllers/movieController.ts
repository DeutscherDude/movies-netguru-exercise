import Movie from '../models/movieModel';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

const asyncHandler = require('express-async-handler');
const fetch = require("node-fetch");

/**
 * Interface IUserAuthInfo extends express.Request
 * @param {String} user.id
 * @param {String} user.name
 * @param {String} user.role
 * */ 

export interface IUserAuthInfo extends Request {
    user?: {
        id?: string;
        name?: string;
        role?: string;
    };
}

/**
 * Interface IOMovie extends Response
 * @param {String} Title
 * @param {String} Year
 * @param {String} Rated
 * @param {String} Released
 * @param {String} Runtime
 * @param {String} Genre
 * @param {String} Director
 * @param {String} Writer
 * @param {String} Actors
 * @param {String} Plot
 * @param {String} Language
 * @param {String} Country
 * @param {String} Awards
 * @param {String} Poster
 * @param {Object} Ratings
 * @param {String} Metascore
 * @param {String} imdbRating
 * @param {String} imdbVotes
 * @param {String} imdbID
 * @param {String} Type
 * @param {String} DVD
 * @param {String} BoxOffice
 * @param {String} Production
 * @param {String} Website
 * @param {String} Response    
 *  */ 

export interface IOMDbPayload extends Response {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
        Source: string;
        Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

/**
 * Method for asynchronously creating a movie
 * @route POST /api/movie
 * @access Private
 * @return {Object} movie
 *  */ 

export const postMovie = asyncHandler(async (req: IUserAuthInfo, res: Response) => {
    // User validation check
    if (req.user === null) {
        res.status(401).json({
            message: 'Invalid token',
            req: req.headers.authorization
        })
    }
    else {
        // Request body descructuring and movie creation
        const { title } = req.body;
        const fetched = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.OMDb_API_KEY}&t=${title}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res2: IOMDbPayload) => {
                return res2.json();
            })
            .catch((err: Error) => {
                console.log(err);
                res.status(500).json({
                    message: 'Internal server error',
                    error: err
                })
            });
        const { Title, Released, Genre, Director } = fetched;
        const movie = new Movie({
            user: req.user?.id,
            _id: new mongoose.Types.ObjectId(),
            title: Title,
            released: Released,
            genre: Genre,
            director: Director
        })
        // Saving the movie in the DB
        return movie.save()
            .then(result => {
                res.status(201).json({
                    success: true,
                    movie: result,
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

/**
 * @desc Get all movies by user id
 * @route GET /api/movie
 * @access Private
 * @return {Object[]} movies, count of movies
 *  */ 

export const getMovies = asyncHandler(async (req: IUserAuthInfo, res: Response) => {
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
                });
            })
            .catch((error) => {
                message: error.message,
                    error
            });
    }
});
