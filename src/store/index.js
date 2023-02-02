import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// const composeEnhancers =
//   (process.env.NODE_ENV === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null) || compose;

const initialState = {
  errors: {
    type: null,
    message: null,
  },
};

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, initialState, composedEnhancer);

export default store;
