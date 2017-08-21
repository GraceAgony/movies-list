import AppDispatcher from '../dispatcher/AppDispatcher.js';
import Constants from '../constants/FilmConstants.js';

import api from '../api';

const FilmsActions = {
    loadFilms() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_FILMS_REQUEST
        });

        api.listFilms()
            .then(({ data }) =>{
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_SUCCESS,
                    films: data
                })}
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_FILMS_FAIL,
                    error: err
                })
            );
    },

    addFilm(film) {
        api.addFilm(film)
            .then(() =>
                this.loadFilms()
            )
            .catch(err =>
                console.error(err)
            );
    },

    searchFilm(field, searchString){
        api.searchFilm(field, searchString)
            .then(
                ({ data }) =>{
                    AppDispatcher.dispatch({
                        type: Constants.LOAD_FILMS_SUCCESS,
                        films: data
                    })}
            )
            .catch(err =>
                console.error(err)
            );
    },

    deleteFilm(filmId) {
        api.deleteFilm(filmId)
            .then(() =>
                this.loadFilms()
            )
            .catch(err =>
                console.error(err)
            );
    },

    uploadFile(file){
        api.uploadFile(file)
            .then(() =>
                ({ data }) =>{
                    AppDispatcher.dispatch({
                        type: Constants.LOAD_FILMS_SUCCESS,
                        films: data
                    })}
        )
            .catch(err =>
                console.error(err)
            );
    }
};

export default FilmsActions;