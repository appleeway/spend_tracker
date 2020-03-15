// routes/record.js
const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../models/record')

// 新增資料網頁 ok
router.get('/new', (req, res) => {
  const today = moment().format('YYYY-MM-DD')
  const record = { date: today }
  res.render('addUpdate', {
    record,
    action: "新增"
  })
})

// 新增一筆資料 ok
router.post('/new', (req, res) => {
  const { name, category, amount, date } = req.body
  const record = Record({
    name,
    category,
    amount,
    date,
    // userId: req.user._id
  })
  record.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })
})

// 瀏覽全部資料 ok
router.get('/', (req, res) => {
  res.redirect('/')
})

// 修改資料網頁
router.get('/:id/update', (req, res) => {
  const id = req.params.id
  res.render('update', { id })
})

// 修改一筆資料
router.put('/:id', (req, res) => {
  res.redirect('/')
})

// 刪除一筆資料
router.delete('/:id', (req, res) => {
  res.redirect('/')
})

module.exports = router