import React, { useRef, useEffect, useState } from 'react'
import M from 'materialize-css'
import numeral from 'numeral'

import { fones } from '../../fones'
import SellFoneList from './SellFoneList'

const Sell = () => {
  const [niFone, selectNiFone] = useState(0)
  const refModal = useRef(null)

  useEffect(() => {
    M.Modal.init(refModal.current)
  }, [])

  const onSelectFone = (i) => {
    console.log('onSelectFone---', i)
    selectNiFone(i)
    M.Modal.getInstance(refModal.current).open()
  }

  const onConfirmSell = () => {
    console.log('NiFone is soon in inspection', fones[niFone])
  }

  return (
    <div className='container'>
      <h5>니폰 팔아봐?</h5>
      <SellFoneList items={fones} onSelect={onSelectFone} />

      <div id='confirm-modal' ref={refModal} className='modal bottom-sheet'>
        <div className='modal-content'>
          <div className='row valign-wrapper'>
            <img
              className='col s2 circle responsive-image'
              src={fones[niFone].image}
              alt={fones[niFone].name} />
            <div className='col s10 row'>
              <h5 className='col s12'>
                진짜루 니 {fones[niFone].name} 폰 팔거야?
              </h5>
              <div className='col s10 offset-s1 divider' />
              <h6 className='col s12'>
                {numeral(fones[niFone].price).format('0,0') + ' 원'} 줄께
              </h6>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <button
            onClick={onConfirmSell}
            className='modal-close waves-effect waves-green btn-flat'>
            응 팔께!!!
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sell
