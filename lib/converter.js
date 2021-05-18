const cheerio = require('cheerio');
const { default: Axios } = require('axios');
const FormData = require('form-data')
const qs = require('querystring')
const fs = require('fs')
const { exec, spawn } = require('child_process')
const moment = require('moment')
const path = require('path')

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

/**
 * Convert speed audio by MRHRTZ
 * @param {string} input Input File Path
 * @param {straing} data Speed selector like ["Fast","Very Fast","Slow","Very Slow"]
 */
function speed(input, data) {
     return new Promise((resolve, reject) => {
          const speed_up = data.replace(/ /gi, '').toLowerCase() || reject('Speed data must be input!')
          let entry
          if (speed_up == 'veryfast') {
               entry = '"atempo=1.8,atempo=1.8"'
          } else if (speed_up == 'fast') {
               entry = '"atempo=1.4,atempo=1.5"'
          } else if (speed_up == 'slow') {
               entry = '"atempo=0.7,atempo=0.8"'
          } else if (speed_up == 'veryslow') {
               entry = '"atempo=0.5,atempo=0.6"'
          } else {
               reject('Invalid Speed Data!')
          }
          exec(`ffmpeg -i ${input} -filter:a ${entry} ../media/convert/${/*moment().unix()*/'cek'}.mp3`, (err, stdout, stderr) => {
               if (err) {
                    if (err) throw reject(err)
               }
               resolve({ output: `../media/convert/${/*moment().unix()*/'cek'}.mp3` })
          })
     })
}

// speed('../media/convert/1610682181.mp3', 'fast').then(console.log).catch(console.log)

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


function gif2mp4Url(url) {
     return new Promise((resolve, reject) => {
          Axios.get(`https://ezgif.com/gif-to-mp4?url=${url}`)
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
                         url: 'https://ezgif.com/gif-to-mp4/' + gotdata.file,
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

function voiceremover(pathfile) {
     return new Promise((resolve, reject) => {
          const bodyForm = new FormData()
          bodyForm.append('fileName', fs.createReadStream(pathfile))
          Axios({
               method: 'post',
               url: 'https://aivocalremover.com/FileTest',
               data: bodyForm,
               headers: {
                    'Content-Type': `multipart/form-data; boundary=${bodyForm._boundary}`
               }
          }).then(({ data }) => {
               // console.log(data)
               Axios({
                    method: 'post',
                    url: 'https://aivocalremover.com/ProcessM',
                    data: qs.stringify({
                         file_name: data.file_name,
                         action: 'watermark_video'
                    }),
                    headers: {
                         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
               }).then(({ data }) => {
                    resolve(data)
               })
                    .catch(reject)
          })
               .catch(reject)
     })
}


//ffmpeg -i voltageost.mp3 -vn -ar 44100 -ac 2 -b:a 192k voltageost2.mp3 -y
function fixAudio(buffer, ext) {
     return new Promise((resolve, reject) => {
          let tmp = path.join(__dirname, '../media/effect/', + new Date + '.' + ext)
          let out = tmp + '.mp3'
          fs.writeFileSync(tmp, buffer)
          spawn('ffmpeg', [
               '-i', tmp,
               '-vn',
               '-ar', '44100',
               '-ac', '2',
               '-b:a', '192k',
               '-f', 'mp3',
               out
          ])
               .on('error', reject)
               .on('error', () => fs.unlinkSync(tmp))
               .on('close', () => {
                    fs.unlinkSync(tmp)
                    resolve(fs.readFileSync(out))
                    if (fs.existsSync(out)) fs.unlinkSync(out)
               })
     })
}

function toAudio(buffer, ext) {
     return new Promise((resolve, reject) => {
          let tmp = path.join(__dirname, '../media/effect/', + new Date + '.' + ext)
          let out = tmp + '.mp3'
          fs.writeFileSync(tmp, buffer)
          spawn('ffmpeg', [
               '-y',
               '-i', tmp,
               '-vn',
               '-ac', '2',
               '-b:a', '128k',
               '-ar', '44100',
               '-f', 'mp3',
               out
          ])
               .on('error', reject)
               .on('error', () => fs.unlinkSync(tmp))
               .on('close', () => {
                    fs.unlinkSync(tmp)
                    resolve(fs.readFileSync(out))
                    if (fs.existsSync(out)) fs.unlinkSync(out)
               })
     })
}

function toPTT(buffer, ext) {
     return new Promise((resolve, reject) => {
          let tmp = path.join(__dirname, '../media/effect/', + new Date + '.' + ext)
          let out = tmp + '.opus'
          fs.writeFileSync(tmp, buffer)
          spawn('ffmpeg', [
               '-y',
               '-i', tmp,
               '-vn',
               '-c:a', 'libopus',
               '-b:a', '128k',
               '-vbr', 'on',
               '-compression_level', '10',
               out,
          ])
               .on('error', reject)
               .on('error', () => fs.unlinkSync(tmp))
               .on('close', () => {
                    fs.unlinkSync(tmp)
                    resolve(fs.readFileSync(out))
                    if (fs.existsSync(out)) fs.unlinkSync(out)
               })
     })
}

function toVideo(buffer, ext) {
     return new Promise((resolve, reject) => {
          let tmp = path.join(__dirname, '../media/effect/', + new Date + '.' + ext)
          let out = tmp + '.mp4'
          fs.writeFileSync(tmp, buffer)
          spawn('ffmpeg', [
               '-y',
               '-i', tmp,
               '-c:v', 'libx264',
               '-c:a', 'aac',
               '-ab', '192k',
               '-ar', '44100',
               out
          ])
               .on('error', reject)
               .on('error', () => fs.unlinkSync(tmp))
               .on('close', () => {
                    fs.unlinkSync(tmp)
                    resolve(fs.readFileSync(out))
                    if (fs.existsSync(out)) fs.unlinkSync(out)
               })
     })
}

// voiceremover('./media/convert/1610682181.mp3')
// .then(console.log)
// .catch(console.log)

module.exports.toAudio = toAudio
module.exports.toVideo = toVideo
module.exports.toPTT = toPTT
module.exports.voiceremover = voiceremover
module.exports.webp2mp4File = webp2mp4File
module.exports.webp2mp4Url = webp2mp4Url
module.exports.gif2mp4Url = gif2mp4Url
module.exports.uploadwebp = uploadwebp
module.exports.apng2webpUrl = apng2webpUrl
module.exports.reverseVideoFile = reverseVideoFile
module.exports.mp42mp3 = mp42mp3
module.exports.mp32mp4 = mp32mp4
module.exports.pitch = pitch
module.exports.fixAudio = fixAudio

// reverseVideoFile('C:/Users/user/Downloads/output.mp4')
//      .then(a => console.log(a))
//      .catch(a => console.log(a))

