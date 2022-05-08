import { verify, JwtPayload, Secret } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import User from "../models/userModel";

// @interface IUserAuthInfo extends express.Request
// @param {String} user.id
// @param {String} user.name
// @param {String} user.role

interface IUserAuthInfo extends Request {
    user?: {
        id?: String;
        name?: String;
        role?: String;
    } | null;
}

// @interface IUserPayload extends JwtPayload
// @param {String} id
// @param {String} name
// @param {String} role

interface IUserPayload extends JwtPayload {
    id: String;
    name: String;
    role: String;
}


function sanitizePayload(user: IUserAuthInfo["user"]): IUserAuthInfo["user"] {
    return {
        id: user?.id,
        name: user?.name,
        role: user?.role,
    };
}

// @function protect
// @desc Protect routes
// @param {Request: IUserAuthInfo} req
// @param {Response} res
// @param {NextFunction} next
// @return {void}

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
