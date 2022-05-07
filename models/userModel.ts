import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    userId?: Number;
    role?: 'basic' | 'premium';
    name?: String;
    username?: String;
    password?: String;
  }

const userSchema = new Schema<IUser>({
    userId: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

export default model<IUser>('User', userSchema);
