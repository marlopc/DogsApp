const initialState = {
  temperaments: [],
  dogs: [],
  dogDetail: {},
  found: true,
  pages: 0
}

const reducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case 'GET_TEMPERAMENTS':
      return {
        ...state,
        temperaments: payload
      }

    case 'GET_DOGS':
      return {
        ...state,
        dogs: payload.result,
        found: payload.found
      }
      
    case 'GET_DOG_DETAIL':
      return {
        ...state,
        dogDetail: payload
      }
 
    case 'SET_PAGES':
      return {
        ...state,
        pages: payload
      }

    default: 
      return state;
  }
};

export default reducer;