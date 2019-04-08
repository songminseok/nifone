const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const uuidv1 = require('uuid/v1')
const axios = require('axios')

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const checkToken = require('../middlewares/checkToken')

const User = require('../../models/User')

// @route POST api/user/register
// @desc Register user
// @access Public

router.post('/register', async (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Check for admin is already created
  if (req.body.role === 'admin') {
    const admin = await User.findOne({ role: 'admin' })
    if (admin) {
      return res.status(400).json({ role: `Admin(${admin.email}) is already created!!!` })
    }
  } else if (req.body.role !== 'user') {
    res.status(400).json({ role: 'Unkown role (user or admin)' })
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' })
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    })

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err
        newUser.password = hash
        // Generate unique userKey using uuid
        newUser.userKey = uuidv1()
        // If the user is admin, no need to request wallet address
        if (newUser.role === 'admin') {
          newUser.wallet = '0x5d0a765c918f6d3dab47860e11e2a2dc8d01a61c'
        } else {
          try {
            const response = await axios.post('/wallets', {
              'walletType': 'LUNIVERSE',
              'userKey': newUser.userKey
            })
            newUser.wallet = response.data.data.address
          } catch (error) {
            console.log(error)
            return res.status(500).json({ server: 'Internal Server Error: Wallet' })
          }
        }

        // Save new User
        try {
          await newUser.save()
          return res.json(user)
        } catch (error) {
          console.log(error)
          return res.status(500).json({ server: 'Internal Account DB Error' })
        }
      })
    })
  })
})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { email, password } = req.body

  // Find user by email
  User.findOne({ email }).then(
    user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: 'Email not found' })
      }

      // Check password
      bcrypt.compare(password, user.password).then(
        isMatch => {
          if (isMatch) {
            // User matched
            if (!user.role) {
              user.role = 'user'
            }
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name,
              wallet: user.wallet,
              role: user.role
            }
            console.log('/login ---', payload)
            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926 // 1 year in seconds
              },
              (err, token) => {
                if (err) {
                  return res.status(400).json({
                    jwtSignError: 'JWT Signing Error: ' + err
                  })
                }
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            )
          } else {
            return res.status(400).json({
              passwordincorrect: 'Password incorrect'
            })
          }
        }
      )
    }
  )
})

//curl -X GET 'https://beta-api.luniverse.io/tx/v1.0/wallets/0xa85937d6a4dde87191ad2c0355827f3a86226e40/NP/NFP/balance' \
router.use('/nipoint', checkToken)

router.get('/nipoint', async (req, res) => {
  const uri = `/wallets/${req.user.wallet}/NP/NFP/balance`
  try {
    const response = await axios.get(uri)
    const point = response.data.data.balance
    res.json(point)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ server: 'Internal Server Error: Balance' })
  }
})

module.exports = router
