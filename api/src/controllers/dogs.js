const { Dog, Temperament } = require('../db.js');
const { BASE_URL, API_KEY } = require('../../constants');
const axios = require('axios');
const { Op } = require('sequelize');

const getDogs = (req, res, next) => {
  const { name } = req.query;

  let extApiUrl = `${BASE_URL}breeds?api_key=${API_KEY}`;
  let findAllParams = {include: Temperament};

  if(name) {
    extApiUrl = `${BASE_URL}breeds/search?q=${name}&api_key=${API_KEY}`;
    findAllParams.where = {name: {[Op.iLike]: `%${name}%`}}
  } 

  apiReq = axios.get(extApiUrl);
  dbReq = Dog.findAll(findAllParams);

  Promise.all([apiReq, dbReq])
    .then(data => {
      let [apiRes, dbRes] = data;

      dbRes = dbDataHandler(dbRes);
      apiRes = apiDataHandler(apiRes);

      const result = [...apiRes,...dbRes]

      const found = result.length ? true : false;

      return res.send({found, result});
    })
    .catch(error => next(error));
};

const getDogById = (req, res, next) => {
  const id = req.params.id;

  if(isNaN(id)) {
    return Dog.findOne({
      where: {
        id: id
      },
      include: Temperament
    })
      .then(dbRes => {
        const searchResult = dbDataHandler(dbRes);
        return res.send(searchResult);
      })
      .catch(error => next(error));
  } else { 
    axios.get(`${BASE_URL}breeds?api_key=${API_KEY}`)
    .then(apiRes => {
      const searchResult = apiRes.data.find(dog => dog.id === parseInt(id));
      return res.send(searchResult);
    })
    .catch(error => next(error));
  }
};

const apiDataHandler = apiResponse => {
  apiResponse = apiResponse.data;
  return apiResponse.map(breed => {
    return {
      id: breed.id,
      name: breed.name,
      temperament: breed.temperament,
      weight: breed.weight.imperial.split(" - ")[0],
      image_url: breed.hasOwnProperty("image") 
      ? breed.image.url 
      : `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
    }
  });
};

const dbDataHandler = dbResponse => {
  if(dbResponse instanceof Array) {
    dbResponse = JSON.stringify(dbResponse, getCircularReplacer());
    dbResponse = JSON.parse(dbResponse);
    dbResponse = dbResponse.map(dog => {
      return {
        id: dog.id,
        name: dog.name,
        temperament: dog.temperaments.map(temperament => temperament.name).join(", "),
        image_url: dog.image_url,
        weight: dog.weight.split("-")[0]
      };
    });
    return dbResponse;
  } else {
    dbResponse = JSON.stringify(dbResponse, getCircularReplacer());
    dbResponse = JSON.parse(dbResponse);
    
    const temperament = dbResponse.temperaments.map(temperament => temperament.name).join(", ");
    dbResponse.image = {
      url: dbResponse.image_url
    }
    
    delete dbResponse.image_url;
    delete dbResponse.temperaments;
    
    weight = dbResponse.weight.split("-");
    dbResponse.weight = {
      imperial: `${weight[0]} - ${weight[1]}`,
      metric: `${weight[2]} - ${weight[3]}`
    }
    
    height = dbResponse.height.split("-");
    dbResponse.height = {
      imperial: `${height[0]} - ${height[1]}`,
      metric: `${height[2]} - ${height[3]}`
    }
    
    return {
      ...dbResponse,
      temperament
    }
  }
};

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

module.exports = {
  getDogs,
  getDogById
}