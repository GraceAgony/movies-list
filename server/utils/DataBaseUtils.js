import '../models/Film';
import mongoose from "mongoose";
import config from '../../configuration/config.json';

const Film = mongoose.model('Film');

export function setUpConnection(){
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listFilms(id) {
    return Film.find().sort({title: 1});
}

export function createFilm(data) {
    const film = new Film({
        title: data.title,
        format: data.format,
        releaseYear: data.releaseYear,
        stars: data.stars
    });
    return film.save();
}

export function deleteFilm(id) {
    return Film.findById(id).remove();
}

export function searchFilms(field, text){
    var query = {};
    query[field] = {$regex :`${text}`, $options: "-i"};
    return Film.find(query);
}

export function addFilms(films){
    return Film.collection.insert(films);
}