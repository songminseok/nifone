const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

const Fone = require('../../models/Fone')

// Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = req.headers['authorization']

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ')
    const token = bearer[1]

    req.token = token
    next()
  } else {
    // If header is undefined return Forbidden (403)
    res.sendStatus(403)
  }
}

const isAuthenticated = async (req, res, next) => {
  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  console.log('[isAuthenticated]--', req.isAuthenticated())
  console.log('[isAuthenticated]--', req.token)

  try {
    const user = await jwt.verify(req.token, keys.secretOrKey)
    console.log('SUCCESS: Connected to protected route', user)
    req.user = user
    next()
  } catch (err) {
    console.log('ERROR: Could not connect to the protected route')
    return res.status(403).json({ error: 'Unauthorized Access' })
  }
}

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log(Date.now(), '[/api/fones/]', req.body)
  return next()
})

router.use(checkToken)
router.use(isAuthenticated)

// Create a new fone
router.post('/', async (req, res) => {
  const newFone = new Fone({
    name: req.body.name,
    money: {
      deposit: 10000
    },
    user: req.user.id
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
