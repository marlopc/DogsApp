import { getSortingCb } from '../components/search_filters/SearchFilters';

const axios = require('axios');

export function getTemperaments() {
  return function(dispatch) {
    return axios.get('http://localhost:3001/temperament')
      .then(temperaments => {
        dispatch({type: "GET_TEMPERAMENTS", payload: temperaments.data});
      })
      .catch(error => console.error(error));
  };
};

export function getDogs(name) {
  return function(dispatch) {
    let url = `http://localhost:3001/dogs`;
    if(name) {
      url = `http://localhost:3001/dogs?name=${name}`
    }
    return axios.get(url)
      .then(dogs => {
        dispatch({type: "GET_DOGS", payload: dogs.data});
      })
      .catch(error => console.error(error));
  };
};

export function getDogDetail(id) {
  return function(dispatch) {
    return axios.get(`http://localhost:3001/dogs/${id}`)
      .then(dog => {
        dispatch({type: "GET_DOG_DETAIL", payload: dog.data});
      })
      .catch(error => console.error(error));
  };
};

export function addDog(form) {
  return function(dispatch) {
    return axios.post('http://localhost:3001/dog', form)
      .then(dog => {
        dispatch({type: "ADD_DOG", payload: dog.data});
      })
      .catch(error => console.error(error));
  };
};

export function setSortedType(type) {
  return {
    type: "SET_SORTED_TYPE",
    payload: getSortingCb(type)
  };
};