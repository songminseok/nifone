import React from 'react'

// .cards-container {
//   display: flex;
// }

// .cards-container .card {
//   display: inline-block;
//   overflow: visible;
// }

const SellFoneItem = ({ item }) => {
  const { image, name, price } = item

  return (
    <div style={{ marginTop: '2rem' }} className='col s6'>
      <div className='row'>
        <img className='responsive-img' src={image} alt={name} />
        <span className='card-title'>{price}</span>
      </div>
      <div className='row'>
        <a className='col s8 offset-s2 waves-effect waves-light btn' href='#!'>
          팔기{' '}
          <i style={{ verticalAlign: 'middle' }} className='large material-icons'>local_atm</i>
        </a>
      </div>
      <div className='divider' />
    </div>
  )
}

export default SellFoneItem
