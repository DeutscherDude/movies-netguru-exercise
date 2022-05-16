import mongoose from "mongoose";

class DbConnectionError extends Error {}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/movies");
    }
    catch (err: any) {
        throw new DbConnectionError(err);
    }
}

export default connectDB;