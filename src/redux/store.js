import { createStore, combineReducers } from 'redux'
import bookstore from './reducers/bookstore'

const allReducer = combineReducers({
    bookstore,
})

export default createStore(allReducer)