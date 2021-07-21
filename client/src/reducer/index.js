const initialState = {
  temperaments: [],
  dogs: [],
  dogDetail: {},
  loading: true,
  pagination: {
    pages: 0,
    page: 1
  },
  filters: {
    sortType: "AA",
    filter: "",
    search: "",
    searchInput: "",
    userCreatedFilter: false
  }
}

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case 'GET_TEMPERAMENTS':
      return {
        ...state,
        temperaments: payload
      }

    case 'GET_DOGS':
      return {
        ...state,
        dogs: payload
      }
      
    case 'GET_DOG_DETAIL':
      return {
        ...state,
        dogDetail: payload
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: payload
      }
 
    case 'SET_DEFAULT_HOME':
      return {
        ...state,
        pagination: payload.pagination,
        filters: payload.filters
      }

    case 'SET_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          filter: payload
        }
      }

    case 'SET_USER_CREATED_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          userCreatedFilter: payload
        }
      }
    
    case 'SET_SEARCH':
      return {
        ...state,
        filters: {
          ...state.filters,
          search: payload
        }
      }

    case 'SET_SEARCH_INPUT':
      return {
        ...state,
        filters: {
          ...state.filters,
          searchInput: payload
        }
      }

    case 'SET_SORT_TYPE':
      return {
        ...state,
        filters: {
          ...state.filters,
          sortType: payload
        }
      }

    case 'SET_PAGES':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pages: payload
        } 
      }

    case 'SET_PAGE':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: payload
        }
      }

    default: 
      return state;
  }
};

export default reducer;