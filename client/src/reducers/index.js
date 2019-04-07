import { combineReducers } from 'redux'
import authReducer from './authReducer'
import foneReducer from './foneReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  fone: foneReducer
})
