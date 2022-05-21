import { getMovies, postMovie } from './movieController';
import mongoose, { Connection } from "mongoose";
import Movie from "../models/movieModel";
import { provideStringEnvVar } from '../util/envProvider';

describe('movieController functionality tests', () => {
    let mockReq: any;
    let mockRes: any;
    let db: Connection;
    const mongoUri = provideStringEnvVar("MONGO_URI");
    const movie = Movie;
    const collection = "test_movies";

    beforeAll(async () => {
        await mongoose.connect(mongoUri);
        db = mongoose.connection;
        await db.createCollection(collection);
    })

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            json: jest.fn(() => {
                // 
            }),
            status: jest.fn(() => {
                return mockRes;
            })
        };
    })

    afterAll(async () => {
        await db.dropCollection(collection);
        await db.close();
        await mongoose.connection.close();
    })

    it("should create a movie", async () => {
        mockReq = {
            body: {
                title: "Belle",
            },
            user: {
                // Basic Thomas' user id
                id: "6276f7011c3a78d41c04c65b"
            }
        }

        new Promise(() => {
            postMovie(mockReq, mockRes);
        }).then(() => {
            expect(mockRes.json).toBeCalledWith({
                success: true,
                movie: {
                    title: "Belle",
                    released: "13 Jun 2014",
                    genre: "Biography, Drama, Romance",
                    director: "Amma Asante",
                }
            });
        })
    })

    it("should throw error in creating a movie", async () => {
        mockReq = {
            body: {
                title: "testttt",
            },
            user: {
                // Basic Thomas' user id
                id: "6276f7011c3a78d41c04c65b"
            }
        }

        new Promise(() => {
            postMovie(mockReq, mockRes);
        }).then(() => {
            expect(mockRes.status).toBeCalledWith({
                "Response": "False",
                "Error": "Movie not found!",
            })
        })
    })

    it("should return movies created by Basic Thomas", async () => {
        mockReq = {
            user: {
                // Basic Thomas' user id
                id: "6276f7011c3a78d41c04c65b"
            }
        }

        new Promise(() => {
            getMovies(mockReq, mockRes);
        }
        ).then(() => {
            expect(mockRes.json).toBeCalledWith({
                success: true,
            });
        })
    });

    it("should return status 401 - no user token", async () => {
        mockReq = {}
        new Promise(() => {
            getMovies(mockReq, mockRes)
        }).then(() => {
            expect(mockRes.json).toBeCalledWith({
                message: "User not found, please login with valid credentials"
            })
        })
    })

    it("should throw error in searching for a non-existant movie", async () => {
        try {
            await movie.find({
                title: "I don't exist"
            });
        }
        catch (error) {
            expect(error)
        }
    });
})