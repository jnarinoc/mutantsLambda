import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';
import * as Sinon from "sinon";
import {sequelizeMySQL} from "../../src/database/database";

chai.use(chaiHttp);
chai.should();

const expect = chai.expect;
let sandbox: any;


describe('is mutant', () => {
    beforeEach(() => {
        sandbox = Sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore(); // Unwraps the spy
    });

    it('failed, invalid body', (done) => {
        sandbox.stub(sequelizeMySQL, 'query').returns(1);
        chai.request(app)
            .post('/mutant')
            .send('{}')
            .end((err, res) => {
                console.log('RESSS', res)
                console.log('app', app)
                expect(res.status).to.equals(400);
                done();
            });
    });

    it('failed, matrix invalid', (done) => {
        sandbox.stub(sequelizeMySQL, 'query').returns(1);
        const body = {
            dna: [
                "ABCDE",
                "EFGHI",
                "JKLMN",
                "OPQRS",
                "ABAA"
            ]
        };
        chai.request(app)
            .post('/mutant')
            .send(body)
            .end((err, res) => {
                console.log('RESSSS', res);
                expect(res.status).to.equals(500);
                done();
            });
    });

    it('failed, matrix invalid , too short', (done) => {
        sandbox.stub(sequelizeMySQL, 'query').returns(1);
        const body = {
            dna: [
                "ABCDE",
                "EFGHI",
                "JKLMN"
            ]
        };
        chai.request(app)
            .post('/mutant')
            .send(body)
            .end((err, res) => {
                expect(res.status).to.equals(500);
                done();
            });
    });

    it('successfull 1 403', (done) => {
        sandbox.stub(sequelizeMySQL, 'query').returns(1);
        const body = {
            dna: [
                "ABCDE",
                "EFGHI",
                "JKLMN",
                "OPQRS",
                "ABAAA"
            ]
        }
        chai.request(app)
            .post('/mutant')
            .send(body)
            .end((err, res) => {
                expect(res.status).to.equals(403);
                done();
            });
    });

    it('successfull 1 200', (done) => {
        sandbox.stub(sequelizeMySQL, 'query').returns(1);
        const body = {
            dna: [
                "ABCDE",
                "AFGHI",
                "AKLMN",
                "APQRS",
                "AAAAB"
            ]
        }
        chai.request(app)
            .post('/mutant')
            .send(body)
            .end((err, res) => {
                expect(res.status).to.equals(200);
                done();
            });
    });

});
