import express from "express";
import movieController from "../controllers/movieController";

const router = express.Router();

router
    .route("/")
    .get(movieController.getMovies)
    .post(movieController.postMovie);

export { router as movieRouter };