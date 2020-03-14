// app.js
// require models used in this project
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

// set connection to mongoDB
mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })

// define const value
const app = express()
const port = 3000
const db = mongoose.connection

// DB connect error
db.on('error', () => {
  console.log('mongoDB error!')
})

// DB connect successfully
db.once('open', () => {
  console.log('mongoDB connected!')
})

// setting express-handlebars here
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))

// listening port
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})