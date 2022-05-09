import express from "express";
import movieController from "../controllers/movieController";
import protect from "../middleware/authMiddleware";

/**
 * @desc Router for movie routes. Provides one protected route that can be posted with: GET - to retrieve all movies by user id, POST - to create a new movie for the requesting User
 * @param {Express} app
 * @return {void}
 */

const router = express.Router();

router
    .route("/")
    .get(protect, movieController.getMovies)
    .post(protect, movieController.postMovie);

export { router as movieRouter };
