import { getMockReq, getMockRes } from '@jest-mock/express';
import { NextFunction } from "express";
import protect from '../middleware/authMiddleware';

describe('authMiddleware functionality test', () => {
    let mockReq: any;
    let mockRes: any;
    let next: NextFunction = jest.fn();

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn(),
            json: jest.fn(),
        };
    });

    it('no authorization header returns error', () => {
        mockReq = {
            headers: {}
        }

        protect(mockReq, mockRes, next);
        expect(mockRes.json).toBeCalledWith({
            message: 'Authorization token is missing',
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
        mockRes = getMockRes();
        protect(mockReq, mockRes, next);
        expect(next).toHaveBeenCalled();
    })
});
