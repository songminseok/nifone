const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const axios = require('axios')

const users = require('./routes/api/users')
const fones = require('./routes/api/fones')
const sellFones = require('./routes/api/sellFones')
const luniverseConfig = require('./config/luniverse')

// Global axios defaults
axios.defaults.baseURL = luniverseConfig.URI
axios.defaults.headers.common['Authorization'] = luniverseConfig.Authorization
axios.defaults.headers.post['Content-Type'] = 'application/json'

const app = express()

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({ extended: false })
)
// parse application/json
app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(error => console.log(error))

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// static resources
app.use('/images', express.static('images'))

// Routes
app.use('/api/users', users)
app.use('/api/fones', fones)
app.use('/api/sellFones', sellFones)

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Server up and running on port ${port} !`))
