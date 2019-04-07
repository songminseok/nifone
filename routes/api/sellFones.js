const express = require('express')
const router = express.Router()

const fones = [
  {
    image: '/images/galaxy-s-8.jpg',
    name: '갤럭시 S8',
    price: 300000
  },
  {
    image: '/images/galaxy-note-8.jpg',
    name: '갤럭시 노트 8',
    price: 400000
  },
  {
    image: '/images/iphone-8.jpg',
    name: '아이폰 8',
    price: 500000
  },
  {
    image: '/images/iphone-x.jpg',
    name: '아이폰 X',
    price: 800000
  }
]

// Get list of fones
router.get('/', async (req, res) => {
  console.log('/api/sellFones', fones)
  res.status(200).json(fones)
})

module.exports = router
