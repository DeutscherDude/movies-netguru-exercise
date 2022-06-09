import mongoose, { Connection } from 'mongoose';
import checkUserCounter, { getCreatedMovieCount } from '../counterMiddleware';
import { getMockReq } from '@jest-mock/express';
import { NextFunction } from "express";
import { StatusCodes } from '../../util/statusCodes';
import { provideStringEnvVar } from '../../util/envProvider';

describe('counterMiddleware functionality test', () => {
    let mockReq: any;
    let mockRes: any;
    const next: NextFunction = jest.fn();

    beforeAll(async () => {
        const mongoUri = provideStringEnvVar("MONGO_URI");
        await mongoose.connect(mongoUri);
    });

    beforeEach(async () => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn((...r) => {
                //
            })
        };
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Basic user with over 5 movies created gets a message that he can not create any more movies', async () => {
        mockReq = getMockReq({
            headers: {
                authorization: 'Bearer 123456789'
            },
            cookies: {
                user: {
                    _id: '6276f7011c3a78d41c04c65b',
                    role: "basic",
                    name: "Basic Thomas",
                    username: "basic-thomas",
                    password: "sR-_pcoow-27-6PAwCD8",
                }
            }
        });

        new Promise(() => {
            checkUserCounter(mockReq, mockRes, next);
        }).then(() => {
            expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(mockRes.json).toBeCalledWith({
                message: 'You can only create 5 movies per month',
            })
        });
    });

    it('Premium user can create more than 5 movies', async () => {
        mockReq = getMockReq({
            headers: {
                authorization: 'Bearer 123456789'
            },
            cookies: {
                user: {
                    _id: '6276f7011c3a78d41c04c65b',
                    role: "premium",
                    name: "Premium Thomas",
                    username: "premium-thomas",
                    password: "sR-_pcoow-27-6PAwCD8",
                }
            }
        });

        new Promise(() => {
            checkUserCounter(mockReq, mockRes, next);
        }).then(() => {
            expect(mockRes).not.toBeCalled();
            expect(mockReq).not.toBeCalled();
            expect(next).toBeCalled();
        });
    });

});

describe('getCreatedMovieCount counter test', () => {
    let db: Connection;
    let mockReq: any;
    let mockRes: any;

    beforeAll(async () => {
        const mongoUri = provideStringEnvVar("MONGO_URI");
        await mongoose.connect(mongoUri, { autoIndex: true });
        db = mongoose.connection;
    })

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn((...r) => {
                //
            })
        };
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Movie count before the creation of the account is 0', async () => {
        const userId = '6276f7011c3a78d41c04c65b';
        const firstDayOfMonth = new Date(2020, 1, 1);
        const lastDayOfMonth = new Date(2020, 1, 31);

        const count = await getCreatedMovieCount(userId, firstDayOfMonth, lastDayOfMonth);

        expect(count).toBe(0);
    });

    it('Movie count after the creation of the account is more than 0', async () => {
        const userId = '6276f7011c3a78d41c04c65b';
        const firstDayOfMonth = new Date(2022, 5, 1);
        const lastDayOfMonth = new Date(2022, 5, 30);
        const count = await getCreatedMovieCount(userId, firstDayOfMonth, lastDayOfMonth);

        expect(count).toBeGreaterThanOrEqual(1);
    });

})
