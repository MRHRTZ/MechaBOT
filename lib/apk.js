const cheerio = require('cheerio')
const { default: Axios } = require('axios')

function getUrlTiny(url) {
     return new Promise((resolve, reject) => {
          Axios.get(url)
               .then((response) => {
                    const result = response.request.res.responseUrl
                    resolve(result)
               }).catch(reject)
     })

}

function searchApk(apkname) {
     return new Promise((resolve, reject) => {
          const apk = apkname
          const index = 'https://rexdl.com'
          Axios.get(`${index}/?s=${apk}`)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    let name = []
                    let url = []
                    let dl_url = []
                    let thumb = []
                    let desc = []
                    $('h2.post-title > a').get().map((rest) => {
                         name.push($(rest).text())
                    })
                    $('div > div.post-thumbnail > a').get().map((rest) => {
                         url.push($(rest).attr('href'))
                    })
                    $('div > div.post-thumbnail > a').get().map((rest) => {
                         dl_url.push('https://rexdlfile.com/index.php?id=' + $(rest).attr('href').split('/')[4].replace('.html', ''))
                    })
                    $('div > div.post-thumbnail > a > img').get().map((rest) => {
                         thumb.push($(rest).attr('data-src'))
                    })
                    $('div.entry.excerpt > p').get().map((rest) => {
                         desc.push($(rest).text())
                    })
                    let result = []
                    for (let i = 0;i < name.length;i++) {
                         result.push({
                              name: name[i],
                              thumb: thumb[i],
                              url: url[i],
                              dl_url: dl_url[i],
                              desc: desc[i]
                         })
                    }
                    resolve(result)
               }).catch(reject)
     })
}

// searchApk('minecraft').then(console.log)

function getApk(url) {
     return new Promise((resolve, reject) => {
          if (!/rexdlfile.com/g.test(url)) return resolve({ status: false, message: 'Not A Valid Download Url!' })
          Axios.get(url)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const updated = $('li.dl-update > span:nth-child(2)').text()
                    const size = $('li.dl-size > span:nth-child(2)').text()
                    const version = $('li.dl-version > span:nth-child(2)').text()
                    let name = []
                    let dl_url = []
                    let link_download = []
                    let promiss = []
                    $('li.download > span').get().map((rest) => {
                         name.push($(rest).text())
                    })
                    $('div#dlbox > ul.dl > a').get().map((rest) => {
                         dl_url.push($(rest).attr('href'))
                    })
                    let download = []
                    for (let i = 0;i < name.length;i++) {
                         download.push({
                              name: name[i],
                              dl_url: dl_url[i]
                         })
                    }
                    for (let i = 0;i < dl_url.length;i++) {
                         promiss.push(
                              Axios.get('https://tinyurl.com/api-create.php?url=' + dl_url[i])
                                   .then(({ data }) => {
                                        link_download.push({
                                             title: name[i],
                                             url: data
                                        })
                                   })
                         )
                    }
                    Promise.all(promiss).then(() => {
                         resolve({
                              status: true,
                              title: url.split('=')[1].replace(/-/gi, ' '),
                              version: version,
                              size: size,
                              updated: updated,
                              download: link_download
                         })
                    })
               }).catch(reject)
     })
}


function getApkReal(url) {
     return new Promise((resolve, reject) => {
          if (!/rexdlfile.com/g.test(url)) return resolve({ status: false, message: 'Not A Valid Download Url!' })
          Axios.get(url)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const updated = $('li.dl-update > span:nth-child(2)').text()
                    const size = $('li.dl-size > span:nth-child(2)').text()
                    const version = $('li.dl-version > span:nth-child(2)').text()
                    let name = []
                    let dl_url = []
                    $('li.download > span').get().map((rest) => {
                         name.push($(rest).text())
                    })
                    $('div#dlbox > ul.dl > a').get().map((rest) => {
                         dl_url.push($(rest).attr('href'))
                    })
                    let download = []
                    for (let i = 0;i < name.length;i++) {
                         download.push({
                              name: name[i],
                              dl_url: dl_url[i]
                         })
                    }
                    resolve({
                         status: true,
                         title: url.split('=')[1].replace(/-/gi, ' '),
                         version: version,
                         size: size,
                         updated: updated,
                         download: dl_url
                    })
               }).catch(reject)
     })
}

function sizer(bytes) {
     var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
     if (bytes == 0) return '0 Byte';
     var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
     return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


function searchApkpure(query) {
     return new Promise((resolve, reject) => {
          const baseURL = 'https://apkpure.com'
          Axios.get(baseURL + '/search?q=' + query, {
               headers: {
                    'cookie': 'apkpure__lang=id; _ga=GA1.2.2047392475.1618148191; apkpure__sample=0.00503782783288953; AMP_TOKEN=%24NOT_FOUND; _gid=GA1.2.1130412231.1620996933',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
                    // 'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
                    // 'connection': 'keep-alive',
                    // 'sec-ch-ua-mobile': '?0',
                    // 'sec-fetch-dest': 'document',
                    // 'sec-fetch-mode': 'navigate',
                    // 'sec-fetch-site': 'none',
                    // 'sec-fetch-user': '?1',
                    // 'upgrade-insecure-requests': '1'
               }
          })
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    let urls = []
                    $('#search-res > li > dl > a').get().map(rest => {
                         urls.push(baseURL + $(rest).attr('href'))
                    })
               })
               .catch(e => reject({ status: false, message: e.response.data }))
     })
}

// searchApkpure('toon')
// searchApk('pou')
// getApk('https://rexdlfile.com/index.php?id=pou-apk-download')
// .then(a => {
//      console.log(a)
// })
// .catch(e => console.log(e.message))

module.exports.searchApk = searchApk
module.exports.getApk = getApk
module.exports.getApkReal = getApkReal
module.exports.sizer = sizer
