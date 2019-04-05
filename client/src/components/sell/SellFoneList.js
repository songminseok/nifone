import React from 'react'
import SellFoneItem from './SellFoneItem'

const SellFoneList = ({ items, onSelect }) => {
  return (
    <div className='row'>
      {items.map((item, index) => (
        <SellFoneItem key={index} item={item} onSelect={() => onSelect(index)} />
      ))}
    </div>
  )
}

export default SellFoneList
