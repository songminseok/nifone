import React from 'react'
import { fones } from '../../fones'
import FoneList from './SellFoneList'

const Sell = () => {
  return (
    <div className='container'>
      <h5>니폰 팔아봐?</h5>
      <FoneList items={fones} />
    </div>
  )
}

export default Sell
