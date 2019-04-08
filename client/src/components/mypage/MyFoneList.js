import React from 'react'
import MyFoneItem from './MyFoneItem'

const MyFoneList = ({ items, onAccept, onReject }) => {
  console.log('MyFoneList --- ', items)
  return (
    <div className='row'>
      {items.map((item) => (
        <MyFoneItem
          key={item._id}
          item={item}
          onAccept={onAccept}
          onReject={onReject} />
      ))}
    </div>
  )
}

export default MyFoneList
