const { default: Axios } = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

function logoMaker(text, type = 'random') {
     if (!text) return { status: false, message: 'Insert The Text!'}
     let dataText = JSON.parse(fs.readFileSync('./database/logo.json'))
     if (type == 'random') {
          let result = dataText[text.substring(0, 1).toUpperCase()][Math.floor(Math.random() * dataText[text.substring(0, 1).toUpperCase()].length)] + text
          return { status: true, result: result }
     } else {
          if (isNaN(type)) return { status: false, message: 'Type is not a valid number!' }
          if (Number(type) > dataText[text.substring(0, 1).toUpperCase()].length) return { status: false, message: `Max ${dataText[text.substring(0, 1).toUpperCase()].length}.`}
          let result = dataText[text.substring(0, 1).toUpperCase()][type] + text
          return { status: true, result: result }
     }
}

console.log(logoMaker('amsu'))