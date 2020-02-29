const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(cors())

app.use('/json', express.static(__dirname + '/json'))
app.use('/', express.static(__dirname + '/static'))

app.get('/chartMock', async (req, res) => {
  const data = await axios.get('https://wxyq.nbsghy.com/mock/chartMock.json')
  res.send(data.data)
})

app.get('/cityMock', async (req, res) => {
  const data = await axios.get('https://wxyq.nbsghy.com/mock/cityMock.json')
  res.send(data.data)
})

app.get('/detailsData', async (req, res) => {
  const data = await axios.get('https://wxyq.nbsghy.com/mock/detailsData.json')
  res.send(data.data)
})

app.get('/headMock', async (req, res) => {
  const data = await axios.get('https://wxyq.nbsghy.com/mock/headMock.json')
  res.send(data.data)
})

app.get('/mockData', async (req, res) => {
  const data = await axios.get('https://wxyq.nbsghy.com/mock/mockData.json')
  res.send(data.data)
})

app.get('/NBRegion', async (req, res) => {
  const data = await axios.get('https://wxyq.nbsghy.com/mock/NBRegion.json')
  res.send(data.data)
})

app.get('/timePick', async (req, res) => {
  const data = await axios.get('https://wxyq.nbsghy.com/mock/timePick.json')
  res.send(data.data)
})

app.listen('3005', () => {
  console.log('http://localhost:3005/')
})
