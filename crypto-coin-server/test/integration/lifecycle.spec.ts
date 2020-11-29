import App from '../../src/app';
import chai = require('chai');
import chaiHttp = require('chai-http');

import 'mocha';
chai.use(chaiHttp);
const relative = '/lifecycle'

describe('App', () => {
    describe('lifecycle - GET', () => {
        it('Deve recuperar o erro no middlewares', done => {
            chai.request(App)
                .get(`${relative}?redirect=false`)
                .send()
                .end((err, res) => {
                    chai.expect(res).have.status(500);
                    chai.expect(res.body).to.have.property('message');
                    done();
                });
        });
        it('Deve recuperar o erro no middlewares com redirect', done => {
            chai.request(App)
                .get(`${relative}?redirect=true`)
                .send()
                .end((err, res) => {
                    chai.expect(res).have.status(404);
                    chai.expect(res.body).to.have.property('message');
                    done();
                });
        });
    });
});