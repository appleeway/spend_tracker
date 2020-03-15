// models/seeds/seeder.js
const mongoose = require('mongoose')
const Record = require('../record')
const User = require('../user')
const bcrypt = require('bcryptjs')

// set connection to mongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/record', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('DB error!')
})

db.once('open', () => {
  console.log('DB connected!')

  const user = new User({
    name: 'user1',
    email: 'user1@gmail.com',
    password: '1234'
  })

  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err
      user.password = hash

      user
        .save()
        .then(user => {
          res.redirect('/')
        })
        .catch(err => console.log(err))
    })
  )

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