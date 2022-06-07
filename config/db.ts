import mongoose from "mongoose";
import { IMovie } from '../models/movieModel';
import { ChangeStreamDocument } from 'mongodb';
import { provideStringEnvVar } from "../util/envProvider";

class DbConnectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DbConnectionError";
    }
}

/**
 * @desc Interface extending ChangeStreamDocument from mongodb
 * @param {IMovie} movie
 */
interface IMoviesChangeStreamDocument extends ChangeStreamDocument {
    fullDocument: IMovie;
}

const pipeline = [
    {
        $match: {
            $or: [
                {
                    operationType: 'insert'
                },
                {
                    ns: {
                        collection: 'movies',
                    }
                }
            ]
        },

    }
];

const connectDB = async () => {
    const env = provideStringEnvVar("NODE_ENV");
    try {
        const uri = provideStringEnvVar("MONGO_URI");
        await mongoose.connect(uri, { autoIndex: env === "development" ? true : false });

        const client = mongoose.connection.getClient();
        const db = client.db();
        const collection = db.collection("movies");
        const changeStream = collection.watch(pipeline);

        changeStream.on("change", async (change: IMoviesChangeStreamDocument) => {
            if (change.operationType === "insert") {
                console.log(`${change.fullDocument.title} was added to the database`);
                db.collection('users')
                    .findOne({ _id: change.fullDocument.user })
                    .then( user => { 
                        const count = user!.moviesAddedThisMonth + 1;
                        db.collection('users').updateOne({ _id: user!._id }, { $set: { moviesAddedThisMonth: count }}, { upsert: false});
                        console.log(`${user!.name} has added ${count} movies this month`);
                    })
                    .catch(err => console.log(err));
            }
        });

    }
    catch (err: any) {
        throw new DbConnectionError(err);
    }
}

export default connectDB;
