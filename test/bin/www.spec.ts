import chai from 'chai';
import server from '../../src/bin/www';

const expect = chai.expect;

describe('www.spec.ts', () => {
    before(function () {
        // LIFT YOUR SERVER //
    });

    it('constructor method', () => {
        console.log('server', server);
        expect(server).to.be.a('object');
    });

    after(function () {
        server.close();
    });
});
