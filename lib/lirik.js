const cheerio = require('cheerio')
const { default: Axios } = require('axios')

function lirik(query) {
     return new Promise((resolve, reject) => {
          Axios.get('https://www.musixmatch.com/search/' + query)
          .then(({ data }) => {
               const $ = cheerio.load(data)
               const title = $('div.main-panel > div:nth-child(1) > div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a.title > span').text()
               const url = 'https://www.musixmatch.com' + $('div.main-panel > div:nth-child(1) > div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a.title').attr('href')
               const artist = $('div.main-panel > div:nth-child(1) > div.box-content > div > ul > li > div > div.media-card-body > div > h3 > span > span > a.artist').text()
               Axios.get(url)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const image = 'https:' + $('div.banner-album-image-desktop > img').attr('src')
                    const lyrics = $('span.lyrics__content__ok').text()
                    resolve({
                         status: true,
                         title: title,
                         artist: artist,
                         url: url,
                         img: image,
                         lyrics: lyrics
                    })
               })
               .catch((e) => reject({ status: false, message: e.message }))
          })
          .catch((e) => reject({ status: false, message: e.message }))
     })
}

module.exports.lirik = lirik
// lirik('cinta kita')
// .then(console.log)
// .catch(console.log)