import mongoose, { Connection } from 'mongoose';
import { provideStringEnvVar } from '../../util/envProvider';
import { createMovie, findMovie, findMovieById } from '../dbController';

describe('dbController unit tests', () => {
    let db: Connection;
    let mockReq: any;
    let mockRes: any;
    const collection = "test_movies";

    beforeAll(async () => {
        const mongoUri = provideStringEnvVar("MONGO_URI");
        await mongoose.connect(mongoUri);
        db = mongoose.connection;
        await db.createCollection(collection);
        await db.collection('collection').deleteOne({
            title: 'Belle'
        })
    })

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            json: jest.fn((...r) => {
                // 
            }
            ),
            status: jest.fn(() => {
                return mockRes;
            }
            )
        };
    })

    afterAll(async () => {
        await db.dropCollection(collection);
        await db.close();
        await mongoose.connection.close();
    })

    it('should create a movie', async () => {
        mockReq = {
            body: {
                title: "The Wolverine"
            },
            user: {
                // Basic Thomas' user id
                id: "6276f7011c3a78d41c04c65b"
            }
        }
    
        const mockFetch = {
            Title: "The Wolverine",
            Year: "2013",
            Genre: "Action, Sci-Fi",
            Director: "James Mangold"
        }

        new Promise(() => {
            createMovie(mockReq, mockRes, mockFetch);
        }).then(() => {
            expect(mockRes.json).toBeCalledWith({
                success: true,
                movie: {
                    title: "The Wolverine",
                    released: "2013-10-04",
                    genre: "Action, Adventure, Sci-Fi",
                    director: "James Mangold",
                    }
                    })
            })
    })

    it('should find all movies created by a User', async () => {
        mockReq = {
            user: {
                // Basic Thomas' user id
                id: "6276f7011c3a78d41c04c65b"
            }
        }

        new Promise(() => {
            findMovie(mockReq, mockRes);
        }).then(() => {
            expect(mockRes.json).toBeTruthy();
        })
    })

    it('should find a specific movie created by a User', async() => {
        mockReq= {
            user: {
                id: "6276f7011c3a78d41c04c65b"
            },
            params: {
                _id: "6277d40a90155f37b30a48be"
            }
        }

        new Promise(() => {
            findMovieById(mockReq, mockRes);
        }
        ).then(() => {
            expect(mockRes.json).toBeTruthy();
        }
        )
    })
})
