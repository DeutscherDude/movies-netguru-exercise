import { NextFunction } from "express";
import errorHandlerMiddleware from "../errorHandlerMiddleware";

describe('Error Handler middleware functionality tests', () => {
    let mockReq: any;
    let mockRes: any;
    let mockError: Error;
    const next: NextFunction = jest.fn();

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            json: jest.fn((...r) => {
                //
            }),
            status: jest.fn(() => {
                return mockRes;
            }),
        };
    });

    it('error thrown will return error message, status code and in development an error stack', () => {
        mockReq = {
            headers: {}
        };

        mockError = new Error('test error');
        new Promise(() => {
            errorHandlerMiddleware(mockError, mockReq, mockRes, next);
        }).then(() => {
            expect(mockRes.status).toBeCalledWith(500);
            expect(mockRes.json).toBeCalledWith({
                status: 500,
                message: 'test error',
                stack: null
            })
            expect(next).toBeCalled();
        });

    })
})
