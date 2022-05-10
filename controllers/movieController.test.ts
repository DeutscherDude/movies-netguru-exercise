import { getMockReq, getMockRes } from '@jest-mock/express';
import movieController from '../controllers/movieController';
import mongoose, { Connection, Collection, Mongoose } from "mongoose";
import { Response } from "express";
import Movie from "../models/movieModel";
import * as dotenv from "dotenv";

describe('movieController functionality tests', () => {
    let mockReq: any;
    let mockRes: any;
    let connection: any;
    let db: Connection;
    const movie = Movie;
    dotenv.config();

    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/movies");
        db = mongoose.connection;
        const collection: string = "test_movies";
        await db.createCollection(collection);
    })

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            json: function(){},
            status: jest.fn(responseStatus => {
                return mockRes;
            })
        };
    })

    afterAll(async () => {
        const collection: string = "test_movies";
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
            movieController.postMovie(mockReq, mockRes);
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
            movieController.postMovie(mockReq, mockRes);
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
            movieController.getMovies(mockReq, mockRes);
        }
        ).then(() => {
            expect(mockRes.json).toBeCalledWith({
                success: true,
            });
        })
    });

    it("should throw error in searching for a non-existant movie", async () => {
        try {
            const response = await movie.find({
                title: "I don't exist"
            });
        }
        catch (error) {
            expect(error)
        };
    });
})