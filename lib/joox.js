const cheerio = require('cheerio')
const { default: Axios } = require('axios')

function search(query) {
     return new Promise((resolve, reject) => {
          Axios.get(`http://joox.hurtzcrafter.xyz/apisearch.php?q=${query}`)
          .then(({ data }) => {
               resolve(data)
          })
          .catch(reject)
     })
}

function songGet(query) {
     return new Promise((resolve, reject) => {
          Axios.get(`http://joox.hurtzcrafter.xyz/apisearch.php?q=${query}`)
          .then(({ data }) => {
               const encoded = Buffer.from(data.itemlist[0].songid).toString('base64')
               Axios.get(`http://joox.hurtzcrafter.xyz/song.php?id=${encoded}`)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const title = $('div.text-center > h2').text()
                    const image = $('div.text-center > img').attr('src')
                    const audraw = $('audio > source').attr('src')
                    const release = $('b#release').text()
                    const artist = $('a#artist').text()
                    const playtime = $('b#playtime').text()
                    const mp3url = 'http://joox.hurtzcrafter.xyz/' + $('a#mp3').attr('href')
                    const m4aurl = 'http://joox.hurtzcrafter.xyz/' + $('a#m4a').attr('href') 
                    const lyrics = []
                    $('pre').get().map((rest) => {
                         lyrics.push($(rest).text())
                    })
                    resolve({
                         title: title,
                         image: image,
                         audraw: audraw,
                         release: release,
                         artist: artist,
                         playtime: playtime,
                         mp3url: mp3url,
                         m4aurl: m4aurl,
                         lyrics: lyrics.replace('***Recoded By J***','***Scrape By MRHRTZ***')
                    })
               })
          })
          .catch(reject)
     })
}

// search('numb')
songGet('numb')
.then(console.log)
.catch(console.log)