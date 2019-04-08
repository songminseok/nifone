const express = require('express')
const router = express.Router()
const checkToken = require('../middlewares/checkToken')

const Fone = require('../../models/Fone')
const __fones = require('../../fones')

router.use(checkToken)

// Create a new fone
router.post('/', async (req, res) => {
  const newFone = new Fone({
    name: req.body.name,
    foneId: req.body.foneId,
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
    const options = req.user.role === 'user'
      ? { user: req.user.id }
      : {}
    const fones = await Fone
      .find(options)
      .populate('user')
    fones.forEach((fone) => { fone.image = __fones[fone.foneId | 0].image })
    console.log('get fones---', fones)
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
