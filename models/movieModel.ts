import { Schema, model, Document } from 'mongoose';

export interface IMovie extends Document {
    user: Schema.Types.ObjectId,
    title: string;
    released: Date;
    genre: string;
    director: string;
}

const movieSchema = new Schema<IMovie>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
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
