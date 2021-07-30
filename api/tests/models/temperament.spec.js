const { Temperament, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');

describe('Temperament model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe('Name: ', () => {
      it('should throw an error if name is null', (done) => {
        Temperament.create({
          id: uuidv4()
        })
          .then(() => done(new Error('It works with a null name')))
          .catch(() => done());
      });
    });

    describe('Id: ', () => {
      it('should throw an error if id is not valid', (done) => {
        Temperament.create({
          name: 'foo',
          id: 'test'
        })
          .then(() => done(new Error('It works with a invalid id')))
          .catch(() => done());
      });
    });

    describe('Temperament instance: ', () => {
      it('should throw an error if temperament is an empty object', (done) => {
        Temperament.create({})
          .then(() => done(new Error("It should not work with an empty object")))
          .catch(() => done());
      });

      it('should work when its a valid temperament', (done) => {
        Temperament.create({
          name: 'foo', 
          id: uuidv4()
        })
          .then(() => done())
          .catch(() => done(new Error('It does not works with a valid name')));
      });
    })
  });
});