import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";

const { REACT_APP_ENV } = process.env.REACT_APP_ENV;

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

let store;

REACT_APP_ENV === "DEVELOPMENT" 
  ? store = createStore(rootReducer, applyMiddleware(thunk))
  : store = createStore(rootReducer, enhancer);

export default store