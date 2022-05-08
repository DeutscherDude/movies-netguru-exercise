import { Schema, model, Document } from 'mongoose';

// @interface IMovie extends mongoose.Document
// @param {String} title
// @param {String} released
// @param {String} genre
// @param {String} director
// @param {Schema.Types.ObjectId} user

export interface IMovie extends Document {
    user: Schema.Types.ObjectId,
    title: String;
    released: Date;
    genre: String;
    director: String;
}

// @desc Movie schema
// @param {String} title, required
// @param {String} released, required
// @param {String} genre, required
// @param {String} director, required
// @param {Schema.Types.ObjectId} user, required

const movieSchema = new Schema<IMovie>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    released: {
        type: Date,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default model<IMovie>('Movie', movieSchema);
