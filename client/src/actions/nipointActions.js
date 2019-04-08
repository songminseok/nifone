import axios from 'axios'
import _fetching from './common'

import {
  DATA_FETCH_PENDING,
  DATA_FETCH_SUCCESS,
  DATA_FETCH_FAIL
} from './types'

export const getNiPoint = () => (dispatch) => {
  dispatch(fetchinNiPoint())
  axios.get('/api/users/nipoint')
    .then((response) => {
      dispatch(fetchedNiPoint(response))
    })
    .catch((err) => {
      dispatch(fetchingNiPointFailed(err))
    })
}

const _nipoint = (action, data) => {
  return _fetching('nipoint', action, data)
}

export const fetchinNiPoint = () => {
  return _nipoint(DATA_FETCH_PENDING)
}

export const fetchedNiPoint = (res) => {
  return _nipoint(DATA_FETCH_SUCCESS, res.data)
}

export const fetchingNiPointFailed = (err) => {
  return _nipoint(DATA_FETCH_FAIL, { err: err })
}
