const { default: Axios } = require('axios')
const cheerio = require('cheerio')
const qs = require('querystring')

function facebook(url) {
     return new Promise((resolve, reject) => {
          Axios({
               method: 'POST',
               url: 'https://www.getfvid.com/downloader',
               headers: {
                    'content-type': 'application/x-www-form-urlencoded'
               },
               data: qs.stringify({ url: url })
          })
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    let result = []
                    $('div > p > a.btn-download').get().map(rest => {
                         result.push({ [$(rest).text()]: $(rest).attr('href') })
                    })
                    resolve(result)
               })
               .catch(e => {
                    reject({ status: false, message: e.message })
               })
     })
}

// facebook('https://www.facebook.com/RealStoriesChannel/videos/329010051073015/')
//      .then(console.log)
//      .catch(console.log)

module.exports = { facebook }