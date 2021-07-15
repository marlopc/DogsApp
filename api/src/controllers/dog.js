const { Dog } = require('../db.js');
const { v4: uuidv4 } = require('uuid');

const addDog = (req, res, next) => {
  const { 
    name, 
    height, 
    weight, 
    life_span, 
    temperament, 
    image_url, 
    description 
  } = req.body;
  
  const newBreed = {
    weight,
    height,
    id: uuidv4(),
    name,
    life_span,
    image_url,
    description
  };

  Dog.create(newBreed)
    .then(newBreed => {
      newBreed.setTemperaments(temperament);
      res.send(newBreed);
    })
    .catch(error => next(error))
}

module.exports = {
  addDog
}