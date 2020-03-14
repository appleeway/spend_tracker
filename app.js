// app.js
// require models used in this project
const express = require('express')
const exphbs = require('express-handlebars')

// define const value
const app = express()
const port = 3000

// setting express-handlebars here
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes
app.use('/', require('./routes/home'))

// listening port
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})