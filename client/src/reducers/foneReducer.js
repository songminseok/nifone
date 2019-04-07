import {
  DATA_FETCH_PENDING,
  DATA_FETCH_SUCCESS,
  DATA_FETCH_FAIL
} from '../actions/types'

const initialState = {
  fones: [],
  pending: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_FETCH_PENDING:
      return { ...state, pending: true }
    case DATA_FETCH_SUCCESS:
    case DATA_FETCH_FAIL:
      console.log('DATA_FETCHED----', action.payload[action.data])
      return {
        ...state,
        pending: false,
        fones: action.payload[action.data]
      }
    default:
      return state
  }
}
