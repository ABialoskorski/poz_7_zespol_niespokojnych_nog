require('dotenv').config()
const express = require('express')
const app = express()

app.use('/', require('./routers/api'))

app.listen(process.env.PORT, () => {
  console.log('App is listening at ' + process.env.PORT)
})
