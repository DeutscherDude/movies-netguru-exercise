import { getMockReq } from '@jest-mock/express';
import { NextFunction } from "express";
import protect from '.././authMiddleware';

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
            expect(next).toHaveBeenCalled();
        })
    })
});
