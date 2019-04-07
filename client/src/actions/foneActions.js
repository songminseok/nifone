import axios from 'axios'

import {
  DATA_FETCH_PENDING,
  DATA_FETCH_SUCCESS,
  DATA_FETCH_FAIL
} from './types'

export const sellFone = (fone) => (dispatch) => {
  dispatch(sellingFone(fone))
  axios.post('/api/fones', fone)
    .then((response) => {
      dispatch(soldFone(response))
    })
    .catch((err) => {
      dispatch(sellingFailed(err))
    })
}

export const listFone = () => (dispatch) => {
  fetchingFoneList()
  axios.get('/api/fones')
    .then((response) => {
      fetchedFoneList(response)
    })
    .catch((err) => {
      fetchingFailed(err)
    })
}

const _selling = (action, data) => {
  return _fetching('sell', action, data)
}

const _fetching = (item, action, data) => {
  return {
    type: action,
    data: item,
    payload: {
      item: data
    }
  }
}

export const sellingFone = (fone) => {
  return _selling(DATA_FETCH_PENDING, fone)
}

export const soldFone = (res) => {
  return _selling(DATA_FETCH_SUCCESS, { res: res })
}

export const sellingFailed = (err) => {
  return _selling(DATA_FETCH_FAIL, { err: err })
}

export const fetchingFoneList = () => {
  _fetching('fones', DATA_FETCH_PENDING)
  //   type: DATA_FETCH_PENDING,
  //   payload: {
  //     action: 'listFone'
  //   }
  // }
}

export const fetchedFoneList = (res) => {
  _fetching('fones', DATA_FETCH_SUCCESS, { res: res })
  // return {
  //   type: DATA_FETCH_SUCCESS,
  //   payload: {
  //     action: 'listFone',
  //     response: res
  //   }
  // }
}

export const fetchingFailed = (err) => {
  _fetching('fones', DATA_FETCH_FAIL, { err: err })
  // return {
  //   type: DATA_FETCH_FAIL,
  //   payload: {
  //     action: 'listFone',
  //     error: err
  //   }
  // }
}
