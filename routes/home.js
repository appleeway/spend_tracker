// routes/home.js
const express = require('express')
const router = express.Router()

// routes
router.get('/', (req, res) => {
  res.send('This is home page')
})

module.exports = router