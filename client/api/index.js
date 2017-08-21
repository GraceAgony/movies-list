import axios from 'axios';

import { apiPrefix } from '../../configuration/config.json';

export default{


    listFilms(){
        return axios.get(`${apiPrefix}/films`);
    },

    addFilm(data){
       return axios.post(`${apiPrefix}/films`, data);
    },

    deleteFilm(filmId){
        return axios.delete(`${apiPrefix}/films/${filmId}`);
    },

    searchFilm( field, searchString){
       return axios.get(`${apiPrefix}/films/search?text=${searchString}&field=${field}`);

    },

    uploadFile(file){
        return axios.post(`${apiPrefix}/upload`, {file: file});
    }
}