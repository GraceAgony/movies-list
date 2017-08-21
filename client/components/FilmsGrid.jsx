import React from 'react';
import Film from './Film.jsx';
import './FilmsGrid.css';

class FilmsGrid extends React.Component{
    constructor(props){
        super(props);
    };
    render() {
        return (
            <div id="FilmGrid">
            {
                    this.props.films.map(film =>
                        <Film
                            title={film.title}
                            key={film.id}
                            onDelete={this.props.onFilmDelete.bind(null, film)}
                            releaseYear={film.releaseYear}
                            format = {film.format}
                            stars = {film.stars}
                        >
                        </Film>
                    )
                }
            </div>
        );

    };
};

export default FilmsGrid;