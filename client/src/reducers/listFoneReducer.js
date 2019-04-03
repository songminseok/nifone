import {
  DATA_FETCH_PENDING,
  DATA_FETCH_SUCCESS,
  DATA_FETCH_FAIL
} from '../actions/types'

const initialState = {
  res: {},
  pending: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_FETCH_PENDING:
      return { ...state, pending: true }
    case DATA_FETCH_SUCCESS:
    case DATA_FETCH_FAIL:
      return {
        ...state,
        pending: false,
        res: action.payload[action.data]
      }
    default:
      return state
  }
}
