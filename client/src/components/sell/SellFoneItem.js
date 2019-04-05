import React from 'react'
import numeral from 'numeral'

const SellFoneItem = ({ item, onSelect }) => {
  const { image, name, price } = item

  return (
    <div style={{ marginTop: '2rem' }} className='col s6'>
      <div className='row'>
        <img className='responsive-img' src={image} alt={name} />
        <h6 className='card-title'>{numeral(price).format('0,0') + ' 원'}</h6>
      </div>
      <div className='row'>
        <a className='col s8 offset-s2 waves-effect waves-light btn' href='#!' onClick={onSelect}>
          팔기{' '}
          <i style={{ verticalAlign: 'middle' }} className='large material-icons'>local_atm</i>
        </a>
      </div>
      <div className='divider' />
    </div>
  )
}

export default SellFoneItem
