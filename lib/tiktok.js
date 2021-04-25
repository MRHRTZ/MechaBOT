const { default: Axios } = require('axios')
const tiktod = require('tiktok-scraper')
const cheerio = require('cheerio')
const request = require('request')
const qs = require('querystring')
const FormData = require('form-data')
const got = require('got')
const fs = require('fs')

async function tiktok(url, filename) {
     return new Promise((resolve, reject) => {
          const headers = {
               "User-Agent": "BOB",
               "Referer": "https://www.tiktok.com/",
               "Cookie": "tt_webid_v2=BOB"
          }
          tiktod.getVideoMeta(url, headers)
               .then(async (videoMeta) => {
                    const urls = videoMeta.collector[0].videoUrl
                    const stream = got
                         .stream(urls, { headers: videoMeta.headers })
                         .pipe(fs.createWriteStream(filename + '.mp4'))
                    stream.on('finish', () => {
                         const data = videoMeta.collector[0]
                         let Tag = []
                         for (let i = 0;i < data.hashtags.length;i++) {
                              const name = data.hashtags[i].name
                              Tag.push(name)
                         }
                         const id = data.id
                         const text = data.text
                         const date = data.createTime
                         const name = data.authorMeta.name
                         const nick = data.authorMeta.nickName
                         const music = data.musicMeta.musicName
                         const thumb = data.imageUrl
                         const hastag = Tag

                         resolve({
                              id: id,
                              name: name,
                              nickname: nick,
                              timestamp: date,
                              thumb: thumb,
                              text: text,
                              music: music,
                              hastag: hastag,
                              buffer: fs.readFileSync(filename + '.mp4')
                         })
                         fs.unlinkSync(filename + '.mp4')
                    })
               })
               .catch(reject)
     })
}

function ttnw(url) {
     return new Promise((resolve, reject) => {
          const options = {
               jar: true,
               method: 'GET',
               url: 'https://ssstik.io',
               headers: {
                    'cookie': '__cfduid=deb9cec7a40793d1abe009bb9961a92d41617497572; _ga=GA1.2.131585469.1617497575; PHPSESSID=im9fqd4ce6q1j10civk8iva1mm; cf_clearance=c62a903b1f4fd8d6d87c0eceb3dfd6a6e4eec95b-1619103480-0-150; __cflb=02DiuEcwseaiqqyPC5reASCyLDygUABtFoD5BRG474SEw; _gid=GA1.2.419334458.1619103487; _gat_UA-3524196-6=1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
                    'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"'
               }
          }
          request.get(options, (err, response, body) => {
               const $ = cheerio.load(body)
               const tokenJSON = $('form[data-hx-target="#target"]').attr('include-vals')
               const urlPost = $('form[data-hx-target="#target"]').attr('data-hx-post')
               return console.log(body)
               const tt = tokenJSON.replace(/'/g, '').replace('tt:', '').split(',')[0]
               const ts = tokenJSON.split('ts:')[1]
               const optionsPost = {
                    jar: true,
                    method: 'POST',
                    url: 'https://ssstik.io' + urlPost,
                    form: {
                         'id': 'https://www.tiktok.com/@youneszarou/video/6942436555692805381',
                         'locale': 'en',
                         'tt': tt,
                         'ts': ts
                    },
                    headers: {
                         'Host': 'ssstik.io',
                         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                         'cookie': '__cfduid=deb9cec7a40793d1abe009bb9961a92d41617497572; _ga=GA1.2.131585469.1617497575; PHPSESSID=im9fqd4ce6q1j10civk8iva1mm; cf_clearance=c62a903b1f4fd8d6d87c0eceb3dfd6a6e4eec95b-1619103480-0-150; __cflb=02DiuEcwseaiqqyPC5reASCyLDygUABtFoD5BRG474SEw; _gid=GA1.2.419334458.1619103487; _gat_UA-3524196-6=1',
                         'hx-active-element': 'submit',
                         'hx-current-url': 'https://ssstik.io/',
                         'hx-request': 'true',
                         'hx-target': 'target',
                         'origin': 'https://ssstik.io',
                         'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
                         'sec-ch-ua-mobile': '?0',
                         'sec-fetch-dest': 'empty',
                         'sec-fetch-mode': 'cors',
                         'sec-fetch-site': 'same-origin',
                         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
                         'Content-Type': 'application/x-www-form-urlencoded'
                    }
               }
               console.log({
                    'id': 'https://www.tiktok.com/@youneszarou/video/6942436555692805381',
                    'locale': 'en',
                    'url': 'https://ssstik.io' + urlPost,
                    'tt': tt,
                    'ts': ts
               })
               request.post(optionsPost, (err, request, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a.save-image-btn').attr('href')
                    }
                    resolve(body)
               })
          })
     })
}

function tiktoknowm(url) {
     return new Promise((resolve, reject) => {
          var BASEurl = 'https://ssstik.io'
          Axios.request({
               url: BASEurl,
               method: 'get',
               headers: {
                    'cookie': '__cfduid=deb9cec7a40793d1abe009bb9961a92d41617497572; _ga=GA1.2.131585469.1617497575; PHPSESSID=im9fqd4ce6q1j10civk8iva1mm; cf_clearance=c62a903b1f4fd8d6d87c0eceb3dfd6a6e4eec95b-1619103480-0-150; __cflb=02DiuEcwseaiqqyPC5reASCyLDygUABtFoD5BRG474SEw; _gid=GA1.2.419334458.1619103487; _gat_UA-3524196-6=1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
                    'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"'
               }
          })
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const urlPost = $('form[data-hx-target="#target"]').attr('data-hx-post')
                    const tokenJSON = $('form[data-hx-target="#target"]').attr('include-vals')
                    const tt = tokenJSON.replace(/'/g, '').replace('tt:', '').split(',')[0]
                    const ts = tokenJSON.split('ts:')[1]
                    // return console.log({ pst: urlPost, tt: tt, ts: ts })
                    var config = {
                         headers: {
                              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                              'cookie': '__cfduid=deb9cec7a40793d1abe009bb9961a92d41617497572; _ga=GA1.2.131585469.1617497575; PHPSESSID=im9fqd4ce6q1j10civk8iva1mm; cf_clearance=c62a903b1f4fd8d6d87c0eceb3dfd6a6e4eec95b-1619103480-0-150; __cflb=02DiuEcwseaiqqyPC5reASCyLDygUABtFoD5BRG474SEw; _gid=GA1.2.419334458.1619103487; _gat_UA-3524196-6=1',
                              'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
                              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
                         },
                         dataPost: {
                              'id': url,
                              'locale': 'en',
                              'tt': tt,
                              'ts': ts
                         }
                    }
                    Axios.post(BASEurl + urlPost, qs.stringify(config.dataPost), { headers: config.headers })
                         .then(({ data }) => {
                              // return console.log(data)
                              const $ = cheerio.load(data)
                              const result = {
                                   status: true,
                                   text: $('div > p.maintext').text(),
                                   pic: $('div > img').attr('src'),
                                   videonowm: BASEurl + $('div > a.without_watermark').attr('href'),
                                   videonowm2: $('div > a.without_watermark_direct').attr('href'),
                                   music: $('div > a.music').attr('href')
                              }
                              if ($('div > a.without_watermark_direct').attr('href') !== undefined) {
                                   resolve(result)
                              } else {
                                   reject({ status: false, message: 'Tautan ini telah terunduh sebelumnya' })
                              }
                         })
                         .catch(reject)
               })
               .catch(reject)
     })
}


function snaptik(url) {
     return new Promise((resolve, reject) => {
          const fd = new FormData()
          fd.append('url', url)
          Axios({
               method: 'POST',
               url: 'https://snaptik.app/action-2021.php?lang=ID',
               data: fd,
               headers: {
                    'Content-Type': `multipart/form-data; boundary=${fd._boundary}`
               }
          }).then(({ data }) => {
               const $ = cheerio.load(data)
               let url = []
               $('div > a.abutton.is-success').get().map(rest => {
                    url.push($(rest).attr('href'))
               })
               resolve({ status: true, result: url })
          }).catch((e) => reject({ status: false, message: e.message }))
     })
}


function keeptiktok(url) {
     return new Promise((resolve, reject) => {
          Axios.get('http://keeptiktok.com/?lang=ID', {
               headers: {
                    'Cookie': '__cfduid=d5db462e7efb9bb76bcf89765dbd896c91617891082; PHPSESSID=5a017bebc34ef170ddec3b7c71a0bbe8; _ga=GA1.2.1193000489.1617891094; _gid=GA1.2.408908588.1617891094; ads=ok; __atuvc=3|14; __atuvs=606f0f171d8ce8a1002; __atssc=google;2'
               }
          })
               .then(({ data }) => {
                    return console.log(data)
                    const $ = cheerio.load(data)
                    const token = $('input#token').attr('value')
                    const fd = new FormData()
                    fd.append('url', url)
                    fd.append('token', token)
                    Axios({
                         method: 'POST',
                         url: 'https://keeptiktok.com/index.php',
                         data: fd,
                         headers: {
                              'Content-Type': `multipart/form-data; boundary=${fd._boundary}`,
                              'Cookie': '__cfduid=d5db462e7efb9bb76bcf89765dbd896c91617891082; PHPSESSID=5a017bebc34ef170ddec3b7c71a0bbe8; _ga=GA1.2.1193000489.1617891094; _gid=GA1.2.408908588.1617891094; ads=ok; __atuvc=3|14; __atuvs=606f0f171d8ce8a1002; __atssc=google;2'
                         }
                    }).then(({ data }) => {
                         const $ = cheerio.load(data)
                         const text = $('div.download-info > div.video_des').text()
                         Axios.get('https://keeptiktok.com/dl.php', {
                              responseType: 'arraybuffer',
                              headers: {
                                   'referer': $('link[rel="canonical"]').attr('href'),
                                   'Cookie': '__cfduid=d5db462e7efb9bb76bcf89765dbd896c91617891082; PHPSESSID=5a017bebc34ef170ddec3b7c71a0bbe8; _ga=GA1.2.1193000489.1617891094; _gid=GA1.2.408908588.1617891094; ads=ok; __atuvc=3|14; __atuvs=606f0f171d8ce8a1002; __atssc=google;2'
                              }
                         }).then(({ data }) => {
                              // fs.writeFileSync('cek.mp4', data)
                              resolve({ status: true, result: { text: text, buffer: data } })
                         })
                    }).catch((e) => reject({ status: false, message: e.message }))
               })
     })
}


// keeptiktok('https://t.tiktok.com/i18n/share/video/6940494847199481090/?region=ID&mid=6940494822780521218&u_code=dgjge4mbdc991h&preview_pb=0&language=id&_d=d0k3hfj5llh8mm&share_item_id=6940494847199481090&timestamp=1617355003&user_id=6921898511669085186&sec_user_id=MS4wLjABAAAA5oIetGnixHi2D3GWJNOkxtjBqWTYQxzEkeEiWXX1SQgvLIayizGUjcCVpgc51GGZ&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=6944169609139832577&share_link_id=dd825a53-325a-4faf-b120-999f7a54019f&share_app_id=1340')
// snaptik('https://t.tiktok.com/i18n/share/video/6940494847199481090/?region=ID&mid=6940494822780521218&u_code=dgjge4mbdc991h&preview_pb=0&language=id&_d=d0k3hfj5llh8mm&share_item_id=6940494847199481090&timestamp=1617355003&user_id=6921898511669085186&sec_user_id=MS4wLjABAAAA5oIetGnixHi2D3GWJNOkxtjBqWTYQxzEkeEiWXX1SQgvLIayizGUjcCVpgc51GGZ&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=6944169609139832577&share_link_id=dd825a53-325a-4faf-b120-999f7a54019f&share_app_id=1340')
// tiktoknowm('https://www.tiktok.com/@youneszarou/video/6942436555692805381')
//      .then(console.log)
//      .catch(a => console.log('e', a))


module.exports.tiktok = tiktok
module.exports.tiktoknowm = tiktoknowm