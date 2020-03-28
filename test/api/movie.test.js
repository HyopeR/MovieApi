const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;

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
                   movieId = res.body._id;
                   done();
                });
        });
    });

    describe('/GET/:movie_id', () => {
       it('It should GET a movie by the given id', (done) => {
          chai.request(server)
              .get('/api/movies/'+ movieId)
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
                  res.body.should.have.property('_id').eql(movieId);
                  done();
              });
       });
    });

    describe('/PUT/:movie_id', () => {
        it('It should UPDATE a movie given by id', (done) => {
            const movie = {
                title: 'New Update',
                director_id: '5e7c09cafea21805903e5521',
                category: 'Comedy',
                country: 'Turkey',
                year: 1950,
                imdb_score: 8
            };

            chai.request(server)
                .put('/api/movies/'+ movieId)
                .send(movie)
                .set('x-access-token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                    done();
                });
        });
    });

    describe('/DELETE/:movie_id', () => {
        it('It should DELETE a movie given by id', (done) => {
            chai.request(server)
                .delete('/api/movies/'+ movieId)
                .set('x-access-token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
});