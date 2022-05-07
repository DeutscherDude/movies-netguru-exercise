import express from "express";
import movieController from "../controllers/movieController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router
    .route("/")
    .get(protect, movieController.getMovies)
    .post(protect, movieController.postMovie);

export { router as movieRouter };
