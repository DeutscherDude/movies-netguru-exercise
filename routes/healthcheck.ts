import express, { Request, Response } from "express";
import { StatusCodes } from "../util/statusCodes";

const router = express.Router();

router.route('/').get((req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: "Server online"
    })
});

router.all('*', (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json({
        message: "Status 404, not found"
    })
});


export { router as healthcheckRouter };