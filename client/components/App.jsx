import React from 'react';

import FilmAdd from './FilmAdd.jsx';
import FilmsGrid from './FilmsGrid.jsx';

import FilmsStore from '../stores/FilmsStore.js';
import FilmsActions from '../actions/FilmsActions.js';
import SearchBox from './SearchBox.jsx';

import './app.css';
import UploadFile from "./uploadFile";


function getStateFromFlux() {
    return {
        isLoading: FilmsStore.isLoading(),
        films: FilmsStore.getFilms()
    };
};

class App extends React.Component{
    constructor(props){
        super(props);

        this.state =  getStateFromFlux();

        this.handleFilmAdd = this.handleFilmAdd.bind(this);
        this.handleFilmDelete = this.handleFilmDelete.bind(this);
        this._onChange = this._onChange.bind(this);
        this.handleUploadSubmit = this.handleUploadSubmit.bind(this);
    };

    componentWillMount() {
        FilmsActions.loadFilms();
    };

    componentDidMount() {
        FilmsStore.addChangeListener(this._onChange);
    };

    componentWillUnmount() {
        FilmsStore.removeChangeListener(this._onChange);
    };

    handleFilmDelete(film) {
        FilmsActions.deleteFilm(film.id);
    };


    handleFilmAdd(data){
        FilmsActions.addFilm(data);
    };

    _onChange() {
        this.setState(getStateFromFlux());
    };

    handleSearchFilm(field, searchString){
        FilmsActions.searchFilm(field, searchString);
    };

    handleUploadSubmit(file){
        FilmsActions.uploadFile(file);
    };

    render(){
        return(
        <div className="App">
            <div id="functional">
                <SearchBox searchFilm={this.handleSearchFilm}/>
                <FilmAdd onFilmAdd={this.handleFilmAdd} />
                <UploadFile handleUploadSubmit={this.handleUploadSubmit}/>
            </div>
            <div id="contentFilm">
                <FilmsGrid films={this.state.films}
                       onFilmDelete={this.handleFilmDelete}
                />
            </div>
        </div>
        );
    }
}

export default App;