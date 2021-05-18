const fs = require('fs')
const { default: Axios } = require('axios')
const qs = require('querystring')

function ssweb(url, device = 'desktop', full) {
     return new Promise((resolve, reject) => {
          const base = 'https://www.screenshotmachine.com'
          Axios({
               url: base + '/capture.php',
               method: 'POST',
               headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
               },
               data: qs.stringify({
                    url: url,
                    device: device, // tablet / phone
                    full,
                    cacheLimit: '0'
               })
          }).then((data) => {
               const cookies = data.headers['set-cookie']
               if (data.data.status == 'success') {
                    Axios.get(base + '/' + data.data.link, {
                         headers: {
                              'cookie': cookies.join('')
                         },
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                         resolve({ status: true, result: data })
                    })
               } else {
                    reject({ status: false, message: data.data })
               }
          }).catch(reject)
     })
}

ssweb('github.com', 'phone')
     .then(a => fs.writeFileSync('img.png', a.result))
     .catch(console.log)

module.exports = { ssweb }
