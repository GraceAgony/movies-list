var FilmFileMap = {
    "Title":"title",
    "Release Year":"releaseYear",
    "Format":"format",
    "Stars":"stars"
}

export function ParseFile(file){
    let filmsString = file.split("\n\n");
    var films = [];
    for(let filmString of filmsString){
        filmString = filmString.trim();
        if(filmString){
            let film = ParseFilmString(filmString);
            films.push(film);
        }
    }
    return films;
}

function ParseFilmString(filmString){

    let properties = filmString.split("\n");
    let film = {};
    for(let prop of properties){
        let [field, value] = prop.split(": ");
        film[FilmFileMap[field]] = value;
    }
    return film;
}


