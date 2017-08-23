process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let Film = require('../server/models/Film.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server/App.js');
let should = chai.should();

chai.use(chaiHttp);
chai.use(require("chai-sorted"));

describe('films', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        Film.remove({}, (err) => {
            done();
        });
    });

    describe('/GET films', () => {
        it('it should GET all the films', (done) => {
            chai.request(app)
                .get('/films')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});

describe('/POST film', () => {
    it('it should POST a film ', (done) => {
        let film = {
            title: "Donnie Darko",
            releaseYear: 2001,
            format: 'hd',
            stars: 'Jake Gyllenhaal, Jena Malone, Mary McDonnell'
    };
        chai.request(app)
            .post('/films')
            .send(film)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('releaseYear');
                res.body.should.have.property('format');
                res.body.should.have.property('stars');
                res.body.should.have.property('sortField');
                done();
            });
    });
});

describe('/DELETE/:id film', () => {
    it('it should DELETE a film given the id', (done) => {
        let film = new Film({title: "Donnie Darko",
            releaseYear: 2001,
            format: 'hd',
            stars: 'Jake Gyllenhaal, Jena Malone, Mary McDonnell'})
        film.save((err, film) => {
            chai.request(app)
                .delete('/films/' + film.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').eql(1);
                    res.body.should.have.property('n').eql(1);
                    done();
                });
        });
    });
});

describe('search films', () => {
    it('it should search  films', (done) => {
        let film = new Film({title: "The Social Network",
            releaseYear: 2010,
            format: 'hd',
            stars: 'Jesse Eisenberg Andrew Garfield Justin Timberlake'});
        film.save((err, film) => {
            chai.request(app)
                .get('/films/search')
                .query({field:"title", text:"Social"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });
});


describe('ascending sort films', () => {
    it('it should ascending sort  films', (done) => {
            chai.request(app)
                .get('/films/ascendingSort')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    res.body.should.be.sortedBy("title");
                    done();
                });
    });
});


describe('descending sort films', () => {
    it('it should descending  sort  films', (done) => {
        chai.request(app)
            .get('/films/descendingSort')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(2);
                res.body.should.be.sortedBy("title", true);
                done();
            });
    });
});