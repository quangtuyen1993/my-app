import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authorSlice from "../feature/user.slice"
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'



const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const reducer = combineReducers({
    authorSlice
})
const store = configureStore({
  reducer,
  composedEnhancer
})

export default store

