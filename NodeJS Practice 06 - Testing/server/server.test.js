// Testing the server.

const request = require('supertest');

// Using expect library to make assertions.
const expect = require('expect');

var app = require('./server').app;

describe('Server', () => {

    // The following should pass:
    it('should return Hello world! response', (done) => {
        request(app)
            .get('/')
            // We expect that the status code is 200 (ok)
            .expect(200)
            .expect('Hello world!')
            .end(done);
    });

    // The following should fail:
    it('should return Hello world! response', (done) => {
        request(app)
            .get('/')
            // We expect that the status code is 200 (ok)
            .expect(200)
            .expect('HELLO WORLD!')
            .end(done);
    });

    // The following should pass:
    it('should return 404', (done) => {
        request(app)
            .get('/pageNotFound')
            .expect(404)
            .expect({
                error: 'Page not found.'
            })
            .end(done);
    });

    // We can also provide a function to expect:
    const expect = require('expect');
    // The following should pass:
    it('should return 404', (done) => {
        request(app)
            .get('/someRoute')
            .expect(404)
            .expect((res) => {
                // Here we have acces to the response object.
                // Make a custom assertion:
                expect(res.body).toInclude({
                    error: 'Page not found.'
                });
            })
            .end(done);
    });

    // Example.
    // The following should pass:
    it('should return 200', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(res.body).toInclude({
                    fullName: 'Bernardo Mondragon',
                    age: '23',
                    likes: ['football', 'math']
                });
            })
            .end(done);
    });

});