import { provideStringEnvVar } from "../util/envProvider";
import { StatusCodes } from "../util/statusCodes";
import { Request, Response } from "express";
import fetch from 'node-fetch';

const asyncHandler = require('express-async-handler');

/**
 * @desc Calls OMDB API to fetch a movie by the given title
 * @access private
 * @param req: express.Request
 * @param res: express.Response
 * @returns IOMDbPayload
 */
export const omdbGet = asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.body;
    const omdbApiUri = provideStringEnvVar("OMDB_API_URI");
    const omdbApiKey = provideStringEnvVar('OMDB_API_KEY');
    const fetched = await fetch(`${omdbApiUri}=${omdbApiKey}&t=${title}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res2 => {
            return res2.json();
        }
        )
        .catch((err: Error) => {
            res.status(StatusCodes.TEAPOT).json({
                message: 'Internal server error',
                error: err
            })
        }
        );
    return fetched;
})
