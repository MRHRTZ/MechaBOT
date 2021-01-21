const request = require('request');
const cheerio = require('cheerio');
const express = require('express')
const PORT = process.env.PORT || 5050
const app = express()



app.get('/api/:session', (req, res) => {
     
})

app.use('*', (req, res) => {
     res.status(404).json({
          status: true,
          message: "Created By MRHRTZ",
          endpoint: feature
     })
})

app.listen(PORT, () => {
     console.log(`START ON PORT ${PORT}`)
})