// routes/record.js
const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../models/record')

// 新增資料網頁 
router.get('/new', (req, res) => {
  const today = moment().format('YYYY-MM-DD')
  const record = { date: today }
  res.render('addUpdate', {
    record,
    action: "新增"
  })
})

// 新增一筆資料 
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

// 瀏覽全部資料 
router.get('/', (req, res) => {
  res.redirect('/')
})

// 修改資料網頁
router.get('/:id/edit', (req, res) => {
  Record.findById(req.params.id)
    .lean()
    .exec((err, record) => {
      if (err) return console.error(err)

      let date = record.date.toISOString().split("T")[0]
      record.date = date

      return res.render('addupdate', {
        record,
        action: "修改"
      })
    })
})

// 修改一筆資料
router.put('/:id', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)

    Object.assign(record, req.body)

    record.date = new Date(req.body.date)
    record.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 刪除一筆資料
router.delete('/:id', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router