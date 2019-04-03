const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const uuidv1 = require('uuid/v1')
const axios = require('axios')

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const User = require('../../models/User')

// @route POST api/user/register
// @desc Register user
// @access Public

router.post('/register', (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' })
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        // Generate unique userKey using uuid
        newUser.userKey = uuidv1()
        axios.post('/wallets', {
          'walletType': 'LUNIVERSE',
          'userKey': newUser.userKey
        }).then(
          (response) => {
            console.log('api/register--------', response.data)
            newUser.wallet = response.data.data.address
            newUser.save()
              .then(
                user => res.json(user)
              ).catch(
                err => {
                  res.status(500).json({ server: 'Internal Account DB Error' })
                  console.log(err)
                }
              )
          }
        ).catch(
          (error) => {
            res.status(500).json({ server: 'Internal Server Error: Wallet' })
            console.log(error)
          }
        )
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
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name,
              wallet: user.wallet
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

module.exports = router
