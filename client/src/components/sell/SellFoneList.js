import React from 'react'
import SellFoneItem from './SellFoneItem'

const SellFoneList = ({ items }) => {
  return (
    <div className='row'>
      {items.map((item, index) => (
        <SellFoneItem key={index} item={item} />
      ))}
    </div>
  )
}

export default SellFoneList
