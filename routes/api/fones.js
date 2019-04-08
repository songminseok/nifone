const express = require('express')
const router = express.Router()
const axios = require('axios')
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
      .sort('-date')
    fones.forEach((fone) => { fone.image = __fones[fone.foneId | 0].image })
    return res.json(fones)
  } catch (error) {
    return res.status(404).json(error)
  }
})

// Get a fone of specific id
router.get('/:id', (req, res) => {
  //
})

// curl -X POST 'https://beta-api.luniverse.io/tx/v1.0/transactions/PurchaseNiPhone' \
//     --header 'Authorization: Bearer 64USayvjJDqrd1u5Lu3VTZftjg9JQskcK3Qpb95dioLVn9k1V4g5YeSjKenLscWF' \
//     --header 'Content-Type: application/json' \
//     --data '{
//            "inputs": {
//                "receiverAddress": "0xa85937d6a4dde87191ad2c0355827f3a86226e40",
//                "valueAmount": "1000000000000000000"
//            }
//        }'

// Update a fone of specific id
router.put('/:id', async (req, res) => {
  const { id } = req.params
  console.log('update fone id', req.params.id, 'body params', req.body.params)
  try {
    const fone = await Fone.findByIdAndUpdate(id, req.body.params)
    const uri = 'transactions/PurchaseNiPhone'
    const data = {
      inputs: {
        receiverAddress: req.user.wallet,
        valueAmount: '' + (__fones[fone.foneId].price / 10000 * Math.pow(10, 18))
      }
    }
    const response = await axios.post(uri, data)
    console.log('purchaseNiPhone---', response)
    console.log(response.data.data)
    return res.json(response.data.data)
  } catch (error) {
    console.log('Update Fone Error ----', error)
    return res.status(500).json(error)
  }
})

router.delete('/:id', (req, res) => {
  //
})

module.exports = router
