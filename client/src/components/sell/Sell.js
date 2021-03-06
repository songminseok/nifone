import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import M from 'materialize-css'
import numeral from 'numeral'

import SellFoneList from './SellFoneList'
import { sellFone, listSellFones } from '../../actions/foneActions'
import Loading from '../loading/Loading'

const Sell = ({ pending, fones, sellFone, listSellFones }) => {
  const [niFone, selectNiFone] = useState(0)
  const refModal = useRef(null)

  useEffect(() => {
    M.Modal.init(refModal.current)
    console.log('refModal current inited')
    if (!fones) {
      listSellFones()
    }
  }, [])

  const onSelectFone = (i) => {
    console.log('onSelectFone---', i)
    selectNiFone(i)
    console.log('onSelectFone---', refModal.current)
    M.Modal.getInstance(refModal.current).open()
  }

  const onConfirmSell = () => {
    console.log('NiFone is soon in inspection', fones[niFone])
    sellFone({ ...fones[niFone], foneId: niFone })
  }

  console.log('[Sell]----', fones)

  return (
    <div className='container'>
      <h5>니폰 팔아봐?</h5>

      { pending ? <Loading /> : <SellFoneList items={fones} onSelect={onSelectFone} /> }

      <div id='confirm-modal' ref={refModal} className='modal bottom-sheet'>
        <div className='modal-content'>
          <div className='row valign-wrapper'>
            <img
              className='col s2 circle responsive-image'
              src={fones ? fones[niFone].image : null}
              alt={fones ? fones[niFone].name : 'no image'} />
            <div className='col s10 row'>
              <h5 className='col s12'>
                진짜루 니 {fones ? fones[niFone].name : 'no phone'} 폰 팔거야?
              </h5>
              <div className='col s10 offset-s1 divider' />
              <h6 className='col s12'>
                {numeral(fones ? fones[niFone].price : 0).format('0,0') + ' 원'} 줄께
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

export default connect(
  (state) => ({
    pending: state.fone.pending,
    fones: state.fone.sellFones
  }),
  { sellFone, listSellFones }
)(Sell)
