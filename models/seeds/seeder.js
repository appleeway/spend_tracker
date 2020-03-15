// models/seeds/seeder.js
const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')

// set connection to mongoDB
mongoose.connect('mongodb://localhost/record', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('DB error!')
})

db.once('open', () => {
  console.log('DB connected!')

  const user = new User({
    name: 'user1',
    email: 'user1@gamil.com',
    password: '1234'
  })

  user.save((err, user) => {
    if (err) {
      return console.error(err)
    }
  })

  const recordData = [
    {
      name: '沙發',
      category: 'home',
      amount: '20000'
    },
    {
      name: '高鐵票',
      category: 'traffic',
      amount: '1350'
    }, {
      name: '打保齡球',
      category: 'entertainment',
      amount: '150'
    }, {
      name: '冰淇淋',
      category: 'food',
      amount: '45'
    }, {
      name: '借小明錢',
      category: 'other',
      amount: '5000'
    }
  ]

  for (i = 0; i < recordData.length; i++) {
    recordData[i].userId = user._id
  }

  Record.create(recordData, (err, records) => {
    if (err) {
      return console.error(err)
    }
  })
  console.log('done!')
})