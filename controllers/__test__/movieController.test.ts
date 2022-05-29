import { getMovieById, getMovies, postMovie, putMovie, patchMovie } from '../movieController';
import mongoose, { Connection } from "mongoose";
import Movie from "../../models/movieModel";
import { provideStringEnvVar } from '../../util/envProvider';
import { StatusCodes } from '../../util/statusCodes';

describe('movieController functionality tests', () => {
    let mockReq: any;
    let mockRes: any;
    let db: Connection;
    const mongoUri = provideStringEnvVar("MONGO_URI");
    const movie = Movie;
    const collection = "movies";

    beforeAll(async () => {
        await mongoose.connect(mongoUri);
        db = mongoose.connection;
        await db.collection(collection).deleteOne({
            title: 'Belle'
        });
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
        await db.collection(collection).deleteOne({
            title: 'Belle'
        });
        await db.close();
    })

    describe('POST requests to /movies', () => {
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
    })

    describe('GET requests to /movies', () => {
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
                await movie.findOne({
                    title: "I don't exist"
                }).exec();
            }
            catch (error) {
                expect(error)
            }
        });

        it('should return movie by id', async () => {
            mockReq = {
                params: {
                    _id: "6277d40a90155f37b30a48be"
                },
                user: {
                    // Basic Thomas' user id
                    id: "6276f7011c3a78d41c04c65b"
                }
            };
            new Promise(() => {
                getMovieById(mockReq, mockRes);
            }).then(() => {
                expect(mockRes.json).toBeTruthy();
                expect(mockRes.json).toHaveBeenCalledWith({
                    title: 'Spider Man',
                    released: '2002-05-02T22:00:00.000+00:00',
                    genre: 'Action, Adventure, Sci-Fi',
                    director: 'Sam Raimi'
                })
            })
        })
    })

    describe('PATCH requests to /movies', () => {
        it('patch movies returns forbidden message', () => {
            mockReq = {}
            new Promise(() => {
                patchMovie(mockReq, mockRes);
            }
            ).then(() => {
                expect(mockRes.status).toBeCalledWith(StatusCodes.METHOD_NOT_ALLOWED);
                expect(mockRes.json).toBeCalledWith({
                    message: 'Method not allowed'
                });
            })
        })
    })

    describe('PUT requests to /movies', () => {
        it('put movies returns forbidden message', () => {
            mockReq = {}
            new Promise(() => {
                putMovie(mockReq, mockRes);
            }
            ).then(() => {
                expect(mockRes.status).toBeCalledWith(StatusCodes.METHOD_NOT_ALLOWED);
                expect(mockRes.json).toBeCalledWith({
                    message: 'Method not allowed'
                });
            })
        })
    })
})
