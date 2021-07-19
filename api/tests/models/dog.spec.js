const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { v4: uuidv4 } = require('uuid');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('Name: ', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({
          height: '1-1-1-1',
          weight: '2-2-2-2',
          id: uuidv4()
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
    });

    describe('Id: ', () => {
      it('should throw an error if id is null', (done) => {
        Dog.create({ 
          name: 'foo',
          height: '1-1-1-1',
          weight: '2-2-2-2'
        })
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
    })

    describe('Height: ', () => {
      it('should throw an error if height is null', (done) => {
        Dog.create({ 
          name: 'foo',
          weight: '2-2-2-2',
          id: uuidv4()
        })
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });
    });

    describe('Weight: ', () => {
      it('should throw an error if weight is null', (done) => {
        Dog.create({ 
          name: 'foo',
          height: '1-1-1-1',
          id: uuidv4()
        })
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
    })

    describe('Dog instance: ', () => {
      it('should throw an error if dog is an empty object', (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires dog's data")))
          .catch(() => done());
      });

      it('should work when its a valid dog', (done) => {
        Dog.create({
          name: 'foo',
          height: '1-1-1-1',
          weight: '2-2-2-2',
          id: uuidv4()
        })
          .then(() => done())
          .catch(() => done(new Error('It does not works with a valid dog')));
      });
    })
  });
});


