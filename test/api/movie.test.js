const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token;

describe('/api/movies tests', () => {
    before((done) => {
        //console.log("First run!");
        chai.request(server)
            .post('/authenticate')
            .send({ username: "Tolgahan", password: "123123aa" })
            .end((error, res) => {
               token = res.body.token;
               //console.log(token);
               done();
            });
    });

    describe('/GET movies', () => {
       it('It should GET all the movies', (done) => {
           chai.request(server)
               .get('/api/movies')
               .set('x-access-token', token)
               .end((error, res) => {
                   // Should ile "OLMALI" kontrolleri yapıyoruz.
                   res.should.have.status(200);
                   res.body.should.be.a('array');
               });
           done();
        });
    });

    describe('/POST movie', () => {
        it('It should POST a movie', (done) => {
            const movie = {
                title: 'Udemy',
                director_id: '5e7c09cafea21805903e5521',
                category: 'Comedy',
                country: 'Turkey',
                year: 1950,
                imdb_score: 8
            };

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((error, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('title');
                   res.body.should.have.property('director_id');
                   res.body.should.have.property('category');
                   res.body.should.have.property('country');
                   res.body.should.have.property('year');
                   res.body.should.have.property('imdb_score');
                   done();
                });
        });
    });
});