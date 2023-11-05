import { apiMiddleware } from "redux-api-middleware";
import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import rootReducer from "../redux/reducers";

const reducer = combineReducers(rootReducer);
const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);

const configureStore = initialState => {
  return createStoreWithMiddleware(reducer, initialState);
};

export const initialState = {
  auth: JSON.parse(localStorage.getItem("auth")),
  form: null,
  exercise: JSON.parse(localStorage.getItem("exercise"))
};

export default configureStore(initialState);
