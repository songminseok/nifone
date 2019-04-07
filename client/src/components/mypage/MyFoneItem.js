import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'

const MyFoneItem = ({ fones, auth, item, onAccept, onReject }) => {
  const name = item.name
  const price = 300000
  const image = '/images/iphone-8.jpg'

  console.log('MyFoneItem----', fones)

  return (
    <>
      <div style={{ marginBottom: '5px' }} className='row'>
        <div className='col s4'>
          <img className='responsive-img' src={image} alt={name} />
          <span><strong>{numeral(price).format('0,0') + '원'}</strong></span>
        </div>
        <div className='col s8'>
          <div style={{ marginBottom: '0px' }} className='row'>
            <a
              style={auth.user.role === 'user' ? { visibility: 'hidden' } : {}}
              className='col s5 waves-effect waves-light btn'
              href='#!'
              onClick={onAccept}>
              구매 승인{' '}
              <i style={{ verticalAlign: 'middle' }} className='large material-icons'>local_atm</i>
            </a>
            <a
              className='col s5 offset-s1 waves-effect waves-light btn'
              href='#!'
              onClick={onReject}>
              구매 거부{' '}
              <i style={{ verticalAlign: 'middle' }} className='large material-icons'>local_atm</i>
            </a>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '5px' }} className='divider row' />
    </>
  )
}

export default connect(
  (state) => ({
    fones: state.fone.sellFones,
    auth: state.auth
  })
)(MyFoneItem)
