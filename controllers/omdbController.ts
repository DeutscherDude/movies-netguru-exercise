import { IOMDbPayload } from "../interfaces/IRequests";
import { provideStringEnvVar } from "../util/envProvider";
import { StatusCodes } from "../util/statusCodes";
import { Request, Response } from "express";

const fetch = require("node-fetch");
const asyncHandler = require('express-async-handler');

export const omdbGet = asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.body;
    const omdbApiUri = provideStringEnvVar("OMDb_API_URI");
    const omdbApiKey = provideStringEnvVar('OMDb_API_KEY');
    const fetched = await fetch(`${omdbApiUri}=${omdbApiKey}&t=${title}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res2: IOMDbPayload) => {
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
