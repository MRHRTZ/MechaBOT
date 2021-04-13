const fs = require('fs')
const { default: Axios } = require('axios')
const cheerio = require('cheerio')
function sleep(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
}
//0-2684
function tebak_gambar() {
     return new Promise((resolve, reject) => {
          if (fs.existsSync('./lib/database/tebak-gambar.json')) return reject({ status: false, message: 'TG DB File not found'})
          const db = JSON.parse(fs.readFileSync('./lib/database/tebak-gambar.json'))
          resolve(db[Math.floor( Math.random() * db.length )])
          // const url_floor = `https://jawabantebakgambar.net/id-${Math.floor(Math.random() * 2685)}.html`
          // Axios.get(url_floor)
          //      .then(({ data }) => {
          //           const $ = cheerio.load(data)
          //           const img = `https://jawabantebakgambar.net${$('#images > li > a > img').attr('src')}`
          //           const jawaban = $('#images > li > a > img').attr('alt').replace('Jawaban ', '')
          //           const result = {
          //                img: img,
          //                jawaban: jawaban
          //           }
          //           resolve(result)
          //      })
          //      .catch(reject)
     })
}

module.exports.tebak_gambar = tebak_gambar;
// tebak_gambar().then(console.log)

// (async () => {
//      let tg = JSON.parse(fs.readFileSync('./database/tebak-gambar.json'))
//      let URLs = []
//      for (let i = 0; i <= 2699; i++) {
//           URLs.push(`https://jawabantebakgambar.net/id-${i}.html`)
//           Axios.get(URLs[i]).then((response) => {
//                const $ = cheerio.load(response.data)
//                const img = `https://jawabantebakgambar.net${$('#images > li > a > img').attr('src')}`
//                const jawaban = $('#images > li > a > img').attr('alt').replace('Jawaban ', '')
//                const result = {
//                     img: img,
//                     jawaban: jawaban
//                }
//                tg.push(result)
//                fs.writeFileSync('./database/tebak-gambar.json', JSON.stringify(tg, null, 2))
//                console.log(result)
//           }).catch((e) => console.log({ err: e.message }))
//           await sleep(1000)
//      }
// })()


// tebak_gambar().then(a => console.log(a))