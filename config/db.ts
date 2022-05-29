import mongoose from "mongoose";
import { provideStringEnvVar } from "../util/envProvider";

class DbConnectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DbConnectionError";
    }
}

const connectDB = async () => {
    const env = provideStringEnvVar("NODE_ENV");
    try {
        const uri = provideStringEnvVar("MONGO_URI");
        await mongoose.connect(uri, { autoIndex: env === "development" ? true : false });
    }
    catch (err: any) {
        throw new DbConnectionError(err);
    }
}

export default connectDB;
