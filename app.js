// app.js
// require models used in this project
const express = require('express')

// define const value
const app = express()
const port = 3000

// routes
app.use('/', require('./routes/home'))

// listening port
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})