import React from 'react'
import FoneItem from './FoneItem'

const FoneList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <FoneItem id={index} image={item.image} title={item.title} />
      ))}
    </div>
  )
}

export default FoneList
