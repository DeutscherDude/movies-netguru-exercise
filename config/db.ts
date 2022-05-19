import mongoose from "mongoose";
import { provideStringEnvVar } from "../util/envProvider";

class DbConnectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DbConnectionError";
    }
}

const connectDB = async () => {
    try {
        const uri = provideStringEnvVar("MONGO_URI");
        const conn = await mongoose.connect(uri);
    }
    catch (err: any) {
        throw new DbConnectionError(err);
    }
}

export default connectDB;