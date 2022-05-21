import express, {Request, Response} from "express";
import { getMovies, getMovieById, patchMovie, postMovie, putMovie } from "../controllers/movieController";
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
    .post(protect, postMovie)
    .patch(patchMovie)
    .put(putMovie);


// Not functional at the given moment
router
    .route('/:movie_id')
    .get(protect, (req: Request, res: Response) => {
        res.status(200).json(req.params.movie_id);
    })

export { router as movieRouter };
