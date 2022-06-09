import express from "express";
import protect from "../middleware/authMiddleware";
import verifyBody from "../middleware/inputValidationMiddleware";
import checkUserCounter from "../middleware/counterMiddleware";
import { getMovies, getMovieById, patchMovie, postMovie, putMovie } from "../controllers/movieController";

/**
 * @desc Router for movie routes. Provides one protected route that can be posted with: GET - to retrieve all movies by user id, POST - to create a new movie for the requesting User
 * @param {Express} app
 * @return {void} void
 */

const router = express.Router();

router
    .route("/")
    .get(protect, getMovies)
    .post(protect, verifyBody, checkUserCounter, postMovie)
    .patch(patchMovie)
    .put(putMovie);


// Not functional at the given moment
router
    .route('/:_id')
    .get(protect, getMovieById)

export { router as movieRouter };
