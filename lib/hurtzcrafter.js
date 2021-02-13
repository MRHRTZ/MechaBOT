const { default: Axios } = require("axios");
//

function ttdl(url) {
     return new Promise((resolve, reject) => {
          Axios.get(`http://api-melodicxt-2.herokuapp.com/api/twitter-downloader?url=${url}&apiKey=administrator`)
               .then(({ data }) => {
                    if (data.status == false) return reject('Invalid Url')
                    resolve({ title: data.result.title, quote: data.result.quote, download: data.result.result })
               })
               .catch(reject)
     })
}

function fbdl(url) {
     return new Promise((resolve, reject) => {
          Axios.get('http://api.hurtzcrafter.xyz/facebook-download/?url=' + url)
               .then(({ data }) => {
                    if (data.title === '') return reject('URL INVALID!')
                    resolve({
                         status: true,
                         message: data.message,
                         title: data.title,
                         download: [
                              data.links.low,               // LOW RESOLUTION
                              data.links.high               // HIGH RESOLUTION
                         ]
                    })
               })
               .catch(reject)
     })
}

function jadwaltv(channel) {
     return new Promise((resolve, reject) => {
          Axios.get('http://api.hurtzcrafter.xyz/jadwaltv?channel=' + channel)
               .then(({ data }) => {
                    if (data.status === 'false') {
                         Axios.get('http://api.hurtzcrafter.xyz/daftar_stasiun')
                              .then(({ data }) => {
                                   resolve({ status: false, message: 'Channel yang tersedia', channel: data.result })
                              })
                              .catch(reject)
                         return
                    }
                    resolve(data)
               })
               .catch(reject)
     })
}

module.exports.jadwaltv = jadwaltv
module.exports.fbdl = fbdl
module.exports.ttdl = ttdl


// jadwaltv('gtsv')
// fbdl('https://fb.watch/3Dcr5nZqQi/')
// ttdl('https://twitter.com/GIPHY/status/836063152542482434')
// .then(console.log)
//      .catch(console.log)
