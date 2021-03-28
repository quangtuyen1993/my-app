import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authorReducer from "../feature/user/user.slice";
import stationReducer from "../feature/station/station.slice";
import { applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const reducer = combineReducers({
  authorReducer,
  stationReducer,
});
const store = configureStore({
  reducer,
  composedEnhancer,
});

export default store;
