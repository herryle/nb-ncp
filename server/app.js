const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use('/json', express.static(__dirname + '/json'))
app.use('/', express.static(__dirname + '/web'))
app.listen('3005', () => {
  console.log('http://localhost:3005/')
})
