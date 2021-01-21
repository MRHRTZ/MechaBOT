const cheerio = require('cheerio');
const { default: Axios } = require('axios');
const FormData = require('form-data')
const fs = require('fs')
const { exec } = require('child_process')
const moment = require('moment')


function uploadwebp(path) {
     return new Promise((resolve, reject) => {
          exec(`curl -X POST -H "Content-Type: multipart/form-data" -H "Accept: application/json" -F "berkas=@${path}" http://mrhrtz-wabot.000webhostapp.com/upload.php`, (err, stdout, stderr) => {
               if (err) {
                    reject({
                         status: false,
                         message: "Created By MRHRTZ"
                    });
                    return
               }
               const result = stdout
               resolve(result)
          })
     })
}

function apng2webpUrl(url) {
     return new Promise((resolve, reject) => {
          Axios.get(`https://ezgif.com/apng-to-webp?url=${url}`)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const bodyFormThen = new FormData()
                    const file = $('input[name="file"]').attr('value')
                    const token = $('input[name="token"]').attr('value')
                    const convert = $('input[name="file"]').attr('value')
                    const gotdata = {
                         file: file,
                         token: token,
                         convert: convert
                    }
                    // console.log(gotdata)
                    bodyFormThen.append('file', gotdata.file)
                    bodyFormThen.append('token', gotdata.token)
                    bodyFormThen.append('convert', gotdata.convert)
                    Axios({
                         method: 'post',
                         url: 'https://ezgif.com/apng-to-webp/' + gotdata.file,
                         data: bodyFormThen,
                         headers: {
                              'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                         }
                    }).then(({ data }) => {
                         const $ = cheerio.load(data)
                         // console.log(data)
                         const result = 'https:' + $('div#output > p.outfile > img').attr('src')
                         resolve({
                              status: true,
                              message: "Created By MRHRTZ",
                              result: result
                         })
                    }).catch(reject)
               })
               .catch(reject)
     })
}

function webp2mp4Url(url) {
     return new Promise((resolve, reject) => {
          Axios.get(`https://ezgif.com/webp-to-mp4?url=${url}`)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const bodyFormThen = new FormData()
                    const file = $('input[name="file"]').attr('value')
                    const token = $('input[name="token"]').attr('value')
                    const convert = $('input[name="file"]').attr('value')
                    const gotdata = {
                         file: file,
                         token: token,
                         convert: convert
                    }
                    bodyFormThen.append('file', gotdata.file)
                    bodyFormThen.append('token', gotdata.token)
                    bodyFormThen.append('convert', gotdata.convert)
                    Axios({
                         method: 'post',
                         url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                         data: bodyFormThen,
                         headers: {
                              'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                         }
                    }).then(({ data }) => {
                         const $ = cheerio.load(data)
                         const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                         resolve({
                              status: true,
                              message: "Created By MRHRTZ",
                              result: result
                         })
                    }).catch(reject)
               })
               .catch(reject);
     })
}

//PITCH ffmpeg -i hes.mp3 -filter_complex "asetrate=48000*2^(-9/12),atempo=1/2^(-9/12)" output.mp3

function pitch(input, number_pitch) {
     return new Promise((resolve, reject) => {
          exec(`ffmpeg -i ${input} -filter_complex "asetrate=48000*2(${number_pitch}/12),atempo=1/2^(${number_pitch}/12)" ${moment().unix()}.mp3`, (err, stdout, stderr) => {
               if (err) {
                    if (err) throw reject(err)
               }
               resolve({ output: `${moment().unix()}.mp3` })
          })
     })
}

function mp42mp3(path) {
     return new Promise((resolve, reject) => {
          exec(`ffmpeg -i ${path} ${moment().unix()}.mp3`, (err, stdout, stderr) => {
               if (err) throw reject(err)
               resolve({ output: `${moment().unix()}.mp3` })
          })
     })
}

function mp42mp3(input, output) {
     return new Promise((resolve, reject) => {
          exec(`ffmpeg -i "${input}" "${output.slice(-3) != 'mp3' ? output + '.mp3' : output}"`, (err, stdout, stderr) => {
               if (err) return reject(err)
               resolve({ output: `${output.slice(-3) != 'mp3' ? output + '.mp3' : output}` })
          })
     })
}


function mp32mp4(input, inputImg, output) {
     return new Promise((resolve, reject) => {
          const img = inputImg ? '-i ' + `"${inputImg}"` : '' || ''
          exec(`ffmpeg -i "${input}" ${img} "${output.slice(-3) != 'mp4' ? output + '.mp4' : output}"`, (err, stdout, stderr) => {
               if (err) return reject(err)
               resolve({ output: `${output.slice(-3) != 'mp4' ? output + '.mp4' : output}` })
          })
     })
}


function reverseVideoFile(path) {
     return new Promise((resolve, reject) => {
          const bodyForm = new FormData()
          bodyForm.append('new-image-url', '')
          bodyForm.append('new-image', fs.createReadStream(path))
          Axios({
               method: 'post',
               url: 'https://ezgif.com/reverse-video',
               data: bodyForm,
               headers: {
                    'Content-Type': `multipart/form-data; boundary=${bodyForm._boundary}`
               }
          }).then(({ data }) => {
               const bodyFormThen = new FormData()
               const $ = cheerio.load(data)
               const file = $('input[name="file"]').attr('value')
               const token = $('input[name="token"]').attr('value')
               const convert = $('input[name="file"]').attr('value')
               const gotdata = {
                    file: file,
                    token: token,
                    convert: convert
               }
               bodyFormThen.append('file', gotdata.file)
               bodyFormThen.append('token', gotdata.token)
               bodyFormThen.append('convert', gotdata.convert)
               bodyFormThen.append('audio', 'on')
               bodyFormThen.append('mute', 'off')
               Axios({
                    method: 'post',
                    url: 'https://ezgif.com/reverse-video/' + gotdata.file + '?ajax=true',
                    data: bodyFormThen,
                    headers: {
                         'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                    }
               }).then(({ data }) => {
                    const $ = cheerio.load(data)
                    const datext = $('p.outfile > video > source').attr('src').split('.')
                    const ext = datext[datext.length - 1]
                    const result = 'https:' + $('p.outfile > video > source').attr('src')
                    resolve({
                         status: true,
                         message: "Created By MRHRTZ",
                         result: result,
                         ext: ext
                    })
               }).catch(reject)
          }).catch(reject)
     })
}

function webp2mp4File(path) {
     return new Promise((resolve, reject) => {
          const bodyForm = new FormData()
          bodyForm.append('new-image-url', '')
          bodyForm.append('new-image', fs.createReadStream(path))
          Axios({
               method: 'post',
               url: 'https://s6.ezgif.com/webp-to-mp4',
               data: bodyForm,
               headers: {
                    'Content-Type': `multipart/form-data; boundary=${bodyForm._boundary}`
               }
          }).then(({ data }) => {
               const bodyFormThen = new FormData()
               const $ = cheerio.load(data)
               const file = $('input[name="file"]').attr('value')
               const token = $('input[name="token"]').attr('value')
               const convert = $('input[name="file"]').attr('value')
               const gotdata = {
                    file: file,
                    token: token,
                    convert: convert
               }
               bodyFormThen.append('file', gotdata.file)
               bodyFormThen.append('token', gotdata.token)
               bodyFormThen.append('convert', gotdata.convert)
               Axios({
                    method: 'post',
                    url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                    data: bodyFormThen,
                    headers: {
                         'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                    }
               }).then(({ data }) => {
                    const $ = cheerio.load(data)
                    const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
                    resolve({
                         status: true,
                         message: "Created By MRHRTZ",
                         result: result
                    })
               }).catch(reject)
          }).catch(reject)
     })
}

module.exports.webp2mp4File = webp2mp4File
module.exports.webp2mp4Url = webp2mp4Url
module.exports.uploadwebp = uploadwebp
module.exports.apng2webpUrl = apng2webpUrl
module.exports.reverseVideoFile = reverseVideoFile
module.exports.mp42mp3 = mp42mp3
module.exports.mp32mp4 = mp32mp4
module.exports.pitch = pitch

// reverseVideoFile('../beleis/media/sticker/output.mp4')
// .then(a => console.log(a))
// .catch(a => console.log(a))