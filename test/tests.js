const request = require('supertest');
const express = require('express');

const app = express();
const api = request('https://petstore.swagger.io/v2');

describe('POST pet/{correctData}', function() {
  it('responds with 200', function(done) {
    api
      .post('/pet')
      .send({
      id: 0,
      category: {
        id: 0,
        name: 'string'
      },
      name: 'doggie',
      photoUrls: [
        'string'
      ],
      tags: [
        {
        id: 0,
        name: 'string'
        }
      ],
      status: 'available'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


describe('POST pet/{invalidData}', function() { // Although API should return 405, it returns 500
  it('responds with 405', function(done) {
    api
      .post('/pet')
      .send({
      id: 'invalid_id',
      category: {
      id: 'invalid_category_id',
      name: 12345 // invalid name type
      },
      name: '', // empty name
      photoUrls: [
      12345 // invalid photoUrl type
      ],
      tags: [
      {
      id: 'invalid_tag_id',
      name: 12345 // invalid name type
      }
      ],
      status: 'invalid_status' // invalid status
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(405, done);
  });
});

describe('PUT pet/ (with correct data)', function() {
  it('responds with 200', function(done) {
    api
      .put('/pet/')
      .send({
      "id": 0,
      "category": {
        "id": 0,
        "name": "string"
      },
      "name": "doggie",
      "photoUrls": [
        "string"
      ],
      "tags": [
        {
        "id": 0,
        "name": "string"
        }
      ],
      "status": "available"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('PUT pet/ (with incorrect data)', function() { // returns 500, although it should return 400
  it('responds with 400', function(done) {
    api
      .put('/pet/')
      .send({
        "id": "invalid_id", // invalid id
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": "doggie",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
});

describe('GET pet/findByStatus (valid status)', function() { // throws an error, that timeout of 2000ms is exceeded, although it should return 200
  it('responds with 200', function(done) {
    api
      .get('/pet/findByStatus?status=available')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET pet/findByStatus (invalid status)', function() { // returns 200, although it should return 404
  it('responds with 404', function(done) {
    api
      .get('/pet/findByStatus?status=wrongStatus')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});


describe('GET pet/32', function() { // API returns 404 for pet with id 32, although it should return 200 and pet with such id exists. Sometimes test case works as expected, sometimes it returns 404
    it('responds with 200', function(done) {
      api
        .get('/pet/32')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});
describe('GET pet/-1', function() { // Returns an error that timeout is exceeded, although it should return 404. Sometimes it returns the correct status code
  it('responds with 404', function(done) {
    api
      .get('/pet/-1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('DELETE pet/{validId}', function() { 
  it('responds with 200', function(done) {
    api
      .delete('/pet/10')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('DELETE pet/{invalidId}', function() { // throws an error, that timeout of 2000ms is exceeded, although it should return 404
  it('responds with 404', function(done) {
    api
      .delete('/pet/-1')
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});

describe('DELETE pet/{invalidInput}', function() { // throws an error, that timeout of 2000ms is exceeded, although it should return 404
  it('responds with 400', function(done) {
    api
      .delete('/pet/invalidInput')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
});





