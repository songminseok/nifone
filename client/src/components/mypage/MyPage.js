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
      <h5>마이 페이지</h5>
      <div className='divider' />
      <div className='row'>
        <h5 sytle={{ display: 'inline-block' }} className='col s4 offset-s2 right-align'>NiPoint:{' '}</h5>{' '}
        <h5 className='col s5 left-align'>{ numeral(1000).format('0,0') }</h5>
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
