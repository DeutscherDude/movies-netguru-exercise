import { verify, JwtPayload, Secret } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import User from "../models/userModel";

/**
 * Interaface IUserAuthInfo extends express Request to include user auth info
 * @interface IUserAuthInfo extends express.Request
 * @param {String} user.id
 * @param {String} user.name
 * @param {String} user.role
 * */

export interface IUserAuthInfo extends Request {
    user?: {
        id?: string;
        name?: string;
        role?: string;
    } | null;
}

/**
 * Interface IUserPayload extends JwtPayload to include user auth info
 * @interface IUserPayload extends JwtPayload
 * @param {String} id
 * @param {String} name
 * @param {String} role
**/

export interface IUserPayload extends JwtPayload {
    id: string;
    name: string;
    role: string;
}

/**
 * Strips the user password from the payload
 * @param user: IUserAuthInfo["user"]
 * @returns 
 */

function sanitizePayload(user: IUserAuthInfo["user"]): IUserAuthInfo["user"] {
    return {
        id: user?.id,
        name: user?.name,
        role: user?.role,
    };
}

/**
 * Asynchronous middleware, which verifies the user's JWT Token
 * @function protect
 * @param {Request: IUserAuthInfo} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {void}
 * */ 

const protect = asyncHandler(async (req: IUserAuthInfo, res: Response, next: NextFunction) => {
    let token: string | undefined = undefined;
    const secret = process.env.JWT_SECRET as Secret;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verify(token, secret) as IUserPayload;
            req.user = await User.findById(decoded.id);
            req.user = sanitizePayload(req.user);
            next();
        }
        catch (error) {
            res.status(401).json({
                message: 'Invalid token',
                req: req.headers.authorization,
                error
            })
        }
    }

    if (!token) {
        res.status(401).json({
            message: 'Authorization token is missing',
        })
    }

});

export default protect;
