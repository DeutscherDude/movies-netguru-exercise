import { Schema, model } from 'mongoose';

export default interface IMovie {
    Title: string;
    Released: Date;
    Genre: string;
    Director: string;
}

const movieSchema = new Schema<IMovie>({
    Title: {
        type: String,
        required: true,
    },
    Released: {
        type: Date,
        required: true,
    },
    Genre: {
        type: String,
        required: true,
    },
    Director: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = model<IMovie>('Movie', movieSchema);