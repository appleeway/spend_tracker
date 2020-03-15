// app.js
// require models used in this project
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
require('./handlebars_helper')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')


// set connection to mongoDB
mongoose.connect('mongodb://localhost/record', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })

// define const value
const app = express()
const port = 3000
const db = mongoose.connection

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// DB connect error
db.on('error', () => {
  console.log('mongoDB error!')
})

// DB connect successfully
db.once('open', () => {
  console.log('mongoDB connected!')
})

// setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// setting method_override
app.use(methodOverride('_method'))

// setting express-handlebars here
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting session
app.use(session({
  secret: 'hotcat',
  resave: false,
  saveUninitialized: true,
}))

// 使用connect-flash
app.use(flash())

// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

// listening port
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})