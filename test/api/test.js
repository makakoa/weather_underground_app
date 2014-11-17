/*jshint node: true*/
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('api functionality', function() {
  it('should respond with the temperature', function(done) {
    chai.request('http://localhost:3000')
      .get('/at/47.6097,-122.3331')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.temp).to.be.a('number');
        done();
      });
  });
});
