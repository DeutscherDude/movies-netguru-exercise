import {Request, Response} from 'express';

/**
 * Interface IUserAuthInfo extends express.Request
 * @param {String} user.id
 * @param {String} user.name
 * @param {String} user.role
 * */ 

 export interface IUserAuthInfo extends Request {
    user?: {
        id?: string;
        name?: string;
        role?: string;
    };
}

/**
 * Interface IOMovie extends Response
 * @param {String} Title
 * @param {String} Year
 * @param {String} Rated
 * @param {String} Released
 * @param {String} Runtime
 * @param {String} Genre
 * @param {String} Director
 * @param {String} Writer
 * @param {String} Actors
 * @param {String} Plot
 * @param {String} Language
 * @param {String} Country
 * @param {String} Awards
 * @param {String} Poster
 * @param {Object} Ratings
 * @param {String} Metascore
 * @param {String} imdbRating
 * @param {String} imdbVotes
 * @param {String} imdbID
 * @param {String} Type
 * @param {String} DVD
 * @param {String} BoxOffice
 * @param {String} Production
 * @param {String} Website
 * @param {String} Response    
 *  */ 

export interface IOMDbPayload extends Response {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
        Source: string;
        Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}
