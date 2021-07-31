/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');
const agent = session(app);

const dog = {
  name: 'foo',
  height: '1-1-1-1',
  weight: '2-2-2-2',
  life_span: '12 years',
  id: uuidv4()
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
    
  describe('GET "/dogs"', () => {

    it('should get 200 /dogs', () =>
      agent.get('/dogs').expect(200)
    ).timeout(5000);
  });

  describe('GET "/dogs?name="', () => {
    
    it('should get 200', () => 
      agent.get('/dogs?name=foo').expect(200)
    ).timeout(5000);

    it('should fetch correctly the requested dog', () => 
      agent.get('/dogs?name=foo')
        .then(res => expect(res.body[0].name).to.be.equal('foo'))
    ).timeout(5000);

    it('should fetch correctly the necessary data', () => 
      agent.get('/dogs?name=foo')
        .then(res => expect(res.body[0]).to.have.all.keys(
          'name', 
          'id', 
          'weight', 
          'temperament',
          'life_span',
          'image_url'
        ))
    ).timeout(5000);

    it('should fetch correctly all dogs that match', () => 
      agent.get('/dogs?name=ka')
        .then(res => expect(res.body).to.have.lengthOf.within(3, 20))
    ).timeout(5000);

    it('should not fetch dogs with a query that does not match', () => 
      agent.get('/dogs?name=PussInBoots')
      .then(res => expect(res.body).to.have.lengthOf(0))
    ).timeout(5000);
  });

  describe('GET "/dogs/:id"', () => {

    it('should get 200', () => 
      agent.get('/dogs/3').expect(200)
    ).timeout(5000);

    it('should fetch correctly the requested dog', () => 
      agent.get(`/dogs/${dog.id}`)
        .then(res => expect(res.body.name).to.be.equal('foo'))
    ).timeout(5000);

    it('should not fetch dogs with a id that does not match', () => 
      agent.get(`/dogs/${uuidv4()}`)
        .then(res => expect(res.body).to.be.empty)
    ).timeout(5000);
  });
});

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true }));

  describe('POST /dog', () => {
    it('should create a dog', () => 
      agent.post('/dog').send({
        name: "foo",
        height: "1-1-1-1",
        weight: "2-2-2-2",
        life_span: "12 years"
      })
        .then(() => agent.get('/dogs?name=foo'))
        .then(res => expect(res.body[0]).to.have.all.keys(
          'name', 
          'id', 
          'weight', 
          'temperament', 
          'image_url',
          'life_span'
        ))
    ).timeout(5000);
  });
});