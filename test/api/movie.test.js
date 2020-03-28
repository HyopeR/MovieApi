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
});