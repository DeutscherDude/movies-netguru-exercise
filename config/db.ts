import mongoose from "mongoose";
import { Db } from 'mongodb';
import { IMovie } from '../models/movieModel';
import { ChangeStreamDocument } from 'mongodb';
import { provideStringEnvVar } from "../util/envProvider";

class DbConnectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DbConnectionError";
    }
}

const connectDB = async () => {
    try {
        const env = provideStringEnvVar("NODE_ENV");
        const uri = provideStringEnvVar("MONGO_URI");
        await mongoose.connect(uri, { autoIndex: env === "development" ? true : false });
    }
    catch (err: any) {
        throw new DbConnectionError(err);
    }
}

export default connectDB;
