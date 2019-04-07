const express = require('express')
const router = express.Router()

const keys = require('../../config/keys')

const Fone = require('../../models/Fone')

const isAuthenticated = (req, res, next) => {
  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  console.log('[isAuthenticated]--', req.isAuthenticated())
  return next()
}
// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log(Date.now(), '[/api/fones/]', req.body)
  return next()
})

router.use(isAuthenticated)

// Create a new fone
router.post('/', async (req, res) => {
  const newFone = new Fone({
    name: req.body.name,
    money: {
      deposit: 10000
    }
  })

  try {
    const fone = await newFone.save()
    console.log('newFone is registered----', fone)
    return res.json(fone)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// Get list of fones
router.get('/', async (req, res) => {
  try {
    const fones = await Fone.find()
    console.log('fones-----', fones)
    return res.json(fones)
  } catch (error) {
    return res.status(404).json(error)
  }
})

// Get a fone of specific id
router.get('/:id', (req, res) => {
  //
})

// Update a fone of specific id
router.put('/:id', (req, res) => {
  //
})

router.delete('/:id', (req, res) => {
  //
})

module.exports = router
