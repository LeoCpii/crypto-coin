import App from '../../src/app';
import chai = require('chai');
import chaiHttp = require('chai-http');

import 'mocha';

chai.use(chaiHttp);
const relative = '/health'

describe('Health Controller', () => {
    describe('Health - GET', () => {
        it('Deve obter a saúde da API', done => {
            chai.request(App)
                .get(`${relative}`)
                .send()
                .end((err, res) => {
                    chai.expect(res).have.status(200);
                    chai.expect(res.body).to.have.property('message').and.equal('The application is healthy');
                    done();
                });
        });
    });
});