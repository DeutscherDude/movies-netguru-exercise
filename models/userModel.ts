import { Schema, model, Document } from 'mongoose';

/**
 * Interface IUser extends mongoose.Document
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @param {String} role
 * @param {Integer} moviesAddedThisMonth
 *  */

export interface IUser extends Document {
    role: 'basic' | 'premium';
    name: string;
    username: string;
    password: string;
    moviesAddedThisMonth: number;
}

/**
 * User schema
 * @param {String} name, required
 * @param {String} email, required
 * @param {String} password, required
 * @param {String} role, required
 * @param {Integer} moviesAddedThisMonth, default: 0
 *  */

const userSchema = new Schema<IUser>({
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
    moviesAddedThisMonth: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
})

const User = model('User', userSchema);

export default User;
