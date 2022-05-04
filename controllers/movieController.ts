import Movie from '../models/movieModel';

const asyncHandler = require('express-async-handler');

const postMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.create(req.body);
    res.status(201).json({
        success: true,
        data: movie
    });
})