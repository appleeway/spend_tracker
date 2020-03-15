// routes/home.js
const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// 載入 auth middleware 裡的 authenticated 方法
const { authenticated } = require('../config/auth')

// routes
router.get('/', authenticated, (req, res) => {

  const category = req.query.category || ''
  const _regex_category = new RegExp(category)

  Record.find({ category: { $regex: _regex_category } })
    .lean()
    .then(records => {
      // 計算總金額
      let totalAmount = 0
      if (records.length > 0) totalAmount = records.map(record => parseInt(record.amount)).reduce((a, b) => a + b)

      records.forEach((item, index, array) => {
        let date = item.date.toISOString().split("T")[0]
        array[index].date = date
      })

      return res.render('index', {
        records,
        totalAmount,
        category
      })
    })
})

module.exports = router