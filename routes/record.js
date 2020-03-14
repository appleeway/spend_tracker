// routes/record.js
const express = require('express')
const router = express.Router()

// 新增資料網頁
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一筆資料
router.post('/new', (req, res) => {
  res.redirect('/')
})

// 瀏覽全部資料
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