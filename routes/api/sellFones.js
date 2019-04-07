const express = require('express')
const router = express.Router()

const fones = require('../../fones')

// Get list of fones
router.get('/', async (req, res) => {
  console.log('/api/sellFones', fones)
  res.status(200).json(fones)
})

module.exports = router
