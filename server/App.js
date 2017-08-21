import express from 'express';
import bodyParser from 'body-parser';
import { serverPort } from '../configuration/config.json';
import * as db from './utils/DataBaseUtils.js';
import * as Parser from './utils/Parser.js';

const app = express();
db.setUpConnection();

app.use( bodyParser.json() );
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/films', (req, res) => {
    db.listFilms().then(data => res.send(data));
});


app.post('/films', (req, res) => {
    db.createFilm(req.body).then(data => res.send(data));
});

app.delete('/films/:id', (req, res) => {
    db.deleteFilm(req.params.id).then(data => res.send(data));
});

app.get('/films/search', (req, res) =>{
    db.searchFilms(req.query.field, req.query.text).then(data => {res.send(data)});
});

app.post('/upload', (req, res) => {
    var films = Parser.ParseFile(req.body.file);
    db.addFilms(films).then(data => {res.send(data)});
});


const server = app.listen(serverPort, function(){
    console.log(`Server is up and running on port ${serverPort}`);
});
