process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let Film = require('../server/models/Film.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server/App.js');
let should = chai.should();

chai.use(chaiHttp);

describe('films', () => {
    beforeEach((done) => { //Перед каждым тестом чистим базу
        Film.remove({}, (err) => {
            done();
        });
    });

    describe('/GET film', () => {
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