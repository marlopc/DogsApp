const axios = require('axios');
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export function getTemperaments() {
  return function(dispatch) {
    return axios.get(`${BACKEND_BASE_URL}/temperament`)
      .then(temperaments => {
        dispatch({type: "GET_TEMPERAMENTS", payload: temperaments.data});
      })
      .catch(() => {});
  };
};

export function getDogs(name) {
  return function(dispatch) {
    let url = `${BACKEND_BASE_URL}/dogs`;
    if(name) {
      url = `${BACKEND_BASE_URL}/dogs?name=${name}`
    }
    return axios.get(url)
      .then(dogs => {
        dispatch({type: "GET_DOGS", payload: dogs.data});
      })
      .catch(() => {});
  };
};

export function getDogDetail(id) {
  return function(dispatch) {
    return axios.get(`${BACKEND_BASE_URL}/dogs/${id}`)
      .then(dog => {
        dispatch({type: "GET_DOG_DETAIL", payload: dog.data});
      })
      .catch(() => {});
  };
};

export function setDefaultHome() {
  return {
    type: "SET_DEFAULT_HOME",
    payload: {
      pagination: {
        pages: 0, 
        page: 1
      },
      filters: {
        sortType: "default",
        filter: "",
        search: "",
        searchInput: "",
        userCreatedFilter: false
      }
    }
  };
};

export function setPages(totalPages) {
  return {
    type: "SET_PAGES",
    payload: totalPages
  };
};

export function setPage(currentPage) {
  return {
    type: "SET_PAGE",
    payload: currentPage
  };
};

export function setSortType(type) {
  return {
    type: "SET_SORT_TYPE",
    payload: type
  };
};

export function setFilter(temperament) {
  return {
    type: "SET_FILTER",
    payload: temperament
  };
};

export function setSearch(param) {
  return {
    type: "SET_SEARCH",
    payload: param
  };
};

export function setSearchInput(input) {
  return {
    type: "SET_SEARCH_INPUT",
    payload: input
  };
};

export function setUserCreatedFilter(boolean) {
  return {
    type: "SET_USER_CREATED_FILTER",
    payload: boolean
  };
};

export function setLoading(boolean) {
  return {
    type: "SET_LOADING",
    payload: boolean
  };
};
