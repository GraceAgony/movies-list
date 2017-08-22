import React from 'react';

import FilmAdd from './FilmAdd.jsx';
import FilmsGrid from './FilmsGrid.jsx';

import FilmsStore from '../stores/FilmsStore.js';
import FilmsActions from '../actions/FilmsActions.js';
import SearchBox from './SearchBox.jsx';
import SortBox from './SortBox.jsx'

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

        this.sort = 'ascending';

        this.state =  getStateFromFlux();

        this.handleFilmAdd = this.handleFilmAdd.bind(this);
        this.handleFilmDelete = this.handleFilmDelete.bind(this);
        this._onChange = this._onChange.bind(this);
        this.handleUploadSubmit = this.handleUploadSubmit.bind(this);
        this.handleAscendingSort = this.handleAscendingSort.bind(this);
        this.handleDescendingSort = this.handleDescendingSort.bind(this);
        this.handleSort= this.handleSort.bind(this);

    };

    componentWillMount() {
        console.log(this.sort);
        if(this.sort == 'ascending'){
            this.handleAscendingSort();
        }else{
            this.handleDescendingSort();
        };
    };

    componentDidMount() {
        FilmsStore.addChangeListener(this._onChange);
    };

    componentWillUnmount() {
        FilmsStore.removeChangeListener(this._onChange);
    };

    handleFilmDelete(film) {
        FilmsActions.deleteFilm(film.id, this.sort);
    };


    handleFilmAdd(data){
        FilmsActions.addFilm(data, this.sort);
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

    handleAscendingSort(){
        FilmsActions.ascendingSort();
    };

    handleDescendingSort(){
        FilmsActions.descendingSort();
    };

    handleSort(sortType){
        this.sort = sortType;
        if(sortType == 'ascending'){
            this.handleAscendingSort();
        }else{
             this.handleDescendingSort();
        };
    };

    render(){
        return(
        <div className="App">
            <div id="functional">
                <SearchBox searchFilm={this.handleSearchFilm}/>
                <FilmAdd onFilmAdd={this.handleFilmAdd} />
                <UploadFile handleUploadSubmit={this.handleUploadSubmit}/>
                <SortBox sort={this.handleSort}/>
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