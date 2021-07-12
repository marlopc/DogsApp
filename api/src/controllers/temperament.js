const { BASE_URL, API_KEY } = require('../../constants.js');
const { Temperament } = require('../db.js');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

let dataInDb = false;

const getTemperaments = (_req, res, next) => {
  extApiFetch
    .then(() => Temperament.findAll())
    .then(dbRes => res.send(dbRes))
    .catch(error => next(error)) 
};

const extApiFetch = new Promise((resolve, reject) => {
  if(dataInDb) {
    return resolve();
  }

  axios.get(`${BASE_URL}breeds?api_key=${API_KEY}`)
    .then(response => {
      let temperamentsAcc = [];
      response.data.forEach(breed => {
        if(!breed.temperament) {
          return;
        }

        let currentTemperaments = breed.temperament.split(", ");
        
        currentTemperaments.forEach(temperamentName => {
          if(!temperamentsAcc.some(({ name }) => name === temperamentName)) {
            temperamentsAcc.push({
              id: uuidv4(), 
              name: temperamentName
            });
          }
        });
      });

      return temperamentsAcc;
    })
    .then(temperamentsAcc => {
      temperamentsAcc.forEach(temperament => {
        Temperament.findOrCreate({
          where: {
            name: temperament.name
          },
          defaults: temperament
        });
      });
    dataInDb = true;
    return resolve();
    })
    .catch(err => reject(err)) 
});

module.exports = {
  getTemperaments
}