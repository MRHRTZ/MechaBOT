const { default: Axios } = require("axios");
const cheerio = require('cheerio')
const qs = require('qs')

function ttdl(url) {
     return new Promise((resolve, reject) => {
          Axios.get('https://twittervideodownloader.com', {
               headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
                    'cookie': 'csrftoken=0vXUuEW7XmQ2tvEScfuB3c4UgJ3gLhm75QiLkcMIl7hgstMgwzrJNJBAqTc1JXq4; _ga=GA1.2.55056816.1618232289; _gid=GA1.2.1536815337.1618232289; __qca=P0-1042480143-1618232290863',
                    'origin': 'https://twittervideodownloader.com',
                    'referer': 'https://twittervideodownloader.com/'
               }
          })
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const token = $('input[name="csrfmiddlewaretoken"]').attr('value')
                    //console.log(token)
                    Axios({
                         method: 'POST',
                         url: 'https://twittervideodownloader.com/download',
                         headers: {
                              'Content-type': 'application/x-www-form-urlencoded',
                              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
                              'cookie': 'csrftoken=0vXUuEW7XmQ2tvEScfuB3c4UgJ3gLhm75QiLkcMIl7hgstMgwzrJNJBAqTc1JXq4; _ga=GA1.2.55056816.1618232289; _gid=GA1.2.1536815337.1618232289; __qca=P0-1042480143-1618232290863',
                              'origin': 'https://twittervideodownloader.com',
                              'referer': 'https://twittervideodownloader.com/'
                         },
                         data: qs.stringify({
                              csrfmiddlewaretoken: token,
                              tweet: url
                         })
                    }).then(({ data }) => {
                         const $ = cheerio.load(data)
                         let result = []
                         $('center > div.row').get().map(rest => {
                              const info = $(rest).find('p.float-left').text()
                              result.push({
                                   url: $(rest).find('a[download]').attr('href'),
                                   info: info.includes('x') ? info.split(' : ')[0] : info 
                              })
                         })
                         resolve({ status: true, result: result })
                    }).catch((e) => reject({ status: false, message: e.message }))
               })
               .catch(reject)
     })
}

function fbdl(url) {
     return new Promise((resolve, reject) => {
          Axios.get('https://fbdownloader.net/', {
               headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
                    'cookie': 'PHPSESSID=u6u7gve9lgdidptoc1ud64sgt5; _ga=GA1.2.1641084374.1618234834; _gid=GA1.2.26237339.1618234834; _gat_gtag_UA_78205517_2=1',
               }
          })
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const token = $('input[name="token"]').attr('value')
                    //console.log(token)
                    Axios({
                         method: 'POST',
                         url: 'https://fbdownloader.net/download/',
                         headers: {
                              'Content-type': 'application/x-www-form-urlencoded',
                              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
                              'cookie': 'PHPSESSID=u6u7gve9lgdidptoc1ud64sgt5; _ga=GA1.2.1641084374.1618234834; _gid=GA1.2.26237339.1618234834; _gat_gtag_UA_78205517_2=1',
                         },
                         data: qs.stringify({
                              token: token,
                              url: url
                         })
                    }).then(({ data }) => {
                         const $ = cheerio.load(data)
                         resolve({ status: true, title: $('p.title > a').text(), download: $('a.btn.btn-default.btn-blue').attr('href'), filesize: $('a.btn.btn-default.btn-blue > small').text().replace(/\(|\)/g,''), size: Number($('a.btn.btn-default.btn-blue > small').text().replace(/\(|\)| |[A-Z]|\./g,'')) * 1000 })
                    }).catch((e) => reject({ status: false, message: e.message }))
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
// fbdl('https://web.facebook.com/161497573919833/videos/4436357833058688')
// ttdl('https://twitter.com/PassengersMovie/status/821025484150423557')
// .then(console.log)
// .catch(console.log)
