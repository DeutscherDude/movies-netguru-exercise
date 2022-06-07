import express from "express";
import { getMovies, getMovieById, patchMovie, postMovie, putMovie } from "../controllers/movieController";
import protect from "../middleware/authMiddleware";
import verifyBody from "../middleware/inputValidationMiddleware";

/**
 * @desc Router for movie routes. Provides one protected route that can be posted with: GET - to retrieve all movies by user id, POST - to create a new movie for the requesting User
 * @param {Express} app
 * @return {void} void
 */

const router = express.Router();

router
    .route("/")
    .get(protect, getMovies)
    .post(protect, verifyBody, postMovie)
    .patch(patchMovie)
    .put(putMovie);


// Not functional at the given moment
router
    .route('/:_id')
    .get(protect, getMovieById)

export { router as movieRouter };
