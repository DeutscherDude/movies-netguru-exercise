import express from "express";
import { getMovies, postMovie } from "../controllers/movieController";
import protect from "../middleware/authMiddleware";

/**
 * @desc Router for movie routes. Provides one protected route that can be posted with: GET - to retrieve all movies by user id, POST - to create a new movie for the requesting User
 * @param {Express} app
 * @return {void} void
 */

const router = express.Router();

router
    .route("/")
    .get(protect, getMovies)
    .post(protect, postMovie);

export { router as movieRouter };
