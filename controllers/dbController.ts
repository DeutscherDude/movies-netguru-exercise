import Movie from '../models/movieModel';
import User from '../models/userModel';
import mongoose from 'mongoose';
import {Request, Response} from 'express';

const asyncHandler = require('express-async-handler');

interface MovieDetails {
    title: string;
    released: string;
    genre: string;
    director: string;
}

export const createMovie = asyncHandler(async (req: Request, res: Response) => {

    
})
