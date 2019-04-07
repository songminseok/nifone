import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'

import MyFoneList from './MyFoneList'
import { listFones } from '../../actions/foneActions'

const MyPage = ({ myfones, listFones }) => {
  useEffect(() => {
    listFones()
  }, [])

  const onAcceptFone = (id) => {
    console.log('onAcceptFone----', id)
  }

  const onRejectFone = (id) => {
    console.log('onRejectFone----', id)
  }

  let foneList = null
  if (myfones && myfones.length > 0) {
    foneList = <MyFoneList items={myfones} onAccept={onAcceptFone} onReject={onRejectFone} />
  }
  console.log('MyPage---', myfones)

  return (
    <div className='container'>
      <h5>My Page</h5>
      <div className='row'>
        <h6 sytle={{ display: 'inline-block' }}>NiPoint</h6>{' '}
        <span>{ numeral(1000).format('0,0') }</span>
      </div>
      {foneList}
    </div>
  )
}

export default connect(
  (state) => ({
    myfones: state.fone.fones
  }),
  { listFones }
)(MyPage)
