import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'

import MyFoneList from './MyFoneList'
import { listFones, acceptFone, rejectFone } from '../../actions/foneActions'
import { getNiPoint } from '../../actions/nipointActions'

const MyPage = ({ nipoint, myfones, status, listFones, acceptFone, rejectFone, getNiPoint }) => {
  useEffect(() => {
    listFones()
    getNiPoint()
  }, [])

  const onAcceptFone = (id) => {
    console.log('onAcceptFone----', id)
    acceptFone(id)
  }

  const onRejectFone = (id) => {
    console.log('onRejectFone----', id)
    rejectFone(id)
  }

  let foneList = null
  if (myfones && myfones.length > 0) {
    foneList = <MyFoneList items={myfones} onAccept={onAcceptFone} onReject={onRejectFone} />
  }

  return (
    <div className='container'>
      <h5>마이 페이지</h5>
      <div className='divider' />
      <div className='row'>
        <h5 className='col s4 offset-s2'>NiPoint:{' '}</h5>
        <h5 className='col s5 left-align'>
          { numeral(nipoint).divide(Math.pow(10, 18)).format('0,0') }
        </h5>
      </div>
      {foneList}
    </div>
  )
}

export default connect(
  (state) => ({
    myfones: state.fone.fones,
    nipoint: state.fone.nipoint,
    status: state.fone.accept | state.fone.reject
  }),
  { listFones, getNiPoint, acceptFone, rejectFone }
)(MyPage)
