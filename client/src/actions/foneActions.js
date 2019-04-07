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

export const listFones = () => (dispatch) => {
  dispatch(fetchingFoneList())
  axios.get('/api/fones')
    .then((response) => {
      dispatch(fetchedFoneList(response))
    })
    .catch((err) => {
      dispatch(fetchingFailed(err))
    })
}

export const listSellFones = () => (dispatch, getState) => {
  const prevState = getState()
  console.log('[listSellFones]---', prevState.sellFones)
  if (prevState.fone.sellFones instanceof Array) {
    dispatch(fetchedSellFoneList(prevState.fone.sellFones))
    return
  }
  dispatch(fetchingSellFoneList())
  axios.get('/api/sellFones')
    .then((response) => {
      dispatch(fetchedSellFoneList(response))
    })
    .catch((err) => {
      dispatch(fetchingSellFoneFailed(err))
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
      [item]: data
    }
  }
}

export const sellingFone = (fone) => {
  return _selling(DATA_FETCH_PENDING, fone)
}

export const soldFone = (res) => {
  return _selling(DATA_FETCH_SUCCESS, res.data)
}

export const sellingFailed = (err) => {
  return _selling(DATA_FETCH_FAIL, { err: err })
}

export const fetchingFoneList = () => {
  return _fetching('fones', DATA_FETCH_PENDING)
}

export const fetchedFoneList = (res) => {
  return _fetching('fones', DATA_FETCH_SUCCESS, res.data)
}

export const fetchingFailed = (err) => {
  return _fetching('fones', DATA_FETCH_FAIL, { err: err })
}

export const fetchingSellFoneList = () => {
  return _fetching('sellFones', DATA_FETCH_PENDING)
}

export const fetchedSellFoneList = (res) => {
  return _fetching('sellFones', DATA_FETCH_SUCCESS, res.data)
}

export const fetchingSellFoneFailed = (err) => {
  return _fetching('sellFones', DATA_FETCH_FAIL, { err: err })
}
