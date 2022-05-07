import mongoose, { Connection, Collection, Mongoose } from "mongoose";
import Movie from "../models/movieModel";
import * as dotenv from "dotenv";

describe('db functionality tests', () => {
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

    afterAll(async () => {
        const collection: string = "test_movies";
        await db.dropCollection(collection);
        await db.close();
        await mongoose.connection.close();
    })

    it("should create a movie", async () => {
        const response = await movie.create({
            title: "test",
            released: new Date(),
            genre: "test",
            director: "test"
        });
        expect(response).toBeDefined();
        expect(response).toBeInstanceOf(Movie);
        expect(response).toHaveProperty("_id");
        expect(response).toHaveProperty("title", "test");
        expect(response).toHaveProperty("released");
        expect(response).toHaveProperty("genre", "test");
        expect(response).toHaveProperty("director", "test");
    })

    it("should throw error in creating a movie", async () => {
        try {
            const response = await movie.create({
                title: "test",
                released: new Date()
            });
        }
        catch (error) {
            expect(error)
        }
    })

    it("should return a movie", async () => {
        const response = await movie.find({});
        expect(response.length).toBeGreaterThan(0);
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