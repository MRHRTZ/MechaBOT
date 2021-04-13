const cheerio = require('cheerio');
const { default: Axios } = require('axios');
const FormData = require('form-data')
const fs = require('fs')

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getJson(url) {
     return new Promise(async (resolve, reject) => {
          Axios.get(url, {
               headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
               }
          })
               .then(({ data }) => resolve(data))
               .catch(reject)
     })
}

function ocr(file) {
     return new Promise((resolve, reject) => {
          const url = 'https://www.online-convert.com/ocr/image-to-text'
          Axios.get(url, {
               headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
               }
          })
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const token = $('form#forms > input.csrf_token').attr('value')
                    const fd = new FormData()
                    fd.append('csrf_token', token)
                    fd.append('target', 'txt')
                    fd.append('category', 'document')
                    fd.append('fail_on_input_error', 'false')
                    fd.append('fail_on_conversion_error', 'false')
                    fd.append('process', 'false')
                    Axios({
                         method: 'post',
                         url: 'https://www.online-convert.com/api/jobs',
                         data: fd,
                         headers: {
                              'Content-Type': `multipart/form-data; boundary=${fd._boundary}`,
                              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
                         }
                    }).then(({ data }) => {
                         const bodyUpload = data
                         if (bodyUpload.code === 200) {
                              console.log(bodyUpload)
                              Axios({
                                   method: 'OPTIONS',
                                   url: bodyUpload.upload_url,
                                   headers: {
                                        'authority': bodyUpload.upload_url.split('/')[2],
                                        'path': bodyUpload.upload_url.split('/').slice(3).join('/'),
                                        'access-control-request-headers': 'x-oc-token,x-oc-upload-uuid',
                                        'access-control-request-method': 'POST',
                                        'origin': 'https://www.online-convert.com',
                                        'referer': 'https://www.online-convert.com/',
                                        'sec-fetch-dest': 'empty',
                                        'sec-fetch-mode': 'cors',
                                        'sec-fetch-site': 'same-site',
                                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
                                   }
                              }).then((c) => {
                                   console.log(c.status)
                                   const fdThen = new FormData()
                                   fdThen.append('csrf_token', bodyUpload.token)
                                   fdThen.append('file[]', fs.createReadStream(file))
                                   Axios({
                                        method: 'POST',
                                        url: data.upload_url,
                                        data: fdThen,
                                        headers: {
                                             'Content-Type': `multipart/form-data; boundary=${fdThen._boundary}`,
                                             'origin': 'https://www.online-convert.com',
                                             'referer': 'https://www.online-convert.com/',
                                             'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
                                             'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
                                             'x-oc-token': bodyUpload.token,
                                             'x-oc-upload-uuid': bodyUpload.id
                                        }
                                   }).then(({ data }) => {
                                        console.log(data)
                                        const fd2 = new FormData()
                                        fd2.append('target', 'txt')
                                        fd2.append('category', 'document')
                                        fd2.append('ocr', '1')
                                        fd2.append('csrf_token', bodyUpload.token)
                                        fd2.append('language', 'eng')
                                        fd2.append('language_2', 'ind')
                                        fd2.append('string_method', 'image-to-text')
                                        fd2.append('conversion_id', bodyUpload.conversion[0].id)
                                        Axios({
                                             method: 'POST',
                                             url: 'https://www.online-convert.com/api/jobs/' + bodyUpload.id + '/start',
                                             data: fd2,
                                             headers: {
                                                  'Content-Type': `multipart/form-data; boundary=${fd2._boundary}`,
                                                  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
                                             }
                                        }).then(async ({ data }) => {
                                             console.log(data)
                                             const getResult = 'https://www.online-convert.com/api/jobs/' + bodyUpload.id + '/callbackstatus?_='
                                             await delay(5000)
                                             const statusJson = await getJson(getResult + new Date().getTime())
                                             // while (statusJson == 'completed') {
                                             //      const result = await getJson(getResult + new Date().getTime())
                                             //      resolve(result)
                                             // }
                                             resolve(statusJson)
                                        })
                                   }).catch(console.log)

                              })
                         } else {
                              reject({ status: false, result: bodyUpload })
                         }

                    })

               })

     })
}

// ocr('google.png')
// .then(console.log)
// .catch(console.log)

const fdat = new FormData()
fdat.append('name', 'ceksah.png')
fdat.append('file', fs.createReadStream('google.png'))
Axios({
     method: 'post',
     url: 'https://shopee.co.id/api/v2/authentication/resend_otp',
     data: {
          operation: 6,
          channel: 3,
          support_whats_app: true,
          force_channel: true
     },
     headers: {
          'Content-Type': `application/json`,
     }
}).then(({ data }) => {
     console.log(data)
})