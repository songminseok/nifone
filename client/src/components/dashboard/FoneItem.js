import React from 'react'

const FoneItem = (props) => {
  const { image, title } = props

  return (
    <div>
      <img src={image} alt='Fone' width='100px' />
      <p>{title}</p>
    </div>
  )
}

export default FoneItem
