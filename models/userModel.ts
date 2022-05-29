import { Schema, model, Document } from 'mongoose';

/**
 * Interface IUser extends mongoose.Document
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @param {String} role
 *  */

export interface IUser extends Document {
    role?: 'basic' | 'premium';
    name?: string;
    username?: string;
    password?: string;
}

/**
 * User schema
 * @param {String} name, required
 * @param {String} email, required
 * @param {String} password, required
 * @param {String} role, required
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
}, {
    timestamps: true,
})

userSchema.methods.getName = function () {
    this.name ? "This user's name is " + this.name : "User's name not set"
}

export default model<IUser>('User', userSchema);
