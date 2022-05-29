import { getMockReq } from '@jest-mock/express';
import { NextFunction } from "express";
import { StatusCodes } from '../../util/statusCodes';
import protect, { sanitizePayload } from '.././authMiddleware';
import User from "../../models/userModel";

describe('authMiddleware functionality test', () => {
    let mockReq: any;
    let mockRes: any;
    const next: NextFunction = jest.fn();

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn((...r) => {
                //
            })           
        };
    });

    it('no authorization header returns missing auth token message', () => {
        new Promise (() => {
            protect(mockReq, mockRes, next);
        }).then(() => {
            expect(mockRes.json).toBeCalledWith({
                message: 'Authorization token is missing',
        })
        });
    })

    it('should call next if user is logged in', () => {
        mockReq = getMockReq({
            headers: {
                authorization: 'Bearer 123456789'
            },
            cookies: {
                user: {
                    _id: '5e9f8f8f8f8f8f8f8f8f8f8',
                    email: 'test@test.com',
                    name: 'test',
                    password: 'test',
                    role: 'basic',
                }
            }
        });
        new Promise (() => {
            protect(mockReq, mockRes, next);
        }).then(() => {
            expect(mockReq.user).toBeInstanceOf(User);
            expect(next).toHaveBeenCalled();
        })
    })

    it('sanitizePayload function returns sanitized user details', () => {
        const user = {
            id: '5e9f8f8f8f8f8f8f8f8f8f8',
            name: 'test',
            email: 'jp2@gmd.vaticano',
            password: 'test',
            role: 'basic',
        };
        
        let res = sanitizePayload(user);
        expect(res).toEqual({
            id: '5e9f8f8f8f8f8f8f8f8f8f8',
            name: 'test',
            role: 'basic'
        });
    });

    it('token not containing a user returns UNAUTHORIZED status code', () => {
        mockReq = getMockReq({
            headers:{
                authorization: 'Bearer 123456789'
            },
            cookies: {
                user: null
            }
        })
        new Promise (() => {
            protect(mockReq, mockRes, next);

        }).then(() => {
            expect(mockRes.status).toBeCalledWith(StatusCodes.UNAUTHORIZED);
            expect(mockRes.status).toBeCalledWith(StatusCodes.UNAUTHORIZED);
            expect(mockRes.json).toBeCalledWith({
                message: 'Invalid token',
            })
        })
    })

});
