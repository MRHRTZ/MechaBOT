const fs = require('fs')
const os = require('os')
const pm2 = require('pm2');
const path = require('path')
const util = require('util')
const chalk = require('chalk')
const mktemp = require('mktemp')
const Crypto = require('crypto')
const moment = require('moment')
const request = require('request')
const cheerio = require('cheerio')
const Table = require('cli-table')
const emoji = require('node-emoji')
const FormData = require('form-data')
const speed = require('performance-now')
const remote = require('remote-file-size')
const time = moment().format('DD/MM HH:mm:ss')
const translate = require('@vitalets/google-translate-api');
const { advancedglow, futuristic, cloud, blackpink, sand, scifi, dropwater, codmw, bokeh, thunder, horrorblood, firework, bloodglass, neonlight, marvel, phub, brokeCard, iphone, underwater, drawing, burningFire, semok, harryPotter, horrorHouse, coffee, battlefield, googleKeyword, gunBanner, gtaV, dota, shadow, beachFrame, summerFrame, natureFrame, glitch, rain, sea, neon, stars, wood, darklogo, nightsea, photoglitch, anaglyph, balloon, typographic, photosky, wanted, fireworkvideo, cooldesign, colorfuldesign, armydesign } = require('./lib/image-manipulation')
const { toAudio, toVideo, toPTT, voiceremover, webp2mp4File, reverseVideoFile, mp42mp3, mp32mp4, uploadwebp, webp2mp4Url, apng2webpUrl } = require('./lib/converter')
const { baseURI, ytsr, yta, ytv, buffer2Stream, stream2Buffer, noop } = require('./lib/ytdl')
const { getUser, getPost, searchUser, searchHastag } = require('./lib/insta')
const { getApk, getApkReal, searchApk, sizer } = require('./lib/apk')
const { getFilesize, lirik, ImageSearch } = require('./lib/func')
const { herodetail, herolist } = require('./lib/mobile-legends')
const { wiki, brainly, crawl } = require('./lib/crawler')
const { generateStr } = require('./lib/stringGenerator')
const { getStikerLine } = require('./lib/stickerline')
const { tebak_gambar } = require('./lib/tebak-gambar')
const { harta, hartacustom } = require('./lib/harta')
const { fbdl, ttdl } = require('./lib/hurtzcrafter')
const { chara, charaCheck } = require('./lib/chara')
const { createExif } = require('./lib/create-exif')
const { addContact } = require('./lib/savecontact')
const { pinterest } = require('./lib/pinterest')
const { exec, spawn } = require('child_process')
const { download } = require('./lib/downloader')
const { text2img } = require('./lib/text2img')
const { trigger } = require('./lib/trigger')
const { default: Axios } = require('axios')
const { tiktok } = require('./lib/tiktok')
const { kode } = require('./lib/kodebhs')
const { Grid } = require('minesweeperjs')
const { chord } = require('./lib/chord')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function INFOLOG(info) {
     console.log('\x1b[1;34m~\x1b[1;37m>>', '<\x1b[1;33mINF\x1b[1;37m>', time, color(info))
}

function ERRLOG(e) {
     console.log('\x1b[1;31m~\x1b[1;37m>>', '<\x1b[1;31mERROR\x1b[1;37m>', time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
}

function restartCode() {
     const datanow = fs.readFileSync('./myHandler.js', 'utf-8')
     fs.writeFileSync('./myHandler.js', datanow)
}
// function getDuplicatesArr(data) {
//      return data.filter((value, index) => data.indexOf(value) === index);
// }

// const dataSetting = JSON.parse(fs.readFileSync('./src/settings.json'))

/*-------------  Function Without Message Trigger   --------------*/
// let datamo
// var y = setInterval(function () {
//      datamo = moment().unix()
//      datateb = db_tebak.expired_on < moment().unix()
//      // If the count down is finished, write some text
//      if (db_tebak.expired_on != null && db_tebak.expired_on < moment().unix()) {
//           clearInterval(y)
// INFOLOG('Expired Tebak Gambar')
// db_tebak.status = false
// fs.writeFileSync(`./lib/tebak-gambar/${from}.json`, JSON.stringify(db_tebak, null, 2))
// restartCode()
//      }
// }, 1000);

let vip = JSON.parse(fs.readFileSync('./lib/database/vip.json'))

settings = JSON.parse(fs.readFileSync('./src/settings.json'))



function getRemaining(endtime) {
     const total = Date.parse(endtime) - Date.parse(new Date());
     const seconds = Math.floor((total / 1000) % 60);
     const minutes = Math.floor((total / 1000 / 60) % 60);
     const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
     const days = Math.floor(total / (1000 * 60 * 60 * 24));

     return {
          total,
          days,
          hours,
          minutes,
          seconds
     };
}


module.exports = handle = async (sesi, GroupSettingChange, Mimetype, MessageType, conn, hurtz, chat) => {
     // let sesi
     // for (let se of settings.Sesi) {
     //      if (conn.user.jid == se.Jid) {
     //           sesi = se.Name
     //      }
     // }
     const mt = settings.Maintenace
     const msgout = settings.MessageConsole
     const idlog = settings.IDConsole
     if (!fs.existsSync('./lib/database/msgInfo-' + sesi + '.json')) {
          fs.writeFileSync('./lib/database/msgInfo-' + sesi + '.json', JSON.stringify([]))
     }
     let infoMSG = JSON.parse(fs.readFileSync('./lib/database/msgInfo-' + sesi + '.json'))
     infoMSG.push(JSON.parse(JSON.stringify(hurtz)))
     fs.writeFileSync('./lib/database/msgInfo-' + sesi + '.json', JSON.stringify(infoMSG, null, 2))
     const urutan_pesan = infoMSG.length
     if (urutan_pesan === 2500) {
          infoMSG.splice(0, 4300)
          fs.writeFileSync('./lib/database/msgInfo-' + sesi + '.json', JSON.stringify(infoMSG, null, 2))
     }

     let detect = JSON.parse(fs.readFileSync(__dirname + '/direct-message/detector.json'))
     for (let i = 0; i < detect.length; i++) {
          if (detect > 0) {
               conn.sendMessage(detect[i].from, detect[i].pesan, detect[i].tipe)
          }
     }


     if (hurtz.key.remoteJid == 'status@broadcast') {
          // console.log(hurtz)
          // 1981092531
          // 4286747850
          return
     }
     let fspam = fs.readdirSync('./lib/database/filterspam')

     function addFspam(jid, num) {
          settings.Switcher = false
          fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
          let jidsp = []
          const addseconds = moment(new Date).add(Number(num), 'seconds').valueOf()
          for (let o of fspam) {
               if (o === jid) {
                    jidsp.push({ jid: o.jid, messageNum: o.messageNum, allow_time: o.allow_time })
               }
          }
          if (jidsp.length === 0) {
               fspamobj = {
                    status: false,
                    jid: jid,
                    messageNum: Number(num)
               }
               fs.writeFileSync('./lib/database/filterspam/' + jid + '.json', JSON.stringify(fspamobj, null, 2))
               // settings.Switcher = true
               // fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
               return { status: false, jid: jid, messageNum: 1, allow_time: addseconds }
          } else if (jidsp.length > 0) {
               // if (vip.includes(Jid)) return [{ Status: true, Key: 0, Num: Jid, limit: '∞' }]
               if (jidsp[0].allow_time >= new Date().getTime()) {
                    for (let o in fspam) {
                         if (fspam[o] == jid) {
                              const parsedFspam = JSON.parse(fs.readFileSync('./lib/database/filterspam/' + jid + '.json'))
                              parsedFspam.messageNum = Number(num)
                              return jidsp[0]
                         }
                    }
               } else {
                    for (let o in fspam) {
                         if (fspam[o] == jid) {
                              const parsedFspam = JSON.parse(fs.readFileSync('./lib/database/filterspam/' + jid + '.json'))
                              parsedFspam.messageNum = Number(num)
                              return jidsp[0]
                         }
                    }
               }
          }
          fs.writeFileSync('./lib/database/filterspam/' + jid + '.json', JSON.stringify(fspam, null, 2))
          // settings.Switcher = true
          // fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
     }

     function pushing(obj) {
          fs.writeFileSync('./lib/database/limit.json', JSON.stringify(obj, null, 2))
     }

     function pushLimit(Jid, amount) {
          amount = Number(amount)
          let data = []
          let limit = 30
          let obj = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
          for (let o of obj) {
               if (o.number === Jid) {
                    data.push({ Status: o.active, Key: o.key, Num: o.number, limit: o.limit })
               }
          }
          if (data.length === 0) {
               const pusheh = {
                    active: true,
                    key: obj.length + 1,
                    limit: limit,
                    number: Jid
               }
               obj.push(pusheh)
               pushing(obj)
               return [{ Status: pusheh.active, Key: pusheh.key, Num: pusheh.number, limit: pusheh.limit }]
          } else if (data.length > 0) {
               if (vip.includes(Jid)) return [{ Status: true, Key: 0, Num: Jid, limit: '∞' }]
               if (data[0].limit <= 0) {
                    for (let o of obj) {
                         if (o.number == Jid) {
                              o.active = false
                         }
                    }
               } else {
                    for (let o of obj) {
                         if (o.number == Jid) {
                              o.limit = data[0].limit - amount
                         }
                    }
               }
          }
          pushing(obj)
          return data
     }

     function giftLimit(Jid, amount) {
          amount = Number(amount)
          let data = []
          let obj = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
          for (let o of obj) {
               if (o.number == Jid) {
                    data.push({ Status: o.active, Key: o.key, Num: o.number, limit: o.limit })
               }
          }
          if (data.length === 0) {
               const pusheh = {
                    active: true,
                    key: obj.length + 1,
                    limit: amount,
                    number: Jid
               }
               obj.push(pusheh)
               pushing(obj)
               return [{ Status: pusheh.active, Key: pusheh.key, Num: pusheh.number, limit: pusheh.limit }]
          } else if (data.length > 0) {
               for (let o of obj) {
                    if (o.number == Jid) {
                         o.active = true
                         o.limit = o.limit + amount
                    }
               }
          }
          pushing(obj)
          return data
     }

     function limitChecker(Jid, amount) {
          amount = Number(amount)
          let data = []
          let obj = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
          for (let o of obj) {
               if (o.number == Jid) {
                    data.push({ Status: o.active, Key: o.key, Num: o.number, limit: o.limit })
               }
          }
          if (data.length === 0) {
               const pusheh = {
                    active: true,
                    key: obj.length + 1,
                    limit: amount,
                    number: Jid
               }
               obj.push(pusheh)
               pushing(obj)
               return [{ Status: pusheh.active, Key: pusheh.key, Num: pusheh.number, limit: pusheh.limit }]
          } else if (data.length > 0) {
               for (let o of obj) {
                    if (o.limit > 0) {
                         o.active = true
                    } else if (o.limit === 0) {
                         o.active = false
                    }
               }
          }
          pushing(obj)
          return data
     }

     function takeLimit(Jid) {
          let data = []
          let obj = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
          for (let o of obj) {
               if (o.number == Jid) {
                    data.push({ Status: o.active, Key: o.key, Num: o.number, limit: o.limit })
               }
          }
          if (data.length === 0) {
               const pusheh = {
                    active: true,
                    key: obj.length + 1,
                    limit: 0,
                    number: Jid
               }
               obj.push(pusheh)
               pushing(obj)
               return [{ Status: pusheh.active, Key: pusheh.key, Num: pusheh.number, limit: pusheh.limit }]
          } else if (data.length > 0) {
               for (let o of obj) {
                    if (o.number == Jid) {
                         o.active = false
                         o.limit = 0
                    }
               }
          }
          pushing(obj)
          return data
     }

     function addAllLimit(amount) {
          amount = Number(amount)
          let obj = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
          for (let i in obj) {
               obj[i].active = true
               obj[i].limit = obj[i].limit + amount
          }
          pushing(obj)
          return { status: true, limit: Number(amount) }
     }

     async function resetAllLimit(amount) {
          amount = Number(amount)
          let obj = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
          for (let i in obj) {
               if (obj[i].limit < amount) {
                    obj[i].Status = true
                    obj[i].limit = amount
               }
          }
          pushing(obj)
          return { status: true, limit: Number(amount) }
     }

     function cekLimit(Jid, amount) {
          amount = Number(amount)
          let data = []
          let obj = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
          for (let o of obj) {
               if (o.number == Jid) {
                    data.push({ Status: o.active, Key: o.key, Num: o.number, limit: o.limit })
               }
          }
          if (data.length === 0) {
               obj.push({
                    active: true,
                    key: obj.length + 1,
                    limit: amount,
                    number: Jid
               })
               pushing(obj)
               return true
          }
          pushing(obj)
          return data[0].Status
     }



     // let switcherSpam = JSON.parse(fs.readFileSync('./lib/database/'))

     var x = setInterval(function () {

          for (let o in fspam) {
               const parsedLoopSpam = JSON.parse(fs.readFileSync('./lib/database/filterspam/' + fspam[o]))
               if (parsedLoopSpam.messageNum > 0) {
                    if (!settings.Switcher) return
                    parsedLoopSpam.status = false
                    parsedLoopSpam.messageNum = parsedLoopSpam.messageNum - 1
                    fs.writeFileSync('./lib/database/filterspam.json', JSON.stringify(parsedLoopSpam, null, 2))
                    if (parsedLoopSpam.messageNum === 0 && !parsedLoopSpam.status) {
                         parsedLoopSpam.status = true
                         fs.writeFileSync('./lib/database/filterspam.json', JSON.stringify(parsedLoopSpam, null, 2))
                    }
               }
          }


          var countDownDate = settings.Reset_Time
          // Get today's date and time
          var now = new Date().getTime();

          // Find the distance between now and the count down date
          var distance = countDownDate - now;

          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // Display the result in the element with id="demo"
          const countReset = `${hours} Jam, ${minutes} Menit, ${seconds} Detik`;
          countResetLimit = countReset
          // If the count down is finished, write some text
          if (distance < 0) {
               clearInterval(x);
               INFOLOG('Waktunya Reset!');
               resetAllLimit(settings.Limit)
                    .then(() => {
                         const newCountReset = moment(settings.Reset_Time).add('24', 'hours').valueOf()
                         settings.Reset_Time = newCountReset
                         settings.Reset_Status = true
                         fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
                         restartCode()
                    })
          }
     }, 1000);
     if (!hurtz.message) return


     let expvip = JSON.parse(fs.readFileSync('./lib/database/expvip.json'))

     const groupMines = JSON.parse(fs.readFileSync('./lib/database/group-minesweeper.json'))
     const dataRevoke = JSON.parse(fs.readFileSync('./lib/database/RevokedGroup.json'))
     const from = hurtz.key.remoteJid
     const konten = JSON.stringify(hurtz.message, null, 2)
     const TypePsn = MessageType
     const self = hurtz.key.fromMe
     const isGroup = from.endsWith('@g.us')
     let type = Object.keys(hurtz.message)[0]
     type = type === 'extendedTextMessage' && hurtz.message.extendedTextMessage.text.includes('@') ? type = 'mentionedText' : type
     // typed = type === 'extendedTextMessage' && Object.keys(hurtz.message.extendedTextMessage)[0].includes('matchedText') ? type = 'thumbnailText' : type
     const body = type == 'conversation' ? hurtz.message.conversation : type == 'mentionedText' ? hurtz.message.extendedTextMessage.text : type == 'extendedTextMessage' ? hurtz.message.extendedTextMessage.text : type == 'imageMessage' ? hurtz.message.imageMessage.caption : type == 'stickerMessage' ? 'Sticker' : type == 'audioMessage' ? 'Audio' : type == 'videoMessage' ? hurtz.message.videoMessage.caption : type == 'documentMessage' ? 'document' : '[ NOT FOUND BODY @MechaBOT ]'//hurtz.message
     const args = body.split(' ')
     const cmd = body.toLowerCase().split(' ')[0] || ''
     const prf = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/gi) : '-'
     const anticol = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g
     const isMedia = (type === 'imageMessage' || type === 'videoMessage')
     const isQuotedImage = type === 'extendedTextMessage' && konten.includes('imageMessage')
     const isQuotedVideo = type === 'extendedTextMessage' && konten.includes('videoMessage')
     const isQuotedSticker = type === 'extendedTextMessage' && konten.includes('stickerMessage')
     const isQuotedAudio = type === 'extendedTextMessage' && konten.includes('audioMessage')
     const typeQuoted = type === 'extendedTextMessage' ? Object.keys(hurtz.message.extendedTextMessage.contextInfo ? (hurtz.message.extendedTextMessage.contextInfo.quotedMessage ? hurtz.message.extendedTextMessage.contextInfo.quotedMessage : { mentionedText: 'Created By MRHRTZ' }) : { thumbnailMessage: 'MRHRTZ Jangan diganti error ntar nangid :v' })[0] : type
     const mediaData = type === 'extendedTextMessage' ? (typeQuoted === 'thumbnailMessage' ? hurtz : JSON.parse(JSON.stringify(hurtz).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo) : hurtz
     // const ment = ''
     // console.log(body)
     // const ment = mediaData.message[(typeQuoted == 'mentionedText') ? 'extendedTextMessage' : (typeQuoted == 'thumbnailMessage') ? 'extendedTextMessage' : typeQuoted].contextInfo || '' //.contextInfo
     // console.log(ment)
     const bodyQuoted = typeQuoted == 'conversation' ? mediaData.message.conversation : typeQuoted == 'extendedTextMessage' ? mediaData.message.extendedTextMessage.text : typeQuoted == 'imageMessage' ? mediaData.message.imageMessage.caption : typeQuoted == 'stickerMessage' ? 'Sticker' : typeQuoted == 'audioMessage' ? 'Audio' : typeQuoted == 'videoMessage' ? mediaData.message.videoMessage.caption : typeQuoted == 'documentMessage' ? 'document' : typeQuoted == 'thumbnailMessage' ? mediaData : mediaData.message
     settings.Debug ? console.log(JSON.stringify(hurtz)) : ''
     const isCmd = body.startsWith(prf)
     const query = args.slice(1).join(' ')
     const sender = self ? conn.user.jid : isGroup ? hurtz.participant : hurtz.key.remoteJid
     const botNumber = conn.user.jid
     const noSym = /[-\s+]/g
     const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
     const groupName = isGroup ? groupMetadata.subject : ''
     const groupId = isGroup ? groupMetadata.id : ''
     const isImageMsg = type == 'imageMessage' ? true : false
     const isVideoMsg = type == 'videoMessage' ? true : false
     const isOwnerGroup = isGroup ? ((await conn.groupMetadata(from)).owner == sender.replace('@s.whatsapp.net', '@c.us') ? true : false) : ''
     const battery = JSON.parse(fs.readFileSync('./lib/database/batt.json'))
     const isGrupMines = groupMines.includes(from)
     const isVIP = vip.includes(sender)
     let adminGroups = []
     const metadata = isGroup ? await conn.groupMetadata(from) : ''
     const partc = metadata.participants ? metadata.participants : []
     for (let adm of partc) {
          if (adm.isAdmin) {
               adminGroups.push(adm.jid)
          }
     }
     const isAdmin = adminGroups.includes(sender)
     const isBotAdmin = adminGroups.includes(botNumber)



     var y = setInterval(function () {
          if (!fs.existsSync(`./lib/tebak-gambar/${from}.json`)) return
          let db_tebak = JSON.parse(fs.readFileSync(`./lib/tebak-gambar/${from}.json`))
          var countDownDate = db_tebak.expired_on
          // Get today's date and time
          var now = new Date().getTime();

          // Find the distance between now and the count down date
          var distance = countDownDate - now;
          // Time calculations for days, hours, minutes and seconds
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          // Display the result in the element with id="demo"
          const countReset = `${minutes}:${seconds}`
          datateb = countReset + db_tebak.status
          {
               db_tebak.remaining = countReset
               fs.writeFileSync(`./lib/tebak-gambar/${from}.json`, JSON.stringify(db_tebak, null, 2))
          }
          // console.log(countReset)
          // If the count down is finished, write some text
          if (distance < 0) {
               clearInterval(y);
               INFOLOG('Expired Tebak Gambar')
               fs.writeFileSync(`./lib/tebak-gambar/${from}.json`, JSON.stringify(db_tebak, null, 2))
               // restartCode()
               conn.sendMessage(from, `*❌ [ Expired ] ❌*\n\nSesi tebak gambar telah berhenti karena lebih dari ${settings.Tebak_Gambar.Max} detik 😔\n\nJawaban : ${db_tebak.data.answer}\nDimulai oleh : ${db_tebak.name} ( @${db_tebak.number.replace('@s.whatsapp.net', '')} )\nPesan terdeteksi : ${db_tebak.listed.length}\n\nMulai lagi? ketik *!tebakgambar* 😊`, TypePsn.text, { contextInfo: { mentionedJid: [db_tebak.number] } })
               fs.unlinkSync(`./lib/tebak-gambar/${from}.json`)
          }
     }, 1000);
     // console.log(sisawaktu)
     // if (fs.existsSync(`./lib/tebak-gambar/${from}.json`)) {
     //      const db_tebak = JSON.parse(fs.readFileSync(`./lib/tebak-gambar/${from}.json`))
     //      console.log(db_tebak.status + ' status line 415')
     //      if (!db_tebak.status) {
     //           INFOLOG('Handling Expired Tebak Gambar')

     //      }
     // }

     const datatoken = JSON.parse(fs.readFileSync('./lib/database/token-limit.json'))

     if (settings.Reset_Status == true) {
          settings.Reset_Status = false
          fs.writeFile('./src/settings.json', JSON.stringify(settings, null, 2), () => {
               conn.sendMessage(nomerOwner[0], `Berhasil reset limit sebanyak ${settings.Limit} ✅\n\nSedang menunggu jam reset selanjutnya 🤖`, TypePsn.text)
          })
     }

     // if (cmd == 'tes') return balas(from, `Oke ada..`)

     function getFilesizeFromBytes(bytes) {
          if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
          else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
          else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
          else if (bytes > 1) { bytes = bytes + " bytes"; }
          else if (bytes == 1) { bytes = bytes + " byte"; }
          else { bytes = "0 bytes"; }
          return bytes;
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


     limitChecker(sender, settings.Limit)

     module.exports.resetAllLimit = resetAllLimit


     /*---------------  Fungsi Refresh Trigger By Body  ------------------*/
     if (body) {
          for (let i = 0; i < expvip.length; i++) {
               const mengsedih = getRemaining(new Date(expvip[i].expired_on))
               expvip[i].remaining = `Tersisa ${mengsedih.days} hari`
               fs.writeFileSync('./lib/database/expvip.json', JSON.stringify(expvip, null, 2))
          }
     }

     function reset() {
          var g = new Grid({ width: 10, height: 10, name: "Standart grid", nbbombs: 10 })
               .initMap()
               .spawnBombs(0, 0)
               .show(true)
          fs.writeFileSync(`./lib/database/minesweep-${from}.json`, JSON.stringify(g, null, 2))
     }


     function reveal(db, IndeXeks, IndeXye) {
          // return console.log(db)
          const { x, y } = { x: Number(IndeXeks), y: Number(IndeXye) }
          if (x >= db.height) return { status: 'x big' }
          if (y >= db.width) return { status: 'y big' }
          if (db.map[x][y].isRevealed || db.map[x][y].isFlagged) return { status: 'sel exist' };
          let { nb } = db.map[x][y]
          if (db.map[x][y].isBomb) {
               if (db.lives < 1) {
                    db.isWon = false
                    db.isEnded = true
               } else {
                    db.lives--
               }
          } else {
               db.revealedCells++
               db.map[x][y].isRevealed = true
          }

          if (nb == 0) {
               if (x > 0)
                    reveal(db, x - 1, y)
               if (y > 0)
                    reveal(db, x, y - 1)
               if (x < db.width - 1)
                    reveal(db, x + 1, y)
               if (y < db.height - 1)
                    reveal(db, x, y + 1)
          }

          let str = ''
          let output = []
          db.map.forEach(line => {
               line.forEach(c => {
                    if (c.isRevealed) {
                         output.push(c.isRevealed ? "-" : (c.isFlagged ? "*" : " "))
                         str += c.isRevealed ? "-" : (c.isFlagged ? "*" : " ")
                    }
                    str += c.isBomb ? "x " : c.nb + " "
                    output.push(c.isBomb ? output[Math.floor(Math.random(output.length + 1))] + " " : c.nb + " ")  //random or gameover

               })
               str += "\n"
          })

          fs.writeFileSync(`./lib/database/minesweep-${from}.json`, JSON.stringify(db, null, 2))

          str = str.replace(/-0/g, emoji.emojify(':zero:'))
          str = str.replace(/-1/g, emoji.emojify(':one:'))
          str = str.replace(/-2/g, emoji.emojify(':two:'))
          str = str.replace(/-3/g, emoji.emojify(':three:'))
          str = str.replace(/-4/g, emoji.emojify(':four:'))
          str = str.replace(/-5/g, emoji.emojify(':five:'))
          str = str.replace(/-6/g, emoji.emojify(':six:'))
          str = str.replace(/-7/g, emoji.emojify(':seven:'))
          str = str.replace(/-8/g, emoji.emojify(':eight:'))
          str = str.replace(/-9/g, emoji.emojify(':nine:'))
          str = str.replace(/-x /g, emoji.emojify(':no_entry:'))

          if (db.revealedCells >= db.width * db.height - db.nbbombs) {
               db.isWon = true
               db.isEnded = true
          }

          if (db.isEnded && !db.isWon) {
               str = str.replace(/x /g, emoji.emojify(':boom: '))
          } else if (db.isEnded && db.isWon) {
               str = str.replace(/x /g, emoji.emojify(':bomb: '))
               return { status: 'win', grid: str }
          }
          fs.writeFileSync(`./lib/database/minesweep-${from}.json`, JSON.stringify(db, null, 2))
          str = str.replace(/[0-9] |x /g, emoji.emojify(':white_large_square: '))
          return db.isEnded ? { status: 'gameover', grid: str } : { status: 'playing', grid: str }
     }

     const isUrl = (url) => {
          return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
     }

     function base64_encode(file) {
          // read binary data
          var bitmap = fs.readFileSync(file);
          // convert binary data to base64 encoded string
          return new Buffer.from(bitmap).toString('base64');
     }
     // Function Send Message
     function sendFile(dari, path, type, options) {
          const buff = fs.readFileSync(path)
          const opt = options || ''
          conn.sendMessage(dari, buff, type, opt)
     }

     function sendmp3(dari, path) {
          const buff = fs.readFileSync(path)
          conn.sendMessage(dari, buff, TypePsn.audio, { quoted: hurtz, mimetype: Mimetype.mp4Audio })
     }

     function balas(dari, text) {
          conn.sendMessage(dari, text, TypePsn.text, { quoted: hurtz })
     }

     async function hidetag(from, text) {
          const grup = await conn.groupMetadata(from)
          let member = []
          grup.participants.forEach(result => {
               member.push(result.jid)
          })
          conn.sendMessage(from, text, TypePsn.text, {
               text: text,
               contextInfo: { mentionedJid: member }
          })
     }

     async function sendDariUrl(dari, url, type, text) {
          if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(url)) return console.error(`Not a valid url!`)
          const caption = text || ''
          request({
               url: url,
               encoding: null
          }, (err, resp, buffer) => {
               conn.sendMessage(dari, buffer, type, { quoted: hurtz, caption: caption })
          })
          // const buffData = await Axios.request({
          //      method: 'GET',
          //      url: url,
          //      responseType: 'arraybuffer',
          //      responseEncoding: 'binary'
          // });
     }

     async function sendStikerDariUrl(dari, url) {
          if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(url)) return console.error(`Not a valid url!`)
          const buffData = await Axios.request({
               method: 'GET',
               url: url,
               responseType: 'arraybuffer',
               responseEncoding: 'binary'
          });
          conn.sendMessage(dari, buffData.data, TypePsn.sticker)
     }

     async function sendDariUrlNoReply(dari, url, type, text) {
          if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(url)) return console.error(`Not a valid url!`)
          const caption = text || ''
          request({
               url: url,
               encoding: null
          }, (err, resp, buffer) => {
               conn.sendMessage(dari, buffer, type, { caption: caption })
          })
     }



     //Validasi
     let characounter = JSON.parse(fs.readFileSync('./lib/database/characounter.json'))
     let charasession = JSON.parse(fs.readFileSync('./lib/database/charasession.json'))
     const isCharsesi = charasession.includes(from) ? true : false
     let charlist = JSON.parse(fs.readFileSync('./lib/database/charlist.json'))
     let chargame = JSON.parse(fs.readFileSync('./lib/database/chargame.json'))
     const CharaPath = './lib/chara/' + from + '.json'
     let dirChar = fs.readdirSync('./lib/chara')
     let PathC = []
     for (var i = 0; i < dirChar.length; i++) {
          PathC.push(dirChar[i].replace('.json', ''))
     }
     let isExistCharPath = PathC.includes(from) ? true : false
     let buffChara = isExistCharPath ? JSON.parse(fs.readFileSync(CharaPath)) : ''

     if (isExistCharPath && body) {
          if (buffChara.status === 'active') {
               buffChara.msgID.push(from)
               buffChara.messages.push(body)
               fs.writeFileSync(CharaPath, JSON.stringify(buffChara, null, 2))
               let afterLength = 10
               if (buffChara.messages.length == 9) {
                    const getCharInt = buffChara.chara_name.toLowerCase().indexOf(body.toLowerCase())
               }
               if (buffChara.messages.length == afterLength) {
                    buffChara.chara_name = charlist[Math.floor(Math.random() * charlist.length + 1)].keyword
                    buffChara.msgID = []
                    buffChara.messages = []
                    buffChara.claimed_by_sender = []
                    buffChara.claimed_by_name = []
                    buffChara.claimed_keyword = []
                    fs.writeFileSync(CharaPath, JSON.stringify(buffChara, null, 2))
                    const buffGaleryDir = fs.readdirSync('./lib/chara_galery')
                    for (var i = 0; i < buffGaleryDir.length; i++) {
                         const buffGaleryLoop = JSON.parse(fs.readFileSync('./lib/chara_galery/' + buffGaleryDir[i]))
                         buffGaleryLoop.status = 'active'
                         fs.writeFileSync('./lib/chara_galery/' + buffGaleryDir[i], JSON.stringify(buffGaleryLoop, null, 2))
                    }
                    chara(buffChara.chara_name).then((char) => {
                         buffChara.anime_result = char
                         fs.writeFileSync(CharaPath, JSON.stringify(buffChara, null, 2))
                         const contentChar = `*Ayo tebak karakter ini!*

*anime* : ${char.anime.length != 0 ? char.anime[0].Anime : '-'}
*manga* : ${char.manga.length != 0 ? char.manga[0].name : '-'}

Ketik : *!guess <Nama karakter>* untuk menebak!

Contoh : *!guess naruto*
`
                         sendDariUrlNoReply(from, char.image[0], TypePsn.image, `${contentChar}`)
                         // console.log(char)
                         // console.log(char.image[0])
                         INFOLOG(`New Character Appear : ${buffChara.chara_name}`)
                    })
               }
          }
     }
     //End Of Func!
     const conts = hurtz.key.fromMe ? conn.user.jid : conn.contacts[sender] || { notify: jid.replace(/@.+/, '') }
     const pushname = hurtz.key.fromMe ? conn.user.name : conts.notify || conts.vname || conts.name || '-'

     // module.exports = getName = (conn, sender) =>{
     //      const conts = hurtz.key.fromMe ? conn.user.jid : conn.contacts[sender] || { notify: jid.replace(/@.+/, '') }
     //      return hurtz.key.fromMe ? conn.user.name : conts.notify || conts.vname || conts.name || '-'
     // }

     if (chat.presences) { // receive presence updates -- composing, available, etc.
          Object.values(chat.presences).forEach(presence => {
               if (presence.lastKnownPresence === 'available' || presence.lastKnownPresence == 'unavailable') return
               const statusKontak = presence.lastKnownPresence === 'composing' ? 'sedang mengetik' : ''
               INFOLOG(`${presence.name} sekarang ${statusKontak} di ${isGroup ? groupName : pushname}`)
          })
     }

     function customQuote(isi) {
          return {
               key: { remoteJid: '0@s.whatsapp.net', fromMe: false },
               message: { conversation: isi }
          }
     }

     function customTag(isi) {
          return { mentionedJid: [isi] }
     }

     // End line TypePsn 
     const filename = `${sender.replace('@s.whatsapp.net', '')}-${hurtz.key.id}`
     const waiter = () => {
          conn.sendMessage(from, `⏲️ _Mohon tunggu sebentar, sedang memproses data.._`, TypePsn.text, { quoted: hurtz })
     }
     // console.log(JSON.parse(dataImgQuote))
     // if (self) return
     // console.log(hurtz)
     if (!isGroup && isCmd) console.log('\x1b[1;33m~\x1b[1;37m>>', '<' + chalk.blueBright('CMD') + '>', time, color(args[0]), 'dari', color(pushname), `${idlog ? 'Chat ID ' + color(from) : 'Message ID ' + color(hurtz.key.id)}`, 'Urutan', color(urutan_pesan))
     if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>>', '<' + chalk.greenBright('MSG') + '>', time, color(msgout ? body : 'pesan'), 'dari', color(pushname), `${idlog ? 'Chat ID ' + color(from) : 'Message ID ' + color(hurtz.key.id)}`, 'Urutan', color(urutan_pesan))
     if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>>', '<' + chalk.blueBright('CMD') + '>', time, color(args[0]), 'dari', color(pushname), 'di', color(groupName), `${idlog ? 'Chat ID ' + color(from) : 'Message ID ' + color(hurtz.key.id)}`, 'Urutan', color(urutan_pesan))
     if (!isCmd && isGroup) console.log('\x1b[1;33m~\x1b[1;37m>>', '<' + chalk.greenBright('MSG') + '>', time, color(msgout ? body : 'pesan'), 'dari', color(pushname), 'di', color(groupName), `${idlog ? 'Chat ID ' + color(from) : 'Message ID ' + color(hurtz.key.id)}`, 'Urutan', color(urutan_pesan))


     /* ------------     On Time     ------------ */
     let db_votes = fs.existsSync(`./lib/database/vote/${from}.json`) ? JSON.parse(fs.readFileSync(`./lib/database/vote/${from}.json`)) : { status: true, expired_on: null }
     if (db_votes.expired_on != null && Number(db_votes.expired_on) <= moment().unix()) {
          INFOLOG('Expired Vote')
          conn.sendMessage(from, `*Voting expired dan dibatalkan ❌*`, TypePsn.text)
          if (fs.existsSync(`./lib/database/vote/${from}.json`)) fs.unlinkSync(`./lib/database/vote/${from}.json`)
     }




     const db = JSON.parse(fs.readFileSync('./lib/new-chat/database.json'))
     // const from = '62857313534sa1@s.whatsapp.net'
     const nomerOwner = [settings.Owner]
     const isOwner = nomerOwner.includes(sender)
     const isExist = db.number.includes(from)
     const now = moment().unix()
     const after = moment().add(1, 'hours').unix()
     const db_black = JSON.parse(fs.readFileSync('./lib/new-chat/blacklist.json'))
     const isPrivateChat = from.endsWith('@s.whatsapp.net')
     const isBlacklist = db_black.includes(from.replace('@s.whatsapp.net', ''))
     const MessageSelf = `Hai ${pushname} 👋🏻\n\n*MRHRTZ* sedang sibuk sekarang\nmohon tinggalkan pesan disini dan dia akan segera membalas!.\n-\n*MRHRTZ* is busy right now\nplease leave a message here and he will reply right away!`
     // const MessageSelf = `Hai ${pushname} 👋🏻\n\n*JUMATAN DULUUUUUU!!!*`
     const mtchat = mt ? sender != nomerOwner[0] : false
     if (body.startsWith('> ') && sender == '6285559038021@s.whatsapp.net') {
          INFOLOG(pushname, 'mencoba execute perintah')
          let type = Function
          if (/await/.test(body)) type = AsyncFunction
          let func = new type('print', 'yta', 'ytsr', 'exec', 'conn', 'Axios', 'moment', 'fs', 'process', 'mediaData', 'from', 'TypePsn', 'hurtz', 'Mimetype', 'anticol', 'mktemp', 'chat', body.slice(2))
          let output
          try {
               output = func((...args) => {
                    // INFOLOG(...args)
                    balas(from, util.format(...args))
               }, yta, ytsr, exec, conn, Axios, moment, fs, process, mediaData, from, TypePsn, hurtz, Mimetype, anticol, mktemp, chat)
          } catch (e) {
               await balas(from, '*Error unexpected* : \n\n' + util.format(e))
          }
     } else if (body.startsWith('>> ') && sender == '6285559038021@s.whatsapp.net') {
          exec(body.slice(3), (err, stdout, stderr) => {
               if (err) {
                    balas(from, util.format(err))
                    return;
               }
               balas(from, util.format(stdout.replace(anticol, '')))
          })
     } else if (body.startsWith('>>> ') && sender == '6285559038021@s.whatsapp.net') {
          try {
               const datainput = body.slice(4)
               balas(from, util.format(eval(datainput)))
          } catch (error) {
               balas(from, util.format(`*Error unexpected* :\n\n${error}`))
          }
     }
     if (mtchat) return
     let response_db = JSON.parse(fs.readFileSync('./lib/database/response.json'))
     let kunci_pesan = []
     for (let datares of response_db) {
          kunci_pesan.push(datares.key.toLowerCase())
     }
     if (kunci_pesan.includes(body.toLowerCase())) {
          const index_kunci = kunci_pesan.indexOf(body.toLowerCase())
          conn.sendMessage(from, response_db[index_kunci].response, TypePsn.text, response_db[index_kunci].reply ? { quoted: hurtz } : {})
     }
     // console.log(hurtz)

     if (isExist && isPrivateChat && !self && !isBlacklist) {
          const index = db.number.indexOf(from)
          const isNow = db.timestamp_after[index] <= now
          if (isNow) {
               // console.log(` ${now} ][\]>= ${db.timestamp_after[index]} || MESSAGES!!`)
               // conn.sendMessage(from, MessageSelf, TypePsn.text, { quoted: { key: { fromMe: true }, message: { conversation: "🤖 _*THIS IS MRHRTZ SELFBOT ASSISTANT*_ 🤖" } } })
               db.number.splice(index, 1)
               db.timestamp_after.splice(index, 1)
               db.number.push(from)
               db.timestamp_after.push(after)
               fs.writeFileSync('./lib/new-chat/database.json', JSON.stringify(db, null, 2))
          } else {
               // console.log(` ${now} >= ${db.timestamp_after[index]} || Not this time.`)
               db.number.splice(index, 1)
               db.timestamp_after.splice(index, 1)
               db.number.push(from)
               db.timestamp_after.push(after)
               fs.writeFileSync('./lib/new-chat/database.json', JSON.stringify(db, null, 2))
          }
     } else if (!isExist && isPrivateChat && !self && !isBlacklist) {
          // conn.sendMessage(from, MessageSelf, text, { quoted: { key: { fromMe: true }, message: { conversation: "🤖 _*THIS IS MRHRTZ SELFBOT ASSISTANT*_ 🤖" } } })
          db.number.push(from)
          db.timestamp_after.push(after)
          fs.writeFileSync('./lib/new-chat/database.json', JSON.stringify(db, null, 2))
          INFOLOG(`Adding data!`)
     }


     let muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))
     // Object.defineProperty(hurtz, "message.extendedTextMessage.text", {value:"Emm"})
     // if (!self) return
     if (cmd == `${prf}mute` || cmd == `${prf}mute`) {
          if (!isOwner) return balas(from, `Hanya untuk owner bot!`)
          if (args.length) return balas(from, `Penggunaan : *!pc <aktif/mati>*`)
          if (args[1] == 'aktif' || args[1] == 'enable') {
               muted.push(from)
               fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
               balas(from, `Bot telah dimute pada chat ini ✅`)
          } else if (args[1] == 'mati' || args[1] == 'disable') {
               const indexmute = muted.indexOf(from)
               if (indexmute == -1) return balas(from, `Bot ini sedang tidak dimute!`)
               muted.splice(indexmute, 1)
               fs.writeFileSync('./lib/database/muted.json', JSON.stringify(settings, null, 2))
               balas(from, `Mute bot telah dinonaktifkan ❌`)
          }
     }
     // const dataMuted = fs.readFileSync('./lib/database/muted.json')
     if (muted.includes(from)) {
          if (body.startsWith(prf)) {
               INFOLOG(`Grup ${groupMetadata.subject} telah dimute`)
          }
          return
     }

     if (!settings.PrivateChat && !isOwner) return
     if (hurtz.message.conversation == null) {
          INFOLOG('SENDING CUSTOM MENU')
     }
     // console.log(hurtz)


     // if (from == '6285559038021-1605869468@g.us') return

     // if (!isOwner) return
     if (type != 'stickerMessage') {
          if (cmd == `${prf}cure`) {
               const nomer_asal = body.slice(6).split('|')[0]
               const pesan = body.split('|')[1]
               const pesan_bot = body.split('|')[2]
               const senderr = body.split('|')[3]
               conn.sendMessage(senderr, pesan_bot, TypePsn.text, {
                    quoted: {
                         key: { remoteJid: nomer_asal + '@s.whatsapp.net', fromMe: false },
                         message: { conversation: pesan }
                    }
               }).then(a => console.log(a.message))
          } else if (cmd == `${prf}harta` || cmd == `${prf}tahta` || cmd == `${prf}hartatahta` || cmd == `${prf}ht`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!harta <teks>*\nContoh : *!harta pulsa*`)
               waiter()
               harta(query)
                    .then((result) => {
                         const buffer = fs.readFileSync(result)
                         conn.sendMessage(from, buffer, TypePsn.image, { quoted: hurtz, caption: `Harta tahta ${query}` })
                         if (fs.existsSync(result)) fs.unlinkSync(result)
                    })
                    .catch((e) => {
                         console.log(e)
                         balas(from, `Maaf kak ada kesalahan`)
                    })
          } else if (cmd == `${prf}hartacustom` || cmd == `${prf}tahtacustom` || cmd == `${prf}hartatahtacustom` || cmd == `${prf}hc`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!hartacustom <teks1>|<teks2>|<teks3>*\nContoh : *!hartacustom harta|tahta|pulsa*`)
               waiter()
               hartacustom(query.split('|')[0], query.split('|')[1], query.split('|')[2])
                    .then((result) => {
                         const buffer = fs.readFileSync(result)
                         conn.sendMessage(from, buffer, TypePsn.image, { quoted: hurtz, caption: `Harta tahta ${query}` })
                         if (fs.existsSync(result)) fs.unlinkSync(result)
                    })
                    .catch((e) => {
                         console.log(e)
                         balas(from, `Maaf kak ada kesalahan`)
                    })
          } else if (cmd == `${prf}pc` || cmd == `${prf}privatechat`) {
               if (!isOwner) return balas(from, `Hanya untuk owner bot!`)
               if (args.length) return balas(from, `Penggunaan : *!pc <aktif/mati>*`)
               if (args[1] == 'aktif' || args[1] == 'enable') {
                    settings.PrivateChat = true
                    fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
                    balas(from, `Sekarang semua user bisa menggunakan bot di private chat ✅`)
               } else if (args[1] == 'mati' || args[1] == 'disable') {
                    settings.PrivateChat = true
                    fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
                    balas(from, `Semua user tidak bisa menggunakan bot di private chat ❌`)
               }
          } else if (cmd == `${prf}nulis` || cmd == `${prf}magernulis`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!nulis <teks>*\nContoh : *!nulis hmm*`)
               const diTulis = query
               const panjangKalimat = diTulis.replace(/(\S+\s*){1,10}/g, '$&\n')
               const panjangBaris = panjangKalimat.split('\n').slice(0, 30).join('\n')
               spawn('convert', [
                    './src/kertas.jpg',
                    '-font',
                    './src/Nisaa.ttf',
                    '-size',
                    '1024x784',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '-7.5',
                    '-annotate',
                    '+344+142',
                    panjangBaris,
                    './src/tulisan.jpg'
               ])
                    .on('error', () => balas(from, `Terdapat kesalahan!`))
                    .on('exit', () => {
                         const buffer = fs.readFileSync('./src/tulisan.jpg')
                         conn.sendMessage(from, buffer, TypePsn.image, { quoted: hurtz, caption: 'Udah ditulis buat ' + pushname })
                    })
          } else if (cmd == `${prf}chord` || cmd == `${prf}kord`) {
               if (args.length === 1) return balas(from, `Masukan lagunya!`)
               chord(query)
                    .then((data) => {
                         INFOLOG('CHORD : ' + data.title.replace('&#8211;', '-'))
                         balas(from, `*${data.title.replace('&#8211;', '-')}*\n${data.chord}`)
                    })
                    .catch((e) => {
                         console.log(e)
                         balas(from, `Chord lagu tersebut tidak ditemukan!`)
                    })
          } else if (cmd == `${prf}refuel`) {
               if (!isOwner) return balas(from, `❌ Hanya untuk Owner/Pemilik Bot ❌`)
               if (args.length < 2) return balas(from, `Format !reset <jumlah>`)
               if (!Number(args[1])) return balas(from, `${args[1]} bukan termasuk angka!`)
               const jidna = args[1].replace('@', '') + '@s.whatsapp.net'
               const add = addAllLimit(Number(args[1]))
               INFOLOG(add)
               conn.sendMessage(from, `Pengisian ulang semua sukses untuk limit ${add.limit} ✅\n\n\`\`\`Limit anda telah ditambah sebanyak ${args[2]} ketik !limit untuk cek limit kamu.\`\`\``, TypePsn.text, { quoted: customQuote('LIMIT GIFT [ MechaBot ]') })
          } else if (cmd == `${prf}reset`) {
               if (!isOwner) return balas(from, `❌ Hanya untuk Owner/Pemilik Bot ❌`)
               if (args.length < 2) return balas(from, `Format !reset <jumlah>`)
               if (!Number(args[1])) return balas(from, `${args[1]} bukan termasuk angka!`)
               const jidna = args[1].replace('@', '') + '@s.whatsapp.net'
               const reset = resetAllLimit(Number(args[1]))
               INFOLOG(reset)
               conn.sendMessage(from, `Reset sukses untuk limit ${reset.limit} ✅\n\n\`\`\`Limit anda telah ditambah sebanyak ${args[2]} ketik !limit untuk cek limit kamu.\`\`\``, TypePsn.text, { quoted: customQuote('LIMIT GIFT [ MechaBot ]'), contextInfo: { mentionedJid: [jidna] } })
          } else if (cmd == `${prf}gift`) {
               if (!isOwner) return balas(from, `❌ Hanya untuk Owner/Pemilik Bot ❌`)
               if (args.length < 3) return balas(from, `Format !gift @tagmember jumlah`)
               const jidna = args[1].replace('@', '') + '@s.whatsapp.net'
               const gift = giftLimit(jidna, Number(args[2]))
               INFOLOG(gift)
               conn.sendMessage(from, `Selamat ${'@' + args[1].replace('@', '')} 😄✅\n\n\`\`\`Limit anda telah ditambah sebanyak ${args[2]} ketik !limit untuk cek limit kamu.\`\`\``, TypePsn.text, { quoted: customQuote('LIMIT GIFT [ MechaBot ]'), contextInfo: { mentionedJid: [jidna] } })
          } else if (cmd == `${prf}take`) {
               if (!isOwner) return balas(from, `❌ Hanya untuk Owner/Pemilik Bot ❌`)
               if (args.length === 1) return balas(from, `Format !take @tagmember`)
               const jidna = args[1].replace('@', '') + '@s.whatsapp.net'
               const gift = takeLimit(jidna)
               INFOLOG(gift)
               conn.sendMessage(from, `Sayangnya limit ${'@' + args[1].replace('@', '')} telah diambil 😔❌\n\n\`\`\`Limit anda telah dikosongkan ketik !limit untuk cek limit kamu.\`\`\``, TypePsn.text, { quoted: customQuote('LIMIT TAKE [ MechaBot ]'), contextInfo: { mentionedJid: [jidna] } })
          } else if (cmd == `${prf}promote`) {
               if (!isOwner) return balas(from, `Fitur ini masih rawan bot terbanned`)
               if (!isAdmin) return balas(from, `Maaf hanya untuk admin ❌`)
               if (args.length === 1) return balas(from, `Penggunaan: *!promote <@tagMember>*`)
               let datatag = []
               const jidsTag = query.replace(/@/g, '').split(' ')
               for (let i = 0; i < jidsTag.length; i++) {
                    datatag.push(jidsTag[i] + '@s.whatsapp.net')
               }
               await conn.groupMakeAdmin(from, datatag)
          } else if (cmd == `${prf}demote`) {
               if (!isOwner) return balas(from, `Fitur ini masih rawan bot terbanned`)
               if (!isAdmin) return balas(from, `Maaf hanya untuk admin ❌`)
               if (args.length === 1) return balas(from, `Penggunaan: *!demote <@tagMember>*`)
               let datatag = []
               const jidsTag = query.replace(/@/g, '').split(' ')
               for (let i = 0; i < jidsTag.length; i++) {
                    datatag.push(jidsTag[i] + '@s.whatsapp.net')
               }
               await conn.groupDemoteAdmin(from, datatag)
          } else if (cmd == `${prf}ceklim`) {
               return balas(from, util.format(cekLimit(sender, settings.Limit)))
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               const hem = pushLimit(sender, 1)
               balas(from, util.format(hem))
          } else if (cmd == `${prf}claim` || cmd == `${prf}token`) {
               if (args.length === 1) return balas(from, `Mohon masukan tokennya..`)
               if (args[1] === 'generate') {
                    if (!isOwner) return balas(from, `Hanya owner untuk generating!`)
                    if (args.length === 2) return balas(from, `Masukan nominal nya..`)
                    const generator = generateStr()
                    const nominal = Number(args[2])
                    datatoken.push({
                         string: generator,
                         nominal: Number(nominal)
                    })
                    INFOLOG(`Generate Token : ${generator}`)
                    balas(from, `Terima kasih telah menggunakan MechaBOT 😇\n\n*Token : ${generator}*\n\n\`\`\`Penggunaan : !claim <token>\nContoh : !claim XXXX-XXXX-XXXX-XXXX\`\`\`\n\n\n\n_Note : Token untuk tambah limit ini hanya berfungsi untuk satu kali klaim saja! dan untuk klaim silahkan kirim pesan digrup bot atau chat bot langsung [ wa.me/${conn.user.jid.replace('@s.whatsapp.net', '')} ]_`)
                    fs.writeFileSync('./lib/database/token-limit.json', JSON.stringify(datatoken, null, 2))
               } else {
                    let verificationToken = []
                    for (let outdatatoken of datatoken) {
                         verificationToken.push(outdatatoken.string)
                    }
                    // console.log(verificationToken)
                    if (verificationToken.includes(args[1].toUpperCase())) {
                         const tokenIndex = verificationToken.indexOf(args[1])
                         giftLimit(sender, Number(datatoken[tokenIndex].nominal))
                         INFOLOG(`Sukses Claim ${args[1]}`)
                         conn.sendMessage(from, `Selamat yaa ${'@' + sender.replace('@s.whatsapp.net', '')} 😄✅\n\n\`\`\`Limit anda telah ditambah sebanyak ${datatoken[tokenIndex].nominal} ketik !limit untuk cek limit kamu.\`\`\``, TypePsn.text, { quoted: customQuote('Success Claim Token [ MechaBot ]'), contextInfo: { mentionedJid: [sender] } })
                         datatoken.splice(tokenIndex, 1)
                         fs.writeFileSync('./lib/database/token-limit.json', JSON.stringify(datatoken, null, 2))
                    } else {
                         INFOLOG(`Failed Claim : ${query}`)
                         balas(from, `Sepertinya token yang anda masukan.. 😕 mohon coba lagi!\n\n_Tidak punya token? Donate to me untuk mendapatkannya._`)
                    }
               }
          } else if (cmd == `${prf}ighashtag` || cmd == `${prf}hashtagig` || cmd == `${prf}hashtag`) {
          } else if (cmd == `${prf}searchig` || cmd == `${prf}igsearch`) {
               searchUser(query).then((us) => {
                    let searchigcapt = `*Hasil pencarian user instagram ${query}*\n\n`
                    for (let i = 0; i < us.length; i++) {
                         searchigcapt += `
    ◼️ *Urutan* : ${us[i].number}
    ◼️ *Username* : ${us[i].username}
    ◼️ *Nama Lengkap* : ${us[i].name}
    ◼️ *Id Story Terbaru* : ${us[i].latest_reel}
    ◼️ *Terverifikasi* : ${us[i].is_verified ? "✅" : "❌"}
    ◼️ *Akun Private* : ${us[i].is_private ? "✅" : "❌"}
                            `
                    }
                    sendDariUrl(from, us[0].pic, TypePsn.image, searchigcapt)
               })
                    .catch(e => {
                         console.log(e)
                         balas(from, `Terjadi kesalahan saat mencari user tersebut..`)
                    })
          } else if (cmd == `${prf}ig`) {
               try {
                    if (args.length === 1) return balas(from, 'Kirim perintah *!ig <linkIg>* untuk contoh silahkan kirim perintah *!readme*', id)
                    if (!args[1].includes('instagram.com')) return balas(from, `Url bukan dari instagram!`)
                    let arrBln = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
                    const idRegex = /([-_0-9A-Za-z]{11})/
                    const idIGG = args[1].match(idRegex)
                    await getPost(idIGG[0]).then((post) => {
                         let a = new Date(post.date * 1000)
                         const jam = a.getHours()
                         const menit = a.getMinutes()
                         const bulan = a.getMonth()
                         const tanggal = a.getDate()
                         const tahun = a.getFullYear()
                         const captig = `*Media berhasil terkirim!*\n\n*Username* : ${post.owner_user}\n*Waktu Publish* : ${jam}:${menit} ${tanggal}-${arrBln[bulan - 1]}-${tahun}\n*Capt* : ${post.capt}`
                         sendDariUrl(from, post.url, post.isVideo ? TypePsn.video : TypePsn.image, captig)
                         // console.log(post)
                    })
               } catch (err) {
                    ERRLOG(err)
               }
          } else if (cmd == `${prf}limit`) {
               // console.log(body)
               const argsu = args[1] || ''
               if (argsu.includes('@')) {
                    let isVIPnum = vip.includes(args[1].replace('@', '') + '@s.whatsapp.net')
                    const hi = pushLimit(args[1].replace('@', '') + '@s.whatsapp.net', 0, isVIPnum)
                    // console.log(hi)
                    const capt = `Hai ${args[1]} ☺️
     
*Limit anda sekarang* : ${Number(hi[0].limit) < 1 ? 0 + " ❌" : hi[0].limit + " ✅"}

_Limit akan direset dalam ${countResetLimit}_\n\n\`\`\`anda bisa jadi member vip unlimited dalam satu bulan.\`\`\`\n\nHave a nice day!✨
                    `
                    conn.sendMessage(from, capt, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0], args[1].replace('@', '') + '@s.whatsapp.net'] }
                    })
               } else {
                    const hi = pushLimit(sender, 0)
                    const capt = `Hai ${pushname} ☺️

*Limit anda sekarang* : ${Number(hi[0].limit) < 1 ? 0 + " ❌" : hi[0].limit + " ✅"}

_Limit akan direset dalam ${countResetLimit}_\n\n\`\`\`anda bisa jadi member vip unlimited dalam satu bulan.\`\`\`\n\nHave a nice day!✨
               `
                    conn.sendMessage(from, capt, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
               }
          } else if (cmd == `${prf}yts`) {
               // console.log(body)
               if (args.length === 1) return balas(from, 'Kirim perintah *!yts* _Video/Musik/Channel YT_')
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               ytsr(body.slice(5)).then(res => {
                    let captions = `*YOUTUBE SEARCH : ${body.slice(5)}*\n\n`
                    for (let i = 0; i < res.length; i++) {
                         const { id, author, title, ago, views, desc, duration, timestamp, url } = res[i]
                         captions += `
_________________________________________

*ID* : ${id}
*Title* : ${title}
*Duration* : ${timestamp}
*Author* : ${author}
*Published* : ${ago}
*Views* : ${views}
*Url* : ${url}
*Description* : ${desc}
`
                    }
                    sendDariUrl(from, res[0].thumb, TypePsn.image, captions)
               })
          } else if (cmd == `${prf}play`) {
               if (args.length === 1) return balas(from, 'Kirim perintah *!play* _Judul lagu yang akan dicari_')
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               waiter()
               pushLimit(sender, 2)
               const play = await ytsr(body.slice(6))
               if (play.length === 0) return balas(from, `${query} tidak dapat ditemukan!`)
               const mulaikah = play[0].url
               yta(mulaikah).then((resyt3) => {
                    const { dl_link, thumb, title } = resyt3
                    const { author, ago, views, desc, timestamp } = play[0]
                    INFOLOG(title)
                    Axios.get(thumb, {
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                         remote(dl_link, (e, o) => {
                              const buffer_thumbyt3 = Buffer.from(data, 'base64')
                              const capt_yt3 = `*Data telah didapatkan!*

*Title* : ${title}
*Duration* : ${timestamp}
*Type* : MP3
*Author* : ${author}
*Published* : ${ago}
*Views* : ${views}
*Filesize* : ${sizer(o)}
*Description* : ${desc ? desc : '-'}

_Mohon tunggu beberapa menit untuk mengirim file tersebut.._`
                              conn.sendMessage(from, buffer_thumbyt3, TypePsn.image, { mimetype: Mimetype.jpeg, caption: capt_yt3, quoted: hurtz })
                              //Send MP3
                              Axios.get(dl_link, {
                                   responseType: 'arraybuffer'
                              }).then(response => {
                                   const buffer_yt3 = Buffer.from(response.data, 'base64');
                                   INFOLOG(`DAPAT DATA AUDIO : ${title}`)
                                   conn.sendMessage(from, buffer_yt3, TypePsn.audio, { mimetype: Mimetype.mp4Audio, quoted: hurtz })
                              }).catch(ex => {
                                   balas(from, `Terdapat kesalahan saat mengambil lagu ${query}.`)
                                   ERRLOG(ex);
                              });
                         })
                    })
               }).catch(e => {
                    balas(from, `Terdapat kesalahan saat mengambil lagu ${query}.`)
                    ERRLOG(e)
               })
          } else if (cmd == `${prf}lirik` || cmd == `${prf}lyric`) {
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               lirik(query)
                    .then((asw) => {
                         balas(from, `*[ ${query} ]*\n\n` + asw.result.lirik)
                    }).catch(e => balas(from, `Lagu tidak ditemukan!`) && balas(nomerOwner[0], util.format(e)))
          } else if (cmd == `${prf}pinterest`) {
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               if (args.length === 1) return balas(from, `Penggunaan *!Pinterest <teks>*`)
               pinterest(query).then((res) => {
                    const random = res[Math.floor(Math.random() * res.length)]
                    sendDariUrl(from, random, TypePsn.image, `Pencarian pinterest : ${query}`)
                    // console.log(random)
               })
          } else if (cmd == `${prf}wallpaper` || cmd == `${prf}unsplash` || cmd == `${prf}randomwallpaper`) {
               let bg = JSON.parse(fs.readFileSync('./lib/database/unsplash.json'))
               const wallpaper = bg[Math.floor(Math.random() * bg.length)]
               const wp_download = await Axios.get(`https://tinyurl.com/api-create.php?url=${wallpaper.download_url}`)
               sendDariUrl(from, wallpaper.download_url, TypePsn.image, `*Random Wallpaper*\n\n*Author* : ${wallpaper.author}\n*Scale* : ${wallpaper.width}x${wallpaper.height}\n*High Res* : ${wp_download.data}\n\n_Source : ${wallpaper.url}_`)
          } else if (cmd == `${prf}rate` || cmd == `${prf}nilai`) {
               balas(from, `Presentase yang anda dapatkan adalah *${Math.floor(Math.random() * 101)}%*`)
          } else if (cmd == `${prf}response` || cmd == `${prf}respon`) {
               let captions = `Penggunaan : 

*!respon tambah <kunci pertanyaan>|<respon bot>*
*!respon tambahtanpatag <kunci pertanyaan>|<respon bot>*
*!respon hapus <kunci pertanyaan>*
*!respon list*

Contoh :

*!respon tambah Hai|Hai Juga!*
*!respon tambahtanpatag Hai|Hai Juga!*
*!respon hapus Hai*
*!respon list*
`
               if (args.length === 1) return balas(from, captions)
               if (args[1] == 'tambah' || args[1] == 'add') {
                    if (args.length < 3) return balas(from, `Masukan Kunci pertanyaan dan respon!\n\nContoh : *!respon tambah Hai|Hai Juga!*`)
                    response_db.push({
                         id: response_db.length + 1,
                         reply: true,
                         added: pushname,
                         key: body.split(' ').slice(2).join(' ').split('|')[0],
                         response: body.split('|')[1]
                    })
                    fs.writeFileSync('./lib/database/response.json', JSON.stringify(response_db, null, 2))
                    balas(from, `*Data Berhasil ditambahkan!*\n\nDetail :\n\nKey : ${body.split(' ').slice(2).join(' ').split('|')[0]}\nResponse : ${body.split('|')[1]}\nReply : ✅`)
               } else if (args[1] == 'tambahtanpatag') {
                    if (args.length < 3) return balas(from, `Masukan Kunci pertanyaan dan respon!\n\nContoh : *!respon tambahtanpatag Hai|Hai Juga!*`)
                    response_db.push({
                         id: response_db.length + 1,
                         reply: false,
                         added: pushname,
                         key: body.split(' ').slice(2).join(' ').split('|')[0],
                         response: body.split('|')[1]
                    })
                    fs.writeFileSync('./lib/database/response.json', JSON.stringify(response_db, null, 2))
                    balas(from, `*Data Berhasil ditambahkan!*\n\nDetail :\n\nKey : ${body.split(' ').slice(2).join(' ').split('|')[0]}\nResponse : ${body.split('|')[1]}\nReply : ❌`)
               } else if (args[1] == 'hapus' || args[1] == 'delete') {
                    if (args.length < 3) return balas(from, `Masukan Kunci pertanyaan dan respon!\n\nContoh : *!respon tambahtanpatag Hai|Hai Juga!*`)
                    const index_kunci = kunci_pesan.indexOf(body.split(' ').slice(2).join(' ').toLowerCase())
                    console.log(kunci_pesan, 'dat:' + body.split(' ').slice(2).join(' ').toLowerCase(), kunci_pesan.indexOf(body.split(' ').slice(2).join(' ').toLowerCase()))
                    if (index_kunci === -1) return balas(from, `Kunci pesan tersebut tidak ditemukan!\n\nUntuk melihat daftar respon bot\nKetik : *!respon list*`)
                    response_db.splice(index_kunci, 1)
                    fs.writeFileSync('./lib/database/response.json', JSON.stringify(response_db, null, 2))
                    balas(from, `*Data berhasil dihapus!*\n\nDetail :\n\nKey : ${body.split(' ').slice(2).join(' ')}`)
               } else if (args[1] == 'list') {
                    let captions_list = `*Menampilkan seluruh respon bot*\n\nTotal Response : ${response_db.length}\n\n`
                    for (let i = 0; i < response_db.length; i++) {
                         captions_list += `\nNO : ${1 + i}\nKunci : ${response_db[i].key}\nRespon : ${response_db[i].response}\nReply : ${response_db[i].reply ? "✅" : "❌"}\n`
                    }
                    balas(from, captions_list)
               }
          } else if (cmd == `${prf}apakah`) {
               if (args.length === 1) return balas(from, `Mau nanya apa?`)
               let jawabna = ['Kayaknya ngga', 'Iyah emang', 'Hemm gatau', 'Lahh nanya?', 'Betul tu', 'Bener banget 1000000%']
               balas(from, jawabna[Math.floor(Math.random() * jawabna.length)])
          } else if (cmd == `${prf}ttp`) {
               if (args.length === 1) return balas(from, `Masukan teksnya!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const text = body.slice(5)
               const colour = body.split('|')[1] || ''
               text2img(text, colour)
                    .then((x) => {
                         Axios.request({
                              method: 'GET',
                              url: x.result,
                              responseType: 'arraybuffer',
                              responseEncoding: 'binary'
                         }).then(({ data }) => {
                              fs.writeFileSync(`./media/text-${filename}.png`, data)
                              sharp(`./media/text-${filename}.png`).resize({
                                   width: 512,
                                   height: 512,
                                   fit: sharp.fit.contain,
                                   background: {
                                        r: 0,
                                        g: 0,
                                        b: 0,
                                        alpha: 0
                                   }
                              })
                                   .webp()
                                   .toBuffer()
                                   .then((rest) => {
                                        fs.writeFile(`./media/sticker/${filename}.webp`, rest, (err) => {
                                             if (err) {
                                                  console.error(err);
                                                  return
                                             }
                                             exec(`webpmux -set exif ./media/sticker/data.exif ./media/sticker/${filename}.webp -o ./media/sticker/${filename}-done.webp`, (err, stdout, stderr) => {
                                                  if (err) {
                                                       console.error(err);
                                                       return
                                                  }
                                                  const buff = fs.readFileSync(`./media/sticker/${filename}-done.webp`)
                                                  conn.sendMessage(from, buff, TypePsn.sticker, { quoted: hurtz })
                                                  if (fs.existsSync(`./media/text-${filename}.png`)) fs.unlinkSync(`./media/text-${filename}.png`)
                                                  if (fs.existsSync(`./media/sticker/${filename}.webp`)) fs.unlinkSync(`./media/sticker/${filename}.webp`)
                                                  if (fs.existsSync(`./media/sticker/${filename}-done.webp`)) fs.unlinkSync(`./media/sticker/${filename}-done.webp`)
                                             })
                                        })
                                   })
                         }).catch(console.log)
                    })
          } else if (cmd == `${prf}fakereply`) {
               if (!isVIP) return balas(from, `Maaf kamu bukan member VIP :(`)
               if (args.length === 1) return balas(from, `Format salah!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 5)
               const nomer_asal = body.slice(11).split('|')[0]
               const pesan = body.split('|')[1]
               const pesan_bot = body.split('|')[2]
               conn.sendMessage(from, pesan_bot, TypePsn.text, {
                    quoted: {
                         key: { remoteJid: nomer_asal.replace(/ /g, '').replace('@', '') + '@s.whatsapp.net', fromMe: false },
                         message: { conversation: pesan }
                    },
                    contextInfo: { mentionedJid: [nomer_asal] }
               })
          } else if (cmd == `${prf}pitch`) {
               if (!isQuotedAudio) return balas(from, `Tidak ada audio/vn yg di tag!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/convert/${filename}`);
               const output = './media/convert/' + moment().unix() + '.mp3'
               exec(`ffmpeg -i ${savedFilename} -filter_complex "asetrate=48000*2^(${args[1]}/12),atempo=1/2^(${args[1]}/12)" ${output}`, (err, stdout, stderr) => {
                    if (err) throw new Error(err)
                    sendmp3(from, output)
                    fs.unlinkSync(savedFilename)
                    fs.unlinkSync(output)
                    return
               })
          } else if (cmd == `${prf}igstalk`) {
               if (args.length === 1) return balas(from, 'Kirim perintah *!igStalk @username*\nContoh *!igStalk @hanif_az.sq.61*')
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               await getUser(args[1].replace('@', '')).then((user) => {
                    const { biography, subscribersCount, subscribtions, postsCount, fullName, username, profilePicHD, isPrivate, isVerified, posts } = user
                    const priv_ = isPrivate ? "✅" : "❌"
                    const verif_ = isVerified ? "✅" : "❌"
                    let isi_post = ``
                    for (let i = 0; i < user.posts.length; i++) {
                         const vid_post_ = user.posts[i].isVideo ? "✅" : "❌"
                         isi_post += `
================================
Capt : ${user.posts[i].caption}
Url : ${user.posts[i].url}
Timestamp : ${new Date(user.posts[i].timestamp * 1000)}
Video : ${vid_post_}
                         `
                    }
                    const swtich_ = isPrivate ? "Mohon maaf akun ini private" : isi_post
                    const captuserig = `➣ *Nama* : ${fullName}
➣ *Username* : ${username}
➣ *Terverifikasi* : ${verif_}
➣ *Akun Private* : ${priv_}
➣ *Jumlah Followers* : ${subscribersCount}
➣ *Jumlah Following* : ${subscribtions}
➣ *Jumlah Postingan* : ${postsCount}
➣ *Biodata* : ${biography}
➣ *Post* : ${swtich_ ? swtich_ : '-'}
               `
                    sendDariUrl(from, profilePicHD, TypePsn.image, captuserig)
               })
          } else if (cmd == `${prf}tts`) {
               if (args.length === 1) {
                    balas(from, `Masukan Kode Negara dan teks!\n\nContoh : *!tts id Halo\n\nUntuk melihat kode negara lainnya silahkan ketik *!listkodebahasa*`)
                    return
               } else if (args.length === 2) {
                    balas(from, `Masukan teksnya! atau tag pesan yg sudah ada.`)
                    return
               }
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               try {
                    const gtts = require('node-gtts')(args[1]);
                    gtts.save(`./media/tts/${filename}.wav`, body.slice(8), function () {
                         exec(`ffmpeg -i ./media/tts/${filename}.wav ./media/tts/${filename}.mp3`, (err, stdout, stderr) => {
                              if (err) throw new TypeError(err)
                              const buff = fs.readFileSync(`./media/tts/${filename}.mp3`)
                              conn.sendMessage(from, buff, TypePsn.audio, { mimetype: Mimetype.mp4Audio, ptt: true, quoted: hurtz })
                              fs.unlinkSync(`./media/tts/${filename}.wav`)
                              fs.unlinkSync(`./media/tts/${filename}.mp3`)
                         })
                    })
               } catch (e) {
                    console.log(e)
                    balas(from, `Terdapat kesalahan! mungkin data bahasa salah. silahkan ketik *!listkodebahasa* untuk melihat kode bahasa.\n\nFormat : *!tts <kodebhs> <teks>*\nContoh : *!tts id Halo kamu*`)
               }
          } else if (cmd == `${prf}listkodebahasa`) {
               balas(from, kode)
          } else if (cmd == `${prf}jadwaltv`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!jadwaltv <Channel>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const channelna = query
               let stasiun = [
                    "rcti",
                    "nettv",
                    "antv",
                    "gtv",
                    "indosiar",
                    "inewstv",
                    "kompastv",
                    "metrotv",
                    "mnctv",
                    "rtv",
                    "sctv",
                    "trans7",
                    "transtv",
                    "tvone",
                    "tvri"
               ]
               let isist = `*Channel yang tersedia* :\n\n`
               for (let i = 0; i < stasiun.length; i++) {
                    isist += `➣  ${stasiun[i]}\n`
               }
               try {

                    // const tv_switch = stasiun[0]
                    Axios.get('https://www.jadwaltv.net/channel/' + channelna)
                         .then(({ data }) => {
                              const $ = cheerio.load(data)
                              let isitable1 = []
                              let isitable2 = []
                              $('div > div > table:nth-child(3) > tbody > tr').each(function (i, result) {
                                   isitable1.push({
                                        jam: result.children[0].children[0].data,
                                        tayang: result.children[1].children[0].data
                                   })
                              })
                              // console.log(isitable1)
                              $('div > div > table:nth-child(5) > tbody > tr').each(function (i, result) {
                                   isitable2.push({
                                        jam: result.children[0].children[0].data,
                                        tayang: result.children[1].children[0].data
                                   })
                              })
                              const semuatable = []

                              for (let i = 0; i < isitable1.length; i++) {
                                   semuatable.push(isitable1[i])
                              }
                              for (let i = 0; i < isitable2.length; i++) {
                                   semuatable.push(isitable2[i])
                              }
                              // console.log(semuatable)
                              let daftartay = `*Menampilkan daftar tayang channel ${channelna}*\n\n`
                              for (let i = 0; i < semuatable.length; i++) {
                                   daftartay += `${semuatable[i].jam}  ${semuatable[i].tayang}\n`
                              }
                              balas(from, daftartay)
                              // console.log(semuatable)
                         })
                         .catch((e) => {
                              balas(from, isist)
                              // console.log(e)
                         })
               } catch (e) {
                    balas(from, isist)
                    console.log(e)
               }
          } else if (cmd == `${prf}fb` || cmd == `${prf}facebook`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!facebook <https://linkfacebook>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               waiter()
               fbdl(args[1])
                    .then((res) => {
                         remote(res.download[0], (e, o) => {
                              Axios.get(`https://tinyurl.com/api-create.php?url=${res.download.length > 1 ? res.download[1] : res.download[0]}`)
                                   .then((a) => {
                                        const size = getFilesizeFromBytes(o)
                                        let captions = `*Data Berhasil didapatkan*

*Title* : ${res.title}
*Ext* : MP4
*Filesize* : ${size}
${Number(o) > 100000000 ? '*Link Download* : ' + a.data + '\n\n\n_Untuk video melebihi batas size disajikan dalam bentuk link._' : ''}`
                                        // console.log(o)
                                        if (Number(o) < 100000000) {
                                             sendDariUrl(from, res.download[0], TypePsn.video, captions)
                                        } else {
                                             balas(from, captions)
                                        }
                                   })
                         })
                    })
                    .catch(e => {
                         console.log(e)
                         balas(from, `Terdapat kesalahan! mungkin video private atau link tidak valid.`)
                    })
          } else if (cmd == `${prf}twitter` || cmd == `${prf}tt`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!twitter <https://linktwitter>*`)
               waiter()
               ttdl(args[1])
                    .then(res => {
                         // console.log(res)
                         let captions = `*Data Berhasil didapatkan*
                    
*Title* : ${res.title}
*Capt* : ${res.quote}`
                         sendDariUrl(from, res.download, TypePsn.video, captions)
                    })
                    .catch(e => {
                         console.log(e)
                         balas(from, `Terdapat kesalahan saat mengambil data video! mungkin url tidak valid.`)
                    })
          } else if (cmd == `${prf}advancedglow`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!advancedglow textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               advancedglow(body.slice(14))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}futuristic`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!futuristic textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               futuristic(body.slice(12))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}cloud`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!cloud textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               cloud(body.slice(7))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}blackpink`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!blackpink textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               blackpink(body.slice(11))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}sand`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!sand textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               sand(body.slice(6))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}scifi`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!scifi textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               scifi(body.slice(7))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}dropwater`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!dropwater textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               dropwater(body.slice(11))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}codmw`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!codmw textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               codmw(body.slice(7))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}bokeh`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!bokeh textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               bokeh(body.slice(7))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}neon`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!neon textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               neon(body.slice(6))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}thunder`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!thunder textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               thunder(body.slice(9))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}horrorblood`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!horrorblood textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               horrorblood(body.slice(13))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}firework`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!firework textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               firework(body.slice(10))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}bloodglass`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!bloodglass textnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               bloodglass(body.slice(12))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}marvel`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!marvel textnya|text kedua*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const textsec = body.split('|')[1] || 'MECHA'
               marvel(body.slice(8).split('|')[0], textsec)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}phub`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!phub textnya|text kedua*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const textsec = body.split('|')[1] || 'MECHA'
               phub(body.slice(6).split('|')[0], textsec)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}glitch`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!glitch textnya|text kedua*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const textsec = body.split('|')[1] || 'MECHA'
               glitch(body.slice(8).split('|')[0], textsec)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}rain`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               rain(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}sea`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!sea <textnya>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               sea(query)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}neon`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!neon <textnya>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               neon(query)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}stars`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!stars <textnya>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               stars(query)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}wood`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!wood <textnya>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               wood(query)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}darklogo`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!darklogo <textnya>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               darklogo(query)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}brokecard`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               brokeCard(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}nightsea`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               nightsea(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}photoglitch`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               photoglitch(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}anaglyph`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               anaglyph(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}balloon`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               balloon(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}typographic`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               typographic(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}photosky`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               photosky(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}wanted`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (args.length !== 2) return balas(from, `Penggunaan *!wanted <Nama|Harga>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               wanted(savedFilename, query.split('|')[0], query.split('|')[1])
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}fireworkvideo`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               fireworkvideo(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.video, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}cooldesign`) {
               if (args.length === 1) return balas(from, `Penggunaan *!cooldesign <text>* (Sambil tag gambar)`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               cooldesign(query)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.video, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}colorfuldesign`) {
               if (args.length === 1) return balas(from, `Penggunaan *!colorfuldesign <text> (Sambil tag gambar)xt>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               colorfuldesign(query)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.video, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}armydesign`) {
               if (args.length === 1) return balas(from, `Penggunaan *!armydesign <text>* (Sambil tag gambar)`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               armydesign(query)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.video, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}iphone`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               iphone(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}underwater`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               underwater(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}drawing`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               drawing(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}burningfire`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               burningFire(savedFilename)
                    .then((rest) => {
                         gif2mp4Url(rest.result)
                              .then(re => {
                                   sendDariUrl(from, re.result, TypePsn.video, `Dah jadi ni ${pushname}`, { mimetype: Mimetype.gif })
                              }).catch(e => console.log(e))
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}smoke`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!smoke teksnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               semok(body.slice(7))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}harrypotter`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!harrypotter teksnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               harryPotter(body.slice(13))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}horrorhouse`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!horrorhouse teksnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               horrorHouse(body.slice(13))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}coffee`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!coffee teksnya*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               coffee(body.slice(8))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}battlefield`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!battlefield teks1|teks2*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               battlefield(body.slice(13).split('|')[0], body.split('|')[1])
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}googlekeyword`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!googleKeyword teks1|teks2|teks3*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               googleKeyword(body.slice(15).split('|')[0], body.split('|')[1], body.split('|')[2])
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}heroml`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!herodetail* <nama hero>\nContoh : *!herodetail miya*`)
               herodetail(query)
                    .then((ress) => {
                         const res = ress.result
                         let capt = `*Hero Mobile Legends Details*

*Nama* : ${res.hero_name}
*Role* : ${res.role}
*Quotes* : ${res.entrance_quotes}
*Fitur Hero* : ${res.hero_feature}
*Spesial* : ${res.speciality}
*Rekomendasi Lane* : ${res.laning_recommendation}
*Harga* : ${res.price.battle_point} (Battle point) | ${res.price.diamond} (Diamond) | ${res.price.hero_fragment} (Hero Fragment)
*Tahun Rilis* : ${res.release_date}
*Skill* : 
*Durability* : ${res.skill.durability}
*Offence* : ${res.skill.offense}
*Skill Effect* : ${res.skill_effects}
*Difficulty* : ${res.skill.difficulty}
     
*Movement Speed* : ${res.attributes.movement_speed}
*Physical Attack* : ${res.attributes.physical_attack}
*Magic Defense* : ${res.attributes.magic_defense}
*Ability Crit Rate* : ${res.attributes.ability_crit_rate}
*HP* : ${res.attributes.hp}
*Mana* : ${res.attributes.mana}
*Mana Regen* : ${res.attributes.mana_regen}
*Story* : ${res.background_story}
`
                         sendDariUrl(from, res.image.split('/revision')[0], TypePsn.image, capt)
                    })
                    .catch((e) => {
                         console.log(e)
                         balas(from, `Maaf terdapat kesalahan!`)
                    })
          } else if (cmd == `${prf}herolist`) {
               herolist()
                    .then((res) => {
                         // console.log(res)
                         let captions = '*Menampilkan list hero mobile legends*\n\n'
                         for (let i = 1; i < res.result.length; i++) {
                              captions += `${i}. ${res.result[i]}\n`
                         }
                         balas(from, captions)
                    })
                    .catch((e) => {
                         console.log(e)
                         balas(from, `Maaf terdapat kesalahan!`)
                    })
          } else if (cmd == `${prf}owner`) {
               const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
                    + 'VERSION:3.0\n'
                    + 'FN:MRHRTZ@kali:~#\n' // full name
                    + 'ORG:MechaBOT Owner;\n' // the organization of the contact
                    + 'TEL;type=CELL;type=VOICE;waid=6285559038021:+62 855 5903 8021\n' // WhatsApp ID + phone number
                    + 'END:VCARD'
               await conn.sendMessage(from, { displayname: "Jeff", vcard: vcard }, MessageType.contact)
          } else if (cmd == `${prf}upstory`) {
               if (!isOwner) return balas(from, `Owner Only!`)
               if (args.length === 1) return balas(from, `Perintah !upstory <text/image/video> <caption>`)
               if (args[1] == 'txt') {
                    const snaptext = `${query}`
                    conn.sendMessage('status@broadcast', snaptext, TypePsn.text)
                    balas(from, 'Berhasil Upstory Text!')
               } else if (args[1] == `doc`) {
                    const captImg = `${query}`
                    const docsender = await conn.downloadAndSaveMediaMessage(mediaData, `./media/${filename}`);
                    // await conn.sendMessage('status@broadcast', fs.readFileSync(docsender), TypePsn.image, { caption: captImg })
                    await conn.sendMessage('status@broadcast', fs.readFileSync(docsender), TypePsn.document, { mimetype: 'application/octet-stream' })
                    balas(from, 'Berhasil Upstory Document!')
                    fs.unlinkSync(docsender)
               } else if (args[1] == `stk`) {
                    const captImg = `${query}`
                    const stksender = await conn.downloadAndSaveMediaMessage(mediaData, `./media/${filename}`);
                    // await conn.sendMessage('status@broadcast', fs.readFileSync(stksender), TypePsn.image, { caption: captImg })
                    await conn.sendMessage('status@broadcast', fs.readFileSync(stksender), TypePsn.sticker)
                    balas(from, 'Berhasil Upstory Sticker!')
                    fs.unlinkSync(stksender)
               } else if (args[1] == `img`) {
                    const captImg = `${query}`
                    const snapFileImg = await conn.downloadAndSaveMediaMessage(mediaData, `./media/${filename}`);
                    await conn.sendMessage('status@broadcast', fs.readFileSync(snapFileImg), TypePsn.image, { caption: captImg })
                    balas(from, 'Berhasil Upstory Image!')
                    fs.unlinkSync(snapFileImg)
               } else if (args[1] == `vid`) {
                    const captVid = `${query}`
                    const durasiSwVid = mediaData.message.videoMessage.seconds
                    if (durasiSwVid > 30) return reply(from, 'Durasi Maksimal 30 Detik!')
                    balas(from, 'Uploading...')
                    const snapFileVid = await conn.downloadAndSaveMediaMessage(mediaData, `./media/${filename}`);
                    await conn.sendMessage('status@broadcast', fs.readFileSync(snapFileVid), TypePsn.video, { mimetype: Mimetype.mp4, caption: captVid })
                    balas(from, 'Berhasil Upstory Video!')
                    fs.unlinkSync(snapFileVid)
               }
          } else if (cmd == `${prf}savekontak`) {
               if (!isOwner) return balas(from, `❌ Hanya untuk Owner/Pemilik Bot ❌`)
               if (args.length === 1) return balas(from, `Penggunaan *!savekontak <nama|nomer>*`)
               const namakontak = query.split('|')[0]
               const tagetnomer = query.split('|')[1]
               const nomerhp = tagetnomer.includes('@') ? tagetnomer.replace('@', '') : tagetnomer.replace(noSym, '')
               addContact(`adb connect 192.168.1.109:5555; adb shell am start -a android.intent.action.INSERT -t vnd.android.cursor.dir/contact -e name '${namakontak}' -e phone ${nomerhp}; adb shell input keyevent 5; adb shell am force-stop com.android.contacts`, (err, stdout, stderr) => {
                    balas(from, `[ ✅ ] Berhasil save kontak dengan nama : ${namakontak}`)
                    const kontak = 'BEGIN:VCARD\n' // metadata of the contact card
                         + 'VERSION:3.0\n'
                         + 'FN:' + namakontak + '\n' // full name
                         //+ 'ORG:Ashoka Uni;\n' // the organization of the contact
                         + 'TEL;type=CELL;type=VOICE;waid=' + nomerhp + ':+' + nomerhp + '\n' // WhatsApp ID + phone number
                         + 'END:VCARD'
                    conn.sendMessage(from, { displayName: namakontak, vcard: kontak }, TypePsn.contact)
               })
          } else if (cmd == `${prf}gtav`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               gtaV(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (args[0].toLowerCase() == `votestart` || args[0].toLowerCase() == `startvote`) {
               if (args.length < 3) return conn.sendMessage(from, `Penggunaan : *votestart <@tagMember> <Alasan>*\nContoh : votestart @6285559038021 maenin bot`, TypePsn.text, { contextInfo: { mentionedJid: ['6285559038021@s.whatsapp.net'] }, quoted: hurtz })
               const filepathvote = `${from}.json`
               const pathdb = './lib/database/vote'
               if (fs.existsSync(pathdb + '/' + filepathvote)) return balas(from, `Sesi voting telah aktif digrup ini sebelumnya!`)
               let listed = []
               const expiredvote = moment().add(Number(settings.Vote.Expired), 'minutes').unix()
               const seeData = fs.readdirSync(pathdb)
               for (let i in seeData) {
                    listed.push(seeData[i].replace('.json', ''))
               }
               if (!listed.includes(from)) {
                    const objekvote = {
                         status: true,
                         creator: pushname,
                         id_creator: sender,
                         expired_on: expiredvote,
                         target: args[1],
                         reason: args.slice(2).join(' '),
                         pushvote: []
                    }
                    fs.writeFile(pathdb + '/' + filepathvote, JSON.stringify(objekvote, null, 2), (e) => {
                         if (e) return console.log(e)
                         conn.sendMessage(from, `*Memulai voting!*\n\nMax Vote : ${settings.Vote.Max} Orang\nTarget : ${args[1]}\nAlasan : ${args.slice(2).join(' ')}\nExpired time : ${settings.Vote.Expired} menit\n\n_Note : Max vote dan expired time bisa disetting dengan ketik *votesetting*_\n\nAnda bisa vote dengan ketik *vote* atau *devote*\n\n\n\n\`\`\`Menunggu respon... :)\`\`\``, TypePsn.text, { contextInfo: { mentionedJid: [args[1].replace('@', '') + '@s.whatsapp.net'] }, quoted: hurtz })
                    })
               }
          } else if (args[0].toLowerCase() == `votesetting` || args[0].toLowerCase() == `votesettings`) {
               if (args.length === 1) return balas(from, `Penggunaan : *votesetting <max vote>|<waktu expired>*\nContoh : *votesetting 10|1*\n\n_Note : Waktu expired dalam satuan menit!_`)
               settings.Vote.Max = Number(query.split('|')[0])
               settings.Vote.Expired = Number(query.split('|')[1])
               fs.writeFile('./src/settings.json', JSON.stringify(settings, null, 2), (e) => {
                    if (e) return balas(from, `Gagal save data!`)
                    balas(from, `Pengaturan vote telah diupdate ✅`)
               })
          } else if (args[0].toLowerCase() == `vote`) {
               const filepathvote = `${from}.json`
               const pathdb = './lib/database/vote'
               let listed = []
               const seeData = fs.readdirSync(pathdb)
               for (let i in seeData) {
                    listed.push(seeData[i].replace('.json', ''))
               }
               if (!listed.includes(from)) {
                    balas(from, `Mau vote apa om? ketik dulu *votestart* untuk lihat penggunaanya.`)
               } else {
                    let db_vote = JSON.parse(fs.readFileSync(pathdb + '/' + filepathvote))
                    for (let numvote of db_vote.pushvote) {
                         if (numvote.number == sender) return balas(from, `Kamu telah vote untuk sesi ini ❌`)
                    }
                    if (db_vote.pushvote.length === Number(settings.Vote.Max)) {
                         let posi = []
                         let nega = []
                         for (let data of db_vote.pushvote) {
                              if (data.purpose == '✅') {
                                   posi.push(data.name)
                              } else if (data.purpose == '❌') {
                                   nega.push(data.name)
                              }
                         }
                         if (posi.length >= nega.length) {
                              conn.sendMessage(from, `Voting diterima ✅\n\nJumlah voting : ${posi.length}\nJumlah devoting : ${nega.length}\n\n*${db_vote.target} ${db_vote.reason}!*`, TypePsn.text, { quoted: hurtz, contextInfo: { mentionedJid: [db_vote.target.replace('@', '') + '@s.whatsapp.net'] } })
                              fs.unlinkSync(pathdb + '/' + filepathvote)
                         } else if (posi.length <= nega.length) {
                              conn.sendMessage(from, `Voting ditolak ❌\n\nJumlah voting : ${posi.length}\nJumlah devoting : ${nega.length}\n\n`, TypePsn.text, { quoted: hurtz })
                              fs.unlinkSync(pathdb + '/' + filepathvote)
                         }
                         return
                    }
                    db_vote.expired_on = moment().add(Number(settings.Vote.Expired), 'minutes').unix()
                    db_vote.pushvote.push({
                         name: pushname,
                         number: sender,
                         purpose: "✅"
                    })
                    fs.writeFile(pathdb + '/' + filepathvote, JSON.stringify(db_vote, null, 2), (e) => {
                         if (e) return console.log(e)
                         let caption_vote = ''
                         for (let i = 0; i < db_vote.pushvote.length; i++) {
                              caption_vote += `${1 + i}. ${db_vote.pushvote[i].name} ${db_vote.pushvote[i].purpose}\n`
                         }
                         conn.sendMessage(from, `*Sedang dalam sesi voting*\n\nMax Vote : ${settings.Vote.Max} Orang\nAlasan : ${db_vote.reason}\nTarget : ${db_vote.target}\nExpired time : ${settings.Vote.Expired} menit\n\n${caption_vote}\n\n\n\n\`\`\`Menunggu respon... :)\`\`\``, TypePsn.text, { quoted: hurtz, contextInfo: { mentionedJid: [db_vote.target.replace('@', '') + '@s.whatsapp.net'] } })
                    })
               }
          } else if (args[0].toLowerCase() == `devote`) {
               const filepathvote = `${from}.json`
               const pathdb = './lib/database/vote'
               let listed = []
               const seeData = fs.readdirSync(pathdb)
               for (let i in seeData) {
                    listed.push(seeData[i].replace('.json', ''))
               }
               if (!listed.includes(from)) {
                    balas(from, `Mau vote apa om? ketik dulu *votestart* untuk lihat penggunaanya.`)
               } else {
                    let db_vote = JSON.parse(fs.readFileSync(pathdb + '/' + filepathvote))
                    for (let numvote of db_vote.pushvote) {
                         if (numvote.number == sender) return balas(from, `Kamu telah vote untuk sesi ini ❌`)
                    }
                    if (db_vote.pushvote.length === Number(settings.Vote.Max)) {
                         let posi = []
                         let nega = []
                         for (let data of db_vote.pushvote) {
                              if (data.purpose == '✅') {
                                   posi.push(data.name)
                              } else if (data.purpose == '❌') {
                                   nega.push(data.name)
                              }
                         }
                         if (posi.length >= nega.length) {
                              conn.sendMessage(from, `Voting diterima ✅\n\nJumlah voting : ${posi.length}\nJumlah devoting : ${nega.length}\n\n*${db_vote.target} ${db_vote.reason}!*`, TypePsn.text, { quoted: hurtz, contextInfo: { mentionedJid: [db_vote.target.replace('@', '') + '@s.whatsapp.net'] } })
                              fs.unlinkSync(pathdb + '/' + filepathvote)
                         } else if (posi.length <= nega.length) {
                              conn.sendMessage(from, `Voting ditolak ❌\n\nJumlah voting : ${posi.length}\nJumlah devoting : ${nega.length}`, TypePsn.text, { quoted: hurtz })
                              fs.unlinkSync(pathdb + '/' + filepathvote)
                         }
                         return
                    }
                    db_vote.expired_on = moment().add(Number(settings.Vote.Expired), 'minutes').unix()
                    db_vote.pushvote.push({
                         name: pushname,
                         number: sender,
                         purpose: "❌"
                    })
                    fs.writeFile(pathdb + '/' + filepathvote, JSON.stringify(db_vote, null, 2), (e) => {
                         if (e) return console.log(e)
                         let caption_vote = ''
                         for (let i = 0; i < db_vote.pushvote.length; i++) {
                              caption_vote += `${1 + i}. ${db_vote.pushvote[i].name} ${db_vote.pushvote[i].purpose}\n`
                         }
                         conn.sendMessage(from, `*Sedang dalam sesi voting*\n\nMax Vote : ${settings.Vote.Max} Orang\nAlasan : ${db_vote.reason}\nTarget : ${db_vote.target}\nExpired time : ${settings.Vote.Expired} menit\n\n${caption_vote}\n\n\n\n\`\`\`Menunggu respon... :)\`\`\``, TypePsn.text, { quoted: hurtz, contextInfo: { mentionedJid: [db_vote.target.replace('@', '') + '@s.whatsapp.net'] } })
                    })
               }
          } else if (args[0].toLowerCase() == `votelist` || args[0].toLowerCase() == `listvote`) {
               const filepathvote = `${from}.json`
               const pathdb = './lib/database/vote'
               let listed = []
               const seeData = fs.readdirSync(pathdb)
               for (let i in seeData) {
                    listed.push(seeData[i].replace('.json', ''))
               }
               if (!listed.includes(from)) {
                    balas(from, `Tidak bisa menampilkan list vote karena tidak ada sesi vote!`)
               } else {
                    let db_vote = JSON.parse(fs.readFileSync(pathdb + '/' + filepathvote))
                    let caption_vote = ''
                    for (let i = 0; i < db_vote.pushvote.length; i++) {
                         caption_vote += `${1 + i}. ${db_vote.pushvote[i].name} ${db_vote.pushvote[i].purpose}\n`
                    }
                    conn.sendMessage(from, `*Sedang dalam sesi voting*\n\nMax Vote : ${settings.Vote.Max} Orang\nAlasan : ${db_vote.reason}\nTarget : ${db_vote.target}\nExpired time : ${settings.Vote.Expired} menit\n\n${caption_vote}\n\n\n\n\`\`\`Menunggu respon... :)\`\`\``, TypePsn.text, { quoted: hurtz, contextInfo: { mentionedJid: [db_vote.target.replace('@', '') + '@s.whatsapp.net'] } })
               }
          } else if (cmd == `${prf}charalist` || cmd == `${prf}charlist` || cmd == `${prf}listchara`) {
               let outlistchar = `*Melihat semua chara di database*\n\n`
               for (var i = 0; i < charlist.length; i++) {
                    outlistchar += `➣  ${charlist[i].full_name}\n`
               }
               balas(from, outlistchar)
          } else if (cmd == `${prf}charaguess`) {
               if (args[1] == 'start') {
                    if (isCharsesi) {
                         balas(from, `This group was enabled the chara game before!`)
                    } else {
                         charasession.push(from)
                         fs.writeFileSync('./lib/charasession.json', JSON.stringify(charasession, null, 2))
                         balas(from, 'Chara game was enable in this group! will send randomly after 15 message and you should guess that.')
                    }
               }
          } else if (cmd == `${prf}addchara`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!adchara <nama karakter>*\nContoh : *!addchara naruto*`)
               const qChar = body.slice(10)
               await charaCheck(qChar)
                    .then((ress) => {
                         let isCharaAva = ''
                         for (var i = 0; i < charlist.length; i++) {
                              if (charlist[i].full_name === ress.name) {
                                   isCharaAva += 'true'
                              } else {

                              }
                         }
                         if (isCharaAva === 'true') {
                              balas(from, `Sorry chara ${qChar} has been added to database!`)
                         } else {
                              charlist.push({
                                   full_name: ress.name,
                                   keyword: qChar
                              })
                              fs.writeFileSync('./lib/charlist.json', JSON.stringify(charlist, null, 2))
                              balas(from, ress.message)
                         }
                    })
                    .catch(e => {
                         balas(from, e.message)
                    })
          } else if (cmd == `${prf}gallery`) {
               const fsGaleryOne = fs.readdirSync('./lib/chara_galery')
               const isExistGalery = fsGaleryOne.includes(sender + '.json') ? true : false
               const mentionedgalr = args[1] ? args[1] : false
               if (!isExistGalery) {
                    await conn.getProfilePicture(sender)
                         .then((prop) => {
                              if (prop == '' || prop == undefined) {
                                   const urlgalr = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
                                   sendDariUrl(from, urlgalr, TypePsn.image, `Tidak bisa menampilkan karena anda belum pernah claim!`)
                              } else {
                                   sendDariUrl(from, prop, TypePsn.image, `Tidak bisa menampilkan karena anda belum pernah claim!`)
                              }
                         })
               } else if (mentionedgalr && !fsGaleryOne.includes(mentionedgalr + '.json')) {
                    const userGallery = mentionedgalr.replace('@', '')
                    if (!fsGaleryOne.includes(userGallery + '.json')) {
                         await conn.getProfilePicture(args[1])
                              .then((prop) => {
                                   sendDariUrl(from, prop, TypePsn.image, `Tidak bisa menampilkan karena anda belum pernah claim!`)
                              })
                              .catch((e) => {
                                   const urlgalr = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
                                   sendDariUrl(from, urlgalr, TypePsn.image, `Tidak bisa menampilkan karena anda belum pernah claim!`)
                                   ERRLOG(e)
                              })
                    }
               } else if (mentionedgalr) {
                    const showGaleryOne = JSON.parse(fs.readFileSync('./lib/chara_galery/' + mentionedgalr + '.json'))
                    function remDup(data, key) {
                         return [
                              ...new Map(
                                   data.map(x => [key(x), x])
                              ).values()
                         ]
                    }
                    showGaleryOne.animes = remDup(showGalery.animes, it => it.url)
                    fs.writeFileSync('./lib/chara_galery/' + mentionedgalr + '.json', JSON.stringify(showGaleryOne, null, 2))
                    let GaleryCoreOne = `*Menampilkan Galeri Anime ${showGaleryOne.name}*

*Total Karakter Terclaim* : ${showGaleryOne.animes.length} Karakter

*Terakhir karakter terklaim* :
➣ *Nama* : ${showGaleryOne.animes[showGaleryOne.animes.length - 1].name}
➣ *ID* : ${showGaleryOne.animes[showGaleryOne.animes.length - 1].url.replace('https://myanimelist.net/character/', '').split('/')[0]}
➣ *Deskripsi* : ${showGaleryOne.animes[showGaleryOne.animes.length - 1].full_desc.replace('\n', '').split(' ').slice(0, 15).join(' ') + ' ...'}

                    `
                    for (var i = 0; i < showGaleryOne.animes.length; i++) {
                         GaleryCoreOne += `
________________________________________

➣ *Nama* : ${showGaleryOne.animes[i].name}
➣ *ID* : ${showGaleryOne.animes[i].url.replace('https://myanimelist.net/character/', '').split('/')[0]}
➣ *Deskripsi* : ${showGaleryOne.animes[i].full_desc.replace('\n', '').split(' ').slice(0, 15).join(' ') + ' ...'}

`
                    }

                    sendDariUrl(from, showGaleryOne.animes[showGaleryOne.animes.length - 1].image[0], TypePsn.image, `${GaleryCoreOne}`)

               } else {
                    const showGalery = JSON.parse(fs.readFileSync('./lib/chara_galery/' + sender + '.json'))
                    function remDup(data, key) {
                         return [
                              ...new Map(
                                   data.map(x => [key(x), x])
                              ).values()
                         ]
                    }
                    showGalery.animes = remDup(showGalery.animes, it => it.url)
                    fs.writeFileSync('./lib/chara_galery/' + sender + '.json', JSON.stringify(showGalery, null, 2))
                    // console.log(outputList);
                    // balas(from, util.format())
                    // return
                    let GaleryCore = `*Show Galery Chara Anime ${showGalery.name}*

*Total Karakter Terklaim* : ${showGalery.animes.length} character

*Terakhir karakter terklaim* :
➣ *Nama* : ${showGalery.animes[showGalery.animes.length - 1].name}
➣ *ID* : ${showGalery.animes[showGalery.animes.length - 1].url.replace('https://myanimelist.net/character/', '').split('/')[0]}
➣ *Deskripsi* : ${showGalery.animes[showGalery.animes.length - 1].full_desc.replace('\n', '').split(' ').slice(0, 15).join(' ') + ' ...'}

                    `
                    for (var i = 0; i < showGalery.animes.length; i++) {
                         GaleryCore += `
________________________________________

➣ *Nama* : ${showGalery.animes[i].name}
➣ *ID* : ${showGalery.animes[i].url.replace('https://myanimelist.net/character/', '').split('/')[0]}
➣ *Deskripsi* : ${showGalery.animes[i].full_desc.replace('\n', '').split(' ').slice(0, 15).join(' ') + ' ...'}

`
                    }

                    sendDariUrl(from, showGalery.animes[showGalery.animes.length - 1].image[0], TypePsn.image, `${GaleryCore}`)

               }
          } else if (cmd == `${prf}guess`) {
               if (args.length === 1) return balas(from, `Gunakan perintah:\n*!guess <Nama character>*\nContoh: *!guess naruto*`)
               const read_carg = fs.readdirSync('./lib/chara_galery')
               const galeryPath = './lib/chara_galery/' + sender + '.json'
               const detectNumChar = read_carg.includes(sender + '.json') ? true : false
               const buffGalery = detectNumChar ? JSON.parse(fs.readFileSync(galeryPath)) : ''
               // console.log('hes')
               try {
                    let stringCorrect = ``
                    const charbuffSplited = buffChara.chara_name.split(' ')
                    for (var i = 0; i < charbuffSplited.length; i++) {
                         stringCorrect += `${charbuffSplited[i]}|`
                    }
                    const correctChat = new RegExp(stringCorrect.slice(0, -1), 'gi')
                    if (buffChara.claimed_by_sender.length > 0) return await conn.sendMessage(from, `Karakter ini telah diklaim oleh ${pushname}\n\nKetik 15 pesan kedepan untuk send random chara!`, TypePsn.text)
                    if (buffChara.status !== 'active') return conn.sendMessage(from, `Kamu tidak bisa claim karna chara game belum diaktifkan\n\nKetik : *!charagame aktif* untuk mengaktifkannya!`, TypePsn.text)
                    if (!correctChat.test(query)) return conn.sendMessage(from, `Kayanya salah deh, dan coba juga gunakan nama terakhir jika nama awal karakter.`, TypePsn.text)
                    if (!detectNumChar) {
                         if (buffGalery.status !== 'active' && fs.existsSync('./lib/chara_galery/' + sender + '.json')) return balas(from, `Claim hanya sekali!`)
                         const galery_obj = {
                              status: 'active',
                              sender: sender,
                              name: pushname,
                              animes: []
                         }
                         fs.writeFileSync(galeryPath, JSON.stringify(galery_obj, null, 2), (e) => {
                              if (e) {
                                   console.log(e)
                                   return
                              }
                              const buffChara = JSON.parse(fs.readFileSync('./lib/chara/' + from + '.json'))
                              const buffGalery = JSON.parse(fs.readFileSync('./lib/chara_galery/' + sender + '.json'))
                              buffGalery.animes.push(buffChara.anime_result)
                              fs.writeFile(galeryPath, JSON.stringify(buffGalery, null, 2), (e) => {
                                   if (e) {
                                        console.log(e)
                                        return
                                   }
                                   const buffGalery = JSON.parse(fs.readFileSync('./lib/chara_galery/' + sender + '.json'))
                                   const buffChara = JSON.parse(fs.readFileSync('./lib/chara/' + from + '.json'))
                                   buffChara.claimed_by_name.push(pushname)
                                   buffChara.claimed_by_sender.push(sender)
                                   buffChara.claimed_keyword.push(body.slice(7))
                                   fs.writeFileSync('./lib/chara/' + from + '.json', JSON.stringify(buffChara, null, 2))
                                   let outGalery = `*Karakter telah ditemukan untuk pertama kali klaim ${pushname}*\n\n`
                                   outGalery += `________________________________________

➣ *Nama* : ${buffChara.anime_result.name}
➣ *Deskripsi* : ${buffChara.anime_result.full_desc}
➣ *Link Detail* : ${buffChara.anime_result.url}`
                                   if (false) {
                                        balas(from, `You must claim some chara to display galery!`)
                                   } else {
                                        sendDariUrl(from, buffChara.anime_result.image[0], TypePsn.image, outGalery)
                                   }
                                   buffGalery.status = 'unactive'
                                   buffChara.claimed_by_name.push(pushname)
                                   buffChara.claimed_by_sender.push(sender)
                                   buffChara.claimed_keyword.push(body.slice(7))
                                   buffGalery.status = 'unactive'
                                   fs.writeFileSync(CharaPath, JSON.stringify(buffChara, null, 2))
                                   fs.writeFileSync(galeryPath, JSON.stringify(buffGalery, null, 2))
                              })
                         })
                    } else {
                         if (buffGalery.status !== 'active') return balas(from, `Double claim not allowed!`)
                         buffGalery.animes.push(buffChara.anime_result)
                         fs.writeFile(galeryPath, JSON.stringify(buffGalery, null, 2), (e) => {
                              if (e) {
                                   console.log(e)
                                   return

                              } //.then(() => {
                              const buffGalery = JSON.parse(fs.readFileSync('./lib/chara_galery/' + sender + '.json'))
                              const buffChara = JSON.parse(fs.readFileSync('./lib/chara/' + from + '.json'))
                              let outGalery = `*Selamat karakter benar ${pushname}!*\n\n`
                              outGalery += `________________________________________

➣ *Nama* : ${buffChara.anime_result.name}
➣ *Deskripsi* : ${buffChara.anime_result.full_desc}
➣ *Link Detail* : ${buffChara.anime_result.url}

`
                              if (false) {
                                   balas(from, `You must claim some chara to display galery!`)
                              } else {
                                   sendDariUrl(from, buffChara.anime_result.image[0], TypePsn.image, outGalery)
                              }

                              buffChara.claimed_by_name.push(pushname)
                              buffChara.claimed_by_sender.push(sender)
                              buffChara.claimed_keyword.push(correctChat)
                              buffGalery.status = 'unactive'
                              fs.writeFileSync(CharaPath, JSON.stringify(buffChara, null, 2))
                              fs.writeFileSync(galeryPath, JSON.stringify(buffGalery, null, 2))
                         })
                         //})
                    }
               } catch (e) {
                    console.log(e)
                    balas(from, `${e}`)
               }
          } else if (cmd == `${prf}charagame`) {
               if (args.length === 1) return balas(from, `Penggunaan : !charagame <aktif/mati>`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 5)
               try {
                    if (args[1] == 'enable' || args[1] == 'aktif') {
                         if (buffChara.status === 'active') return balas(from, `Permainan ini telah diaktifkan sebelumnya, silahkan tunggu 15 pesan kedepan..`)
                         const charDirObj = {
                              status: 'active',
                              claimed_keyword: [],
                              claimed_by_name: [],
                              claimed_by_sender: [],
                              anime_result: '',
                              chara_name: '',
                              groupId: chat.id,
                              msgID: [],
                              messages: []
                         }
                         fs.writeFile(CharaPath, JSON.stringify(charDirObj, null, 2), (e) => {
                              if (e) {
                                   console.log(e)
                                   return
                              }
                              balas(from, `Charagame telah diaktifkan do grup ini ✅\n\nBot akan mengirimkan random karakter setelah 15 pesan, dan kamu bisa menebaknya dengan cara :\n*!claim <Nama karakter>*\nContoh : *!claim naruto*`)
                         })
                    } if (args[1] == 'disable' || args[1] == 'mati') {
                         if (!isExistCharPath) return balas(from, `Charagame memang belum diaktifkan!`)
                         if (buffChara.status === 'active') {
                              buffChara.status = 'unactive'
                              fs.writeFileSync(CharaPath, JSON.stringify(buffChara, null, 2))
                              balas(from, `Chara game telah dimatikan digrup ini ❌`)
                         }
                    }
               } catch (e) {
                    console.log(e)
                    balas(from, `${e}`)
               }
          } else if (cmd == `${prf}minesweeper`) {
               if (isGrupMines) return balas(from, `Game minesweeper telah aktif sebelumnya!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               groupMines.push(from)
               fs.writeFileSync('./lib/database/group-minesweeper.json', JSON.stringify(groupMines, null, 2))
               reset(`./lib/database/minesweep-${from}.json`)
               const strMine = `*Memulai game untuk grup ${groupMetadata.subject}* 
     
       (10x10)    ||    10 BOM
     
         0   1    2   3    4   5    6   7    8  9  
     0 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
     1 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
     2 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
     3 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
     4 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
     5 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
     6 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
     7 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
     8 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
     9 ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
     
     Untuk mengisi sel tersebut gunakan koordinat x dan y!
     
     Penggunaan : *isi x y*
     Contoh : *isi 0 0*
     `
               balas(from, strMine, TypePsn.text)
          } else if (cmd == `isi`) {
               // const isGrupMines = groupMines.includes(from)
               if (!isGrupMines) return balas(from, `Game minesweeper tidak aktif! Gunakan perintah *!minesweeper*`)
               const daba = JSON.parse(fs.readFileSync(`./lib/database/minesweep-${from}.json`))
               const hasil = reveal(daba, Number(args[1]), Number(args[2]))
               console.log(hasil)
               const strMinePlay = `*Diisi oleh ${pushname}*
     
     Status : Playing ▶️
     
     (10x10)    ||    10 BOM
${hasil.grid}
                    `
               const strMineOver = `*Diisi oleh ${pushname}*
     
     Status : ❌ You Lose ❌
     
     (10x10)    ||    10 BOM
${hasil.grid}
                    `
               const strMineWon = `*Diisi oleh ${pushname}*
     
     Status : ✅ You Won! 💚

Selamat, Gift limit 500 telah ditambahkan!
     
     (10x10)    ||    10 BOM
${hasil.grid}
                    `
               const index = groupMines.indexOf(from)
               if (hasil.status == 'x big') {
                    balas(from, `Nilai X Terlalu besar!`)
               } else if (hasil.status == 'x big') {
                    balas(from, `Nilai Y Terlalu besar!`)
               } if (hasil.status == 'sel exist') {
                    balas(from, `Sel ${args[1]},${args[2]} Telah Terisi!`)
               } else if (hasil.status == 'playing') {
                    balas(from, strMinePlay, TypePsn.text)
               } else if (hasil.status == 'gameover') {
                    balas(from, strMineOver, TypePsn.text)
                    groupMines.splice(index, 1)
                    fs.writeFileSync('./lib/database/group-minesweeper.json', JSON.stringify(groupMines, null, 2))
               } else if (hasil.status == 'win') {
                    balas(from, strMineWon, TypePsn.text)
                    giftLimit(sender, 500)
                    groupMines.splice(index, 1)
                    fs.writeFileSync('./lib/database/group-minesweeper.json', JSON.stringify(groupMines, null, 2))
               }
          } else if (cmd == `${prf}tiktok`) {
               if (args.length === 1) return balas(from, `Untuk mendownload tiktok\ngunakan *!tiktik* <https://linktiktok>`)
               waiter()
               tiktok(args[1]).then(resul => {
                    const meta = resul
                    const exekute = exec('tiktok-scraper video ' + args[1] + ' -d')

                    exekute.stdout.on('data', function (data) {
                         const res = { loc: `${data.replace('Video location: ', '').replace('\n', '')}` }
                         const json = {
                              meta,
                              res,
                         }
                         let hastagtik = `[ `
                         for (var i = 0; i < json.meta.hastag.length; i++) {
                              hastagtik += `${json.meta.hastag[i]} `
                         }
                         hastagtik += ` ]`
                         const capt_tikt = `*Data berhasil didapatkan!*
*Nama* : ${json.meta.name}
*Nickname* : ${json.meta.nickname}
*Text* : ${json.meta.text}
*Music* : ${json.meta.music}
*Hastag* : ${hastagtik}
`
                         if (json.res.loc.slice(-3) == 'csv') return balas(from, `Media ini tidak mendukung! mohon masukan link lain.`)
                         const buff = fs.readFileSync(json.res.loc)
                         conn.sendMessage(from, buff, TypePsn.video, { quoted: hurtz, caption: capt_tikt })
                         fs.unlinkSync(json.res.loc)
                    })
               })
          } else if (cmd == `${prf}getpp`) {
               if (args.length === 1) return balas(from, `Penggunaan *!getpp* @tagMember`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const profil = await conn.getProfilePicture(args[1].replace('@', '') + '@s.whatsapp.net')
               sendDariUrl(from, profil, TypePsn.image, `Nihh profilnya`)
          } else if (cmd == `${prf}trigger`) {
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               if (args.length === 1) {
                    if (!isQuotedImage || !isQuotedVideo) {
                         const buff = await conn.downloadMediaMessage(mediaData)
                         let image = await trigger(buff);
                         createExif('Created By MechaBOT', 'Follow Dev Insta @hzzz.formech_')
                         fs.writeFile('./media/effect/triggered.gif', image, () => {
                              exec(`ffmpeg -i ./media/effect/triggered.gif -vcodec libwebp -vf fps=fps=30 -lossless 0 -loop 0 -pix_fmt yuv420p -preset default -an -vsync 0 -s 512:512 ./media/effect/triggered.webp`, (err, stdout, stderr) => {
                                   if (err) throw new TypeError(err)
                                   exec(`webpmux -set exif ./media/sticker/data.exif ./media/effect/triggered.webp -o ./media/effect/triggered-done.webp`, (err, stdout, stderr) => {
                                        if (err) throw new TypeError(err)
                                        INFOLOG('Success Generate Image & Exif')
                                        const buff = fs.readFileSync('./media/effect/triggered-done.webp')
                                        conn.sendMessage(from, buff, TypePsn.sticker, { quoted: hurtz })
                                        if (fs.existsSync('./media/effect/triggered.gif')) fs.unlinkSync('./media/effect/triggered.gif')
                                        if (fs.existsSync('./media/effect/triggered.webp')) fs.unlinkSync('./media/effect/triggered.webp')
                                        if (fs.existsSync('./media/effect/triggered-done.webp')) fs.unlinkSync('./media/effect/triggered-done.webp')
                                   })
                              })
                         })
                    }
               } else if (/@[0-9]/gi.test(args[1])) {
                    if (!cekLimit(sender, settings.Limit)) {
                         conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                              quoted: hurtz,
                              contextInfo: { mentionedJid: [nomerOwner[0]] }
                         })
                         return
                    }
                    pushLimit(sender, 1)
                    try {
                         if (fs.existsSync('./media/effect/triggered.gif')) fs.unlinkSync('./media/effect/triggered.gif')
                         if (fs.existsSync('./media/effect/triggered.webp')) fs.unlinkSync('./media/effect/triggered.webp')
                         if (fs.existsSync('./media/effect/triggered-done.webp')) fs.unlinkSync('./media/effect/triggered-done.webp')
                         const pepe = await conn.getProfilePicture(args[1].replace('@', '') + '@s.whatsapp.net')
                         let image = await canvacord.Canvas.trigger(pepe);
                         createExif('Created By MechaBOT', 'Follow Dev Insta @hzzz.formech_')
                         fs.writeFile('./media/effect/triggered.gif', image, async () => {
                              // INFOLOG('exec')
                              exec(`ffmpeg -i ./media/effect/triggered.gif -vcodec libwebp -vf fps=fps=30 -lossless 0 -loop 0 -pix_fmt yuv420p -preset default -an -vsync 0 -s 512:512 ./media/effect/triggered.webp`, (err, stdout, stderr) => {
                                   if (err) {
                                        ERRLOG(err);
                                        return
                                   }
                                   INFOLOG('Success Generate Image')
                                   exec(`webpmux -set exif ./media/sticker/data.exif ./media/effect/triggered.webp -o ./media/effect/triggered-done.webp`, (err, stdout, stderr) => {
                                        if (err) throw new TypeError(err)
                                        INFOLOG('Success Generate Exif Metadata')
                                        const buff = fs.readFileSync('./media/effect/triggered-done.webp')
                                        conn.sendMessage(from, buff, TypePsn.sticker, { quoted: hurtz })
                                        fs.unlinkSync('./media/effect/triggered.gif')
                                        fs.unlinkSync('./media/effect/triggered.webp')
                                        fs.unlinkSync('./media/effect/triggered-done.webp')
                                   })
                              })
                         })
                    } catch (e) {
                         ERRLOG(e);
                         (async () => {
                              let image = await canvacord.Canvas.trigger(fs.readFileSync('./media/blank.png'));
                              createExif('Created By MechaBOT', 'Follow Dev Insta @hzzz.formech_')
                              fs.writeFile('./media/effect/triggered.gif', image, () => {
                                   exec(`ffmpeg -i ./media/effect/triggered.gif -vcodec libwebp -vf fps=fps=30 -lossless 0 -loop 0 -pix_fmt yuv420p -preset default -an -vsync 0 -s 512:512 ./media/effect/triggered.webp`, (err, stdout, stderr) => {
                                        if (err) throw new TypeError(err)
                                        INFOLOG('Success Handle Generate Image')
                                        exec(`webpmux -set exif ./media/sticker/data.exif ./media/effect/triggered.webp -o ./media/effect/triggered-done.webp`, (err, stdout, stderr) => {
                                             if (err) throw new TypeError(err)
                                             INFOLOG('Success Generate Exif Metadata')
                                             const buff = fs.readFileSync('./media/effect/triggered-done.webp')
                                             conn.sendMessage(from, buff, TypePsn.sticker, { quoted: hurtz })
                                             fs.unlinkSync('./media/effect/triggered.gif')
                                             fs.unlinkSync('./media/effect/triggered.webp')
                                             fs.unlinkSync('./media/effect/triggered-done.webp')
                                        })
                                   })
                              })
                         })();
                    }
               } else if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(args[1])) {
                    if (!cekLimit(sender, settings.Limit)) {
                         conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                              quoted: hurtz,
                              contextInfo: { mentionedJid: [nomerOwner[0]] }
                         })
                         return
                    }
                    pushLimit(sender, 1)
                    let image = await canvacord.Canvas.trigger(args[1]);
                    console.log('cnth2')
                    createExif('Created By MechaBOT', 'Follow Dev Insta @hzzz.formech_')
                    fs.writeFile('./media/effect/triggered.gif', image, () => {
                         exec(`ffmpeg -i ./media/effect/triggered.gif -vcodec webp -loop 0 -pix_fmt yuv420p ./media/effect/triggered.webp`, (err, stdout, stderr) => {
                              if (err) throw new TypeError(err)
                              exec(`webpmux -set exif ./media/sticker/data.exif ./media/effect/triggered.webp -o ./media/effect/triggered-done.webp`, (err, stdout, stderr) => {
                                   if (err) throw new TypeError(err)
                                   const buff = fs.readFileSync('./media/effect/triggered-done.webp')
                                   conn.sendMessage(from, buff, TypePsn.sticker, { quoted: hurtz })
                                   fs.unlinkSync('./media/effect/triggered.gif')
                                   fs.unlinkSync('./media/effect/triggered.webp')
                                   fs.unlinkSync('./media/effect/triggered-done.webp')
                              })
                         })
                    })
               }
          } else if (cmd == `${prf}apk`) {
               if (args.length === 1) return balas(from, `Masukan nama apk nyah!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               searchApk(body.slice(5)).then(res => {
                    let captions = '*Menampilkan list apk*'
                    // console.log(res)
                    for (let i = 0; i < res.length; i++) {
                         captions += `

*Urutan* : ${1 + i}
*Nama APK* : ${res[i].name}
*Download* : _!getapk ${res[i].dl_url.replace('https://rexdlfile.com/index.php?id=', '')}_
*Deskripsi* : ${res[i].desc}
                              `
                    }
                    balas(from, captions)
               }).catch(() => balas(from, `APK mungkin tidak ada!`))
          } else if (cmd == `${prf}getapk`) {
               if (args.length === 1) return balas(from, `Masukan nama download apk nya!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               try {
                    getApk('https://rexdlfile.com/index.php?id=' + body.slice(8)).then(res => {
                         let caption = `*${res.title.toUpperCase()}*\n`
                         caption += `
*Nama* : ${res.title}
*Versi* : ${res.version}
*Ukuran* : ${res.size}
*Diupdate pada* : ${res.updated}
*Download* :
`
                         for (let i = 0; i < res.download.length; i++) {
                              caption += `\n- ${res.download[i].title}\n- ${res.download[i].url}\n\n`
                         }
                         conn.sendMessage(from, caption, TypePsn.text, { quoted: hurtz })
                    })
               } catch (error) {
                    console.log(error)
               }
          } else if (cmd == `${prf}getapkdirect`) {
               if (args.length === 1) return balas(from, `Masukan nama download apk nya!`)
               if (args.length === 2) return balas(from, `penggunaan : *!getapkdirect <urutan> <download id>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               try {
                    getApkReal('https://rexdlfile.com/index.php?id=' + body.slice(16)).then(res => {
                         let caption = `*DOWNLOADING ${res.title.toUpperCase()}!*`
                         balas(from, caption)
                         const dl = res.download[Number(args[1])]
                         const zip = 'application/octet-stream'
                         const apk = 'application/vnd.android.package-archive'
                         // console.log(res)
                         Axios.request({
                              method: 'GET',
                              url: dl,
                              responseType: 'arraybuffer',
                              responseEncoding: 'binary'
                         }).then(({ data }) => {
                              const extmim = dl.slice(-3) == 'apk' ? apk : dl.slice(-3) == 'zip' ? zip : zip
                              conn.sendMessage(from, data, TypePsn.document, { filename: res.title, mimetype: extmim, quoted: hurtz })
                         })
                    })
               } catch (error) {
                    console.log(error)
                    balas(from, `Error gan!`)
               }
          } else if (cmd == `${prf}blacklist`) {
               if (args.length === 1) return balas(from, `invalid parameters :)`)
               if (db_black.includes(args[1].replace('@', ''))) return balas(from, `Sudah ada didatabase!`)
               db_black.push(args[1].replace('@', ''))
               fs.writeFileSync('./lib/new-chat/blacklist.json', JSON.stringify(db_black, null, 2))
               balas(from, `Berhasil menambah ${args[1].replace('@', '')} ke blacklist user timestamp!`)
          } else if (cmd == `${prf}antidelete`) {
               if (args.length === 1) return balas(from, `Gunakan perintah *!antidelete aktif* atau *!antidelete mati*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               if (args[1] == 'aktif') {
                    if (dataRevoke.includes(from)) return balas(from, `Fitur ini telah diaktifkan sebelumnya!`)
                    dataRevoke.push(from)
                    fs.writeFileSync('./lib/database/RevokedGroup.json', JSON.stringify(dataRevoke, null, 2))
                    balas(from, `Pesan anti hapus berhasil diaktifkan digrup ${groupMetadata.subject} ✅`)
               } else if (args[1] == `mati`) {
                    if (!dataRevoke.includes(from)) return balas(from, `Fitur ini memang belum diaktifkan!`)
                    const index = dataRevoke.indexOf(from)
                    dataRevoke.splice(index, 1)
                    fs.writeFileSync('./lib/database/RevokedGroup.json', JSON.stringify(dataRevoke, null, 2))
                    balas(from, `Pesan anti hapus berhasil dinonaktifkan di grup ${groupMetadata.subject} ❌`)
               }
          } else if (cmd == `b`) {
               console.log(addFspam(sender))
          } else if (cmd == `${prf}infogrup` || cmd == `${prf}grupinfo`) {
               if (args.length === 1) return balas(from, `Gunakan perintah *!infogrup aktif* atau *!infogrup mati*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const databaseGC = JSON.parse(fs.readFileSync('./lib/database/welcomer-leaver.json'))
               if (args[1] == 'aktif') {
                    if (databaseGC.includes(from)) return balas(from, `Fitur ini telah diaktifkan sebelumnya!`)
                    databaseGC.push(from)
                    fs.writeFileSync('./lib/database/welcomer-leaver.json', JSON.stringify(databaseGC, null, 2))
                    balas(from, `Info grup diaktifkan digrup ${groupMetadata.subject} ✅`)
               } else if (args[1] == `mati`) {
                    if (!databaseGC.includes(from)) return balas(from, `Fitur ini memang belum diaktifkan!`)
                    const index = databaseGC.indexOf(from)
                    databaseGC.splice(index, 1)
                    fs.writeFileSync('./lib/database/welcomer-leaver.json', JSON.stringify(databaseGC, null, 2))
                    balas(from, `Info grup dinonaktifkan di grup ${groupMetadata.subject} ❌`)
               } else {
                    balas(from, `Penggunaan *!infogrup <aktif/mati>*`)
               }
          } else if (cmd == `qrtes`) {
          } else if (cmd == `${prf}tambahbot`) {
               if (!isOwner) return balas(from, `❌ Hanya untuk Owner/Pemilik Bot ❌`)
               if (args.length !== 3) return balas(from, `Penggunaan *!tambahbot* <namasesi> <nomer>`)
               pm2.connect(function (err) {
                    if (err) {
                         console.error(err);
                         process.exit(2);
                    }
                    pm2.start({
                         script: 'mecha.js',         // Script to be run
                         name: args[1],
                         args: args[1],
                         max_memory_restart: '5000M'   // Optional: Restarts your app if it reaches 100Mo
                    }, function (err, apps) {
                         pm2.disconnect();   // Disconnects from PM2
                         if (err) throw err
                         settings.Sesi.push({ Jid: args[2].replace('@', '') + '@s.whatsapp.net', Sesi: args[1] })
                         balas(from, `Mohon tunggu 10 detik..`)
                         setTimeout(function () {
                              if (fs.existsSync('./media/qrcode/' + args[1] + '.png')) {
                                   const should = fs.readFileSync('./media/qrcode/' + args[1] + '.png')
                                   conn.sendMessage(from, should, TypePsn.image, { contextInfo: { mentionedJid: [args[2].replace('@', '') + '@s.whatsapp.net'] }, caption: `Scan qrnya khusus untuk nomor @${args[2].replace('@', '')}` })
                                   INFOLOG('Sukses menambah bot ' + args[1])
                                   balas(from, `Bot ${args[1]} telah didaftarkan / online ✅`)
                              } else {
                                   balas(from, `Gagal mendaftarkan bot file qr error!`)
                              }
                         }, 10000);
                    });
               })
          } else if (cmd == `${prf}hapusbot`) {
               if (!isOwner) return balas(from, `❌ Hanya untuk Owner/Pemilik Bot ❌`)
               if (args.length !== 2) return balas(from, `Penggunaan *!hapusbot* <namasesi>`)
               pm2.connect(function (err) {
                    if (err) {
                         console.error(err);
                         process.exit(2);
                    }
                    pm2.delete(args[1], (err, proc) => {
                         // console.log(proc)
                         if (err) {
                              balas(from, `Terjadi kesalahan mungkin nama tidak tersedia atau proses telah berhenti!`)
                              return
                         }
                         INFOLOG('Sukses menghapus bot ' + args[1])
                         balas(from, `Bot ${args[1]} berhasil dihapus 🙌`)
                         pm2.disconnect()
                    })
               })
          } else if (cmd == `${prf}listbot`) {
               pm2.connect(function (err) {
                    if (err) {
                         console.error(err);
                         process.exit(2);
                    }
                    pm2.list((err, list) => {
                         if (err) throw new TypeError()
                         let datalist = `*Menampilkan list dari pusat MechaBOT*\n\nterdapat ${list.length} bot di database`
                         for (let i = 0; i < list.length; i++) {
                              const { pid, name, pm2_env } = list[i]
                              datalist += `\n\n*Status* : ${pm2_env.status}\n*Nama* : ${name}\n*PID* : ${pid}`
                         }
                         balas(from, datalist)
                         // console.log(data)
                         pm2.disconnect()
                    })
               })
          } else if (cmd == `${prf}startbot` || cmd == `${prf}mulaibot`) {
               if (!isOwner) return balas(from, `❌ Hanya untuk Owner/Pemilik Bot ❌`)
               if (args.length !== 2) return balas(from, `Perintah !startbot <namasesi>`)
               pm2.connect(function (err) {
                    if (err) {
                         console.error(err);
                         process.exit(2);
                    }
                    pm2.start({
                         script: 'mecha.js',		// Script to be run
                         name: args[1],
                         max_memory_restart: '5000M'		// Optional: Restarts your app if it reaches 100Mb
                    }, function (err, apps) {
                         if (err) {
                              pm2.disconnect();		// Disconnects from PM2
                              balas(from, `Error, mungkin sesi tidak tersedia atau telah terhapus sebelumnya!`)
                              return
                         }
                         INFOLOG('Sukses Memulaikan BOT ' + args[1])
                         balas(from, `BOT ${args[1]} telah online kembali.`)
                    });
               })
          } else if (cmd == `${prf}stopbot`) {
               if (!isOwner) return balas(from, `❌ Hanya untuk Owner/Pemilik Bot ❌`)
               if (args.length !== 2) return balas(from, `Penggunaan *!stopbot* <namasesi>`)
               pm2.connect(function (err) {
                    if (err) {
                         console.error(err);
                         process.exit(2);
                    }
                    pm2.stop(args[1], (err, proc) => {
                         // console.log(proc)
                         if (err) {
                              balas(from, `Terjadi kesalahan mungkin nama tidak tersedia atau proses telah berhenti!`)
                              return
                         }
                         INFOLOG('Sukses memberhentikan bot ' + args[1])
                         balas(from, `Bot ${args[1]} berhasil diberhentikan ❌`)
                         pm2.disconnect()
                    })
               })
          } else if (cmd == `${prf}unblacklist`) {
               if (args.length === 1) return balas(from, `invalid params :)`)
               const inblack = db_black.indexOf(from.replace('@s.whatsapp.net', ''))
               db_black.splice(inblack, 1)
               fs.writeFileSync('./lib/new-chat/blacklist.json', JSON.stringify(db_black, null, 2))
               balas(from, `Berhasil menghapus ${db_black[inblack]} dari blacklist data timestamp!`)
          } else if (cmd == `${prf}cekno`) {
               const validasi = await conn.isOnWhatsApp(args[1].replace('@', '') + '@s.whatsapp.net')
               const isValid = validasi ? "Tersedia ✅" : "Tidak terdaftar ❌"
               balas(from, `Nomor ini ${isValid} di WhatsApp!`)
          } else if (cmd == `${prf}numgen`) {
               if (args.length === 1) return balas(from, `Gunakan perintah :\nX : 0-9\nY : 9-0\nZ : 0-9 (random)\n\n*!numgen 6285559038XYZ*`)
               const table = new Table({
                    head: ["", "", ""],
                    chars: {
                         'top': '', 'top-mid': '', 'top-left': '', 'top-right': '',
                         'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '',
                         'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '',
                         'right': '', 'right-mid': '', 'middle': ''
                    }
               })
               // console.log(isValid)
               const x = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
               const y = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "1"]
               for (let i = 0; i < x.length; i++) {
                    const z = [
                         Math.floor(Math.random() * 10),
                         Math.floor(Math.random() * 10),
                         Math.floor(Math.random() * 10),
                         Math.floor(Math.random() * 10),
                         Math.floor(Math.random() * 10),
                         Math.floor(Math.random() * 10),
                         Math.floor(Math.random() * 10),
                         Math.floor(Math.random() * 10),
                         Math.floor(Math.random() * 10),
                         Math.floor(Math.random() * 10)
                    ]
                    for (let j = 0; j < x.length; j++) {
                         const listener = args[1].toLowerCase().replace(/x/g, x[i]).replace(/y/g, y[i]).replace(/z/g, z[Math.floor(Math.random() * 10)])
                         const validasi = await conn.isOnWhatsApp(listener + '@s.whatsapp.net')
                         const isValid = validasi ? "Tersedia ✅" : "Tidak terdaftar ❌"
                         table.push(
                              [1 + i, `wa.me/${listener}`, '' + isValid]
                         )
                    }
               }
               const tabelnama = table.toString().replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
               balas(from, tabelnama + '\n')
          } else if (cmd == `${prf}pshname`) {
               console.log(conn.generateMessageTag(true))
               conn.sendMessage(from, '*Pushname* : ' + pushname, TypePsn.text, { quoted: hurtz })
               console.log(cont)
          } else if (cmd == `${prf}video`) {
               if (args.length === 1) return balas(from, 'Kirim perintah *!video* _Judul video yang akan dicari_')
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               ytsr(query)
                    .then(result => {
                         let caption = `*Hasil pencarian dari ${query}*\n\nNote : Apabila kesusahan mengambil data id, untuk download video tag pesan ini dan berikan perintah : *!getvideo urutan*\ncontoh : *!getvideo 2*\n`
                         for (let i = 0; i < result.length; i++) {
                              caption += `\n*Urutan* : ${i + 1}\n*Title* : ${result[i].title}\n*Published* : ${result[i].ago}\n*Viewers* : ${result[i].views}\n*Channel* : ${result[i].author}\n*Durasi* : ${result[i].timestamp}\n*Perintah download* : _!getvideo ${result[i].id}_\n\n`
                         }
                         for (let j = 0; j < result.length; j++) {
                              caption += `(#)${result[j].id}`
                         }
                         sendDariUrl(from, result[0].thumb, TypePsn.image, caption)
                    })
          } else if (cmd == `${prf}getvideo`) {
               if (args.length === 1) return balas(from, 'Kirim perintah *!getvideo* _IdDownload_, atau *!getvideo NomerUrut*')
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               if (isQuotedImage) {
                    if (!Number(args[1])) return balas(from, `_Apabila ditag hanya cantumkan nomer urutan bukan ID Download!_  contoh : *!getvideo _1_*`)
                    const pilur = bodyQuoted.split('(#)')
                    ytv(`https://youtu.be/${pilur[args[1]]}`)
                         .then((res) => {
                              const { dl_link, thumb, title, filesizeF, filesize } = res
                              Axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                   .then((a) => {
                                        remote(dl_link, (e, o) => {
                                             if (Number(filesize) >= 40000) return sendDariUrl(from, thumb, TypePsn.image, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP4\n*Filesize* : ${sizer(o)}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
                                             const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP4\n*Size* : ${sizer(o)}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                             sendDariUrl(from, thumb, TypePsn.image, captions)
                                             sendDariUrl(from, dl_link, TypePsn.video, `Video telah terkirim ${pushname}`).catch(e => console.log && balas(from, `Terjadi kesalahan!`))
                                        })
                                   })
                         })
                         .catch(error => {
                              console.log(error)
                              balas(from, `Terdapat kesalahan!`)
                         })
               } else {
                    if (args.length === 1) return balas(from, `_Apabila tidak ditag hanya cantumkan ID bukan urutan!_  contoh : *!getvideo _Xis67a47s_*`)
                    ytv(`https://youtu.be/${args[1]}`)
                         .then((res) => {
                              const { dl_link, thumb, title, filesizeF, filesize } = res
                              Axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                   .then((a) => {
                                        remote(dl_link, (e, o) => {
                                             if (Number(filesize) >= 40000) return sendDariUrl(from, thumb, TypePsn.image, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP4\n*Filesize* : ${sizer(o)}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
                                             const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP4\n*Size* : ${sizer(o)}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                             sendDariUrl(from, thumb, TypePsn.image, captions)
                                             sendDariUrl(from, dl_link, TypePsn.video, `Video telah terkirim ${pushname}`).catch(e => console.log(e) && balas(from, `Terjadi kesalahan!`))
                                        })
                                   })

                         })
                         .catch(error => {
                              console.log(error)
                              balas(from, `Terdapat kesalahan!`)
                         })
               }
          } else if (cmd == `${prf}musik` || cmd == `${prf}music`) {
               if (args.length === 1) return balas(from, 'Kirim perintah *!musik* _Judul lagu yang akan dicari_')
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               ytsr(query)
                    .then(result => {
                         let caption = `*Hasil pencarian dar ${query}*\n\nNote : Apabila kesusahan mengambil data id, untuk download lagu tag pesan ini dan berikan perintah : *!getmusik urutan*\ncontoh : *!getmusik 2*\n`
                         for (let i = 0; i < result.length; i++) {
                              caption += `\n*Urutan* : ${i + 1}\n*Title* : ${result[i].title}\n*Published* : ${result[i].ago}\n*Viewers* : ${result[i].views}\n*Channel* : ${result[i].author}\n*Durasi* : ${result[i].timestamp}\n*Perintah download* : _!getmusik ${result[i].id}_\n\n`
                         }
                         for (let j = 0; j < result.length; j++) {
                              caption += `(#)${result[j].id}`
                         }
                         sendDariUrl(from, result[0].thumb, TypePsn.image, caption)
                    })
          } else if (cmd == `${prf}getmusik` || cmd == `${prf}getmusic`) {
               if (args.length === 1) return balas(from, 'Kirim perintah *!getmusik* _IdDownload_, atau *!getmusik NomerUrut*')
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 2)
               if (isQuotedImage) {
                    if (!Number(args[1])) return balas(from, `_Apabila ditag hanya cantumkan nomer urutan bukan ID Download!_  contoh : *!getmusik _1_*`)
                    const pilur = bodyQuoted.split('(#)')
                    yta(`https://youtu.be/${pilur[args[1]]}`)
                         .then((res) => {
                              const { dl_link, thumb, title, filesizeF, filesize } = res
                              Axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                   .then((a) => {
                                        remote(dl_link, (e, o) => {
                                             if (Number(filesize) >= 40000) return sendDariUrl(from, thumb, TypePsn.image, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${sizer(o)}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
                                             const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${sizer(o)}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                             sendDariUrl(from, thumb, TypePsn.image, captions)
                                             sendDariUrl(from, dl_link, TypePsn.audio, '', { mimetype: Mimetype.mp4Audio }).catch(e => console.log && balas(from, `Terjadi kesalahan!`))
                                        })
                                   })

                         })
                         .catch(error => {
                              console.log(error)
                              balas(from, `Terdapat kesalahan!!`)
                         })
               } else {
                    if (args.length === 1) return balas(from, `_Apabila tidak ditag hanya cantumkan ID bukan urutan!_  contoh : *!getmusik _Xis67a47s_*`)
                    yta(`https://youtu.be/${args[1]}`)
                         .then((res) => {
                              const { dl_link, thumb, title, filesizeF, filesize } = res
                              Axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                   .then((a) => {
                                        remote(dl_link, (e, o) => {
                                             if (Number(filesize) >= 40000) return sendDariUrl(from, thumb, TypePsn.image, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${sizer(o)}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
                                             const captions = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${sizer(o)}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                             sendDariUrl(from, thumb, TypePsn.image, captions)
                                             sendDariUrl(from, dl_link, TypePsn.audio, '', { mimetype: Mimetype.mp4Audio }).catch(e => console.log(e) && balas(from, `Terjadi kesalahan!`))
                                        })
                                   })
                         })
                         .catch((error) => {
                              console.log(error)
                              balas(from, `Terdapat kesalahan!!`)
                         })
               }
          } else if (cmd == `${prf}sisa` || cmd == `${prf}sisawaktu`) {
               if (!fs.existsSync(`./lib/tebak-gambar/${from}.json`)) return balas(from, `Sesi tebakgambar belum diaktifkan ❌\nketik *!tebakgambar* untuk memulai`)
               const db_tebak = JSON.parse(fs.readFileSync(`./lib/tebak-gambar/${from}.json`))
               balas(from, `*Waktu tersisa* = ${db_tebak.remaining}`)
          } else if (cmd == `${prf}batt`) {
               const batt = fs.readFileSync('./lib/database/batt.json', 'utf-8')
               conn.sendMessage(from, '*Battery* : ' + batt, TypePsn.text, { quoted: hurtz })
               console.log(batt)
          } else if (cmd == `${prf}searchmsg`) {
               const searched = await conn.searchMessages(query, from, 25, 1)
               console.log(searched)
               for (let i = 0; i < searched.messages.length; i++) {
                    conn.sendMessage(from, `Ketemu!`, TypePsn.text, { quoted: searched.messages[i] }).catch(() => {
                         conn.sendMessage(from, `Kata ${body.slice(11).split('|')[0]} tidak ditemukan!`, TypePsn.text, { quoted: hurtz })
                    })
               }
          } else if (cmd == `${prf}download`) {
               const save = await conn.downloadAndSaveMediaMessage(mediaData, `C:\\Users\\user\\Downloads\\file`)
               balas(from, save)
          } else if (cmd == `${prf}sendmux`) {
               const loaddata = fs.readFileSync('./media/sticker/afterexif.webp')
               conn.sendMessage(from, loaddata, TypePsn.sticker, { quoted: hurtz })
          } else if (cmd == `${prf}cekgrup`) {
               conn.sendMessage(from, hurtz.key.remoteJid, TypePsn.text, { quoted: hurtz })
          } else if (cmd == `${prf}reverse`) {
          } else if (cmd == `${prf}ytmp4`) {
               if (args.length === 1) return balas(from, `Penggunaan *!ytmp4 <Linkyt>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const args_yt4 = body.slice(7)
               ytv(args_yt4).then((resyt4) => {
                    const { dl_link, thumb, title, filesize } = resyt4
                    INFOLOG(title)
                    //Send Thumb
                    Axios.get(thumb, {
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                         Axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                              .then((a) => {
                                   remote(dl_link, (e, o) => {
                                        if (Number(filesize) >= 100000) return sendDariUrl(from, thumb, TypePsn.image, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP4\n*Filesize* : ${sizer(o)}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
                                        const buffer_thumbyt4 = Buffer.from(data, 'base64')
                                        const capt_yt4 = `*Data telah didapatkan!*

*Judul* : ${title}
*Type* : MP4
*Filesize* : ${sizer(o)}

_Mohon tunggu beberapa menit untuk mengirim file tersebut.._`
                                        conn.sendMessage(from, buffer_thumbyt4, TypePsn.image, { mimetype: Mimetype.jpeg, caption: capt_yt4, quoted: hurtz })
                                        //Send MP4
                                        Axios.get(dl_link, {
                                             responseType: 'arraybuffer'
                                        }).then(response => {
                                             const buffer_yt4 = Buffer.from(response.data, 'base64');
                                             INFOLOG(`DAPAT DATA VIDEO : ${title}`)
                                             conn.sendMessage(from, buffer_yt4, TypePsn.video, { mimetype: Mimetype.mp4, quoted: hurtz })
                                        }).catch(ex => {
                                             ERRLOG(ex);
                                        });
                                   })
                              })
                              .catch(e => ERRLOG(e))
                    })
               })
          } else if (cmd == `${prf}warnai`) {
               return balas(from, `Fitur ini masih perbaikan`)
               const savedMedia = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               exec(`curl -F "image=@${savedMedia}" -H "api-key:c7e56944-336a-4bfe-ae81-bc579f4c7047" https://api.deepai.org/api/colorizer `, (err, stdout, stderr) => {
                    const data = JSON.parse(stdout)
                    sendDariUrl(from, data.output_url, TypePsn.image)
                    fs.unlinkSync(`./media/effect/${filename}`)
               })
          } else if (cmd == `${prf}ytmp3`) {
               if (args.length === 1) balas(from, `Penggunaan *!ytmp3 <linkyt>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const args_yt3 = body.slice(7)
               yta(args_yt3).then((resyt3) => {
                    const { dl_link, thumb, title, filesize } = resyt3
                    INFOLOG(title)
                    //Send Thumb
                    Axios.get(thumb, {
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                         Axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                              .then((a) => {
                                   remote(dl_link, (e, o) => {
                                        if (Number(filesize) >= 100000) return sendDariUrl(from, thumb, TypePsn.image, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP4\n*Filesize* : ${sizer(o)}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
                                        const buffer_thumbyt3 = Buffer.from(data, 'base64')
                                        const capt_yt3 = `*Data telah didapatkan!*
     
*Judul* : ${title}
*Type* : MP3
*Filesize* : ${sizer(o)}

_Mohon tunggu beberapa menit untuk mengirim file tersebut.._`
                                        conn.sendMessage(from, buffer_thumbyt3, TypePsn.image, { mimetype: Mimetype.jpeg, caption: capt_yt3, quoted: hurtz })
                                        //Send MP3
                                        Axios.get(dl_link, {
                                             responseType: 'arraybuffer'
                                        }).then(response => {
                                             const buffer_yt3 = Buffer.from(response.data, 'base64');
                                             INFOLOG(`DAPAT DATA AUDIO : ${title}`)
                                             conn.sendMessage(from, buffer_yt3, TypePsn.audio, { mimetype: Mimetype.mp4Audio, quoted: hurtz })
                                        }).catch(ex => {
                                             ERRLOG(ex);
                                        });
                                   })
                              })
                    }).catch(e => ERRLOG(e))
               })
          } else if (cmd == `${prf}tomp4`) {
               if (!isQuotedAudio) return balas(from, `Harus tag pesan audio!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/convert/${filename}`);
               const output = './media/convert/' + moment().unix() + '.mp4'
               mp32mp4(savedFilename, './media/sticker/docs.png', output)
                    .then((res) => {
                         sendFile(from, res.output, TypePsn.video, { quoted: hurtz })
                         fs.unlinkSync(savedFilename)
                         fs.unlinkSync(output)
                    }).catch(e => {
                         console.log(e)
                         balas(from, 'Gagal gan!')
                         fs.unlinkSync(savedFilename)
                         fs.unlinkSync(output)
                    })
          } else if (cmd == `${prf}tomp3`) {
               if (!isQuotedVideo && !isVideoMsg) return balas(from, `Tidak ada data video!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/convert/${filename}`);
               const output = './media/convert/' + moment().unix() + '.mp3'
               mp42mp3(savedFilename, output)
                    .then((res) => {
                         sendmp3(from, res.output)
                         fs.unlinkSync(savedFilename)
                         fs.unlinkSync(output)
                    }).catch(e => {
                         console.log(e)
                         balas(from, 'Gagal gan!')
                         fs.unlinkSync(savedFilename)
                         fs.unlinkSync(output)
                    })
          } else if (cmd == `${prf}sline`) {
               if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(args[1])) return balas(from, `Url tidak valid! masukan link stickerline.`)
               getStikerLine(args[1])
                    .then((rest) => {
                         for (let i = 0; i < rest.result.length; i++) {
                              sendStikerDariUrl(from, rest.result[i])
                         }
                         console.log(rest)
                    })
                    .catch(e => {
                         console.log(e)
                         balas(from, `Error gan!`)
                    })
          } else if (cmd == `${prf}hidetag`) {
               if (!isVIP) return balas(from, `Maaf kamu bukan member VIP :(`)
               if (args.length === 1) return balas(from, `Format salah!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 5)
               hidetag(from, body.slice(9))
          } else if (cmd == `${prf}getvocals` || cmd == `${prf}getvokal` || cmd == `${prf}vocal` || cmd == `${prf}vokal`) {
               if (!isQuotedAudio) return balas(from, `Mohon tag atau reply pesan audio!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               waiter()
               pushLimit(sender, 1)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`);
               voiceremover(savedFilename)
                    .then(async (rest) => {
                         INFOLOG(`GOT VOCAL`)
                         console.log(rest)
                         if (rest.error) return balas(from, `Terjadi kesalahan saat mengekstrak audio!`)
                         const dl_dulu = await download(rest.vocal_path, `./media/effect/${filename}.mp3`)
                         spawn('ffmpeg', [
                              '-y',
                              '-i', dl_dulu.result,
                              '-vn',
                              '-ac', '2',
                              '-b:a', '128k',
                              '-ar', '44100',
                              '-f', 'mp3',
                              `./media/effect/${filename}-out.mp3`
                         ])
                              .on('error', () => fs.unlinkSync(dl_dulu.result))
                              .on('close', () => {
                                   fs.unlinkSync(dl_dulu.result)
                                   conn.sendMessage(from, fs.readFileSync(`./media/effect/${filename}-out.mp3`), TypePsn.audio)
                                   if (fs.existsSync(`./media/effect/${filename}-out.mp3`)) fs.unlinkSync(`./media/effect/${filename}-out.mp3`)
                              })
                         // sendDariUrl(from, rest.vocal_path, TypePsn.audio, '')
                    })
                    .catch(e => {
                         console.log(e)
                         balas(from, `Terjadi kesalahan saat mengekstrak audio!`)
                    })
          } else if (cmd == `${prf}getinstrument` || cmd == `${prf}getinstrumen` || cmd == `${prf}instrument` || cmd == `${prf}instrumen`) {
               if (!isQuotedAudio) return balas(from, `Mohon tag atau reply pesan audio!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               waiter()
               pushLimit(sender, 1)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`);
               voiceremover(savedFilename)
                    .then((rest) => {
                         INFOLOG(`GOT INSTRUMENT`)
                         if (rest.error) return balas(from, `Terjadi kesalahan saat mengekstrak audio!`)
                         exec(`wget ${rest.instrumental_path} -O ./media/effect/vocal-${filename}.mp3`, (err, stdout, stderr) => {
                              if (err) {
                                   console.log(err)
                                   balas(from, `Maaf terjadi kesalahan!`)
                                   return
                              }
                              exec(`ffmpeg -i ./media/effect/vocal-${filename}.mp3 -codec:a libmp3lame -b:a 320k ./media/effect/vocal-out-${filename}.mp3`, (err, stdout, stderr) => {
                                   if (err) {
                                        console.log(err)
                                        balas(from, `Maaf terjadi kesalahan!`)
                                        return
                                   }
                                   const buffer = fs.readFileSync(`./media/effect/vocal-out-${filename}.mp3`)
                                   conn.sendMessage(from, buffer, TypePsn.audio, { quoted: hurtz })
                                   fs.unlinkSync(savedFilename)
                                   // fs.unlinkSync(`./media/effect/vocal-${filename}.mp3`)
                                   // fs.unlinkSync(`./media/effect/vocal-out-${filename}.mp3`)
                              })
                         })
                    })
                    .catch(e => {
                         console.log(e)
                         balas(from, `Terjadi kesalahan saat mengekstrak audio!`)
                    })
          } else if (cmd == `${prf}tomedia` || cmd == `${prf}toimg` || cmd == `${prf}toimage`) {
               if (!isQuotedSticker) return balas(from, `Mohon hanya tag stiker! bukan media lain.`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/sticker/${filename}`);
               if (mediaData.message.stickerMessage.isAnimated) {
                    webp2mp4File(savedFilename).then(async (rest) => {
                         Axios({
                              method: 'GET',
                              url: rest.result,
                              responseType: 'stream'
                         }).then(({ data }) => {
                              const saving = data.pipe(fs.createWriteStream(`./media/sticker/${filename}-done.mp4`))
                              saving.on('finish', () => {
                                   conn.sendMessage(from, fs.readFileSync(`./media/sticker/${filename}-done.mp4`), TypePsn.video, { mimetype: Mimetype.gif, caption: `Dah jadi ni ${pushname}`, quoted: hurtz })
                                   if (fs.existsSync(savedFilename)) fs.unlinkSync(savedFilename)
                                   if (fs.existsSync(`./media/sticker/${filename}-done.mp4`)) fs.unlinkSync(`./media/sticker/${filename}-done.mp4`)
                              })

                         })
                    }).catch((e) => {
                         console.log(e)
                         balas(from, `Error gan :(`)
                         if (fs.existsSync(savedFilename)) fs.unlinkSync(savedFilename)
                    })
               } else {
                    exec(`dwebp ${savedFilename} -o ./media/sticker/${filename}-done.png`, (err, stdout, stderr) => {
                         if (err) {
                              try {
                                   webp2mp4File(savedFilename).then(async (rest) => {
                                        Axios({
                                             method: 'GET',
                                             url: rest.result,
                                             responseType: 'stream'
                                        }).then(({ data }) => {
                                             const saving = data.pipe(fs.createWriteStream(`./media/sticker/${filename}-done.mp4`))
                                             saving.on('finish', () => {
                                                  conn.sendMessage(from, fs.readFileSync(`./media/sticker/${filename}-done.mp4`), TypePsn.video, { mimetype: Mimetype.gif, caption: `Dah jadi ni ${pushname}` })
                                                  if (fs.existsSync(savedFilename)) fs.unlinkSync(savedFilename)
                                                  if (fs.existsSync(`./media/sticker/${filename}-done.mp4`)) fs.unlinkSync(`./media/sticker/${filename}-done.mp4`)
                                             })

                                        })
                                   }).catch((e) => {
                                        console.log(e)
                                        balas(from, `Error gan :(`)
                                        if (fs.existsSync(savedFilename)) fs.unlinkSync(savedFilename)
                                   })
                              } catch (error) {
                                   console.log(error)
                              }
                              return
                         }
                         console.log(stdout)
                         sendFile(from, `./media/sticker/${filename}-done.png`, TypePsn.image, { caption: 'Dah jadi ni ' + pushname })
                         fs.unlinkSync(savedFilename)
                         fs.unlinkSync(`./media/sticker/${filename}-done.png`)
                    })
               }
          } else if (cmd == `${prf}stiker` || cmd == `${prf}sticker` || cmd == `${prf}stikergif` || cmd == `${prf}stickergif` || cmd == `${prf}stickergift` || cmd == `${prf}stikergift` || cmd == `${prf}setiker` || cmd == `${prf}seticker` || cmd == `${prf}gif`) {
               if (!isMedia && !isQuotedImage) return balas(from, `Mohon kirim gambar atau tag gambar dengan caption !stiker`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               let packstik
               let authorstik
               if (args[1] == 'wm') {
                    if (!isVIP) return balas(from, 'Maaf hanya untuk VIP yachh!')
                    packstik = body.slice(10).split('|')[0] || 'Created By MechaBOT'
                    authorstik = body.split('|')[1] || 'Follow Dev Insta @hzzz.formech_'
               } else {
                    packstik = 'Created By MechaBOT'
                    authorstik = 'Follow Dev Insta @hzzz.formech_'
               }
               const myfps = body.split('-fps ')[1] || '12'
               const ending = body.split('-end ')[1] || '6'
               createExif(packstik, authorstik)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/sticker/${filename}`);
               const sizestik = getFilesize(savedFilename)
               INFOLOG('Ukuran Stiker Mentah : ' + sizestik)
               if (savedFilename.slice(-4) === 'webp') {
                    exec(`webpmux -set exif ./media/sticker/data.exif ${savedFilename} -o ./media/sticker/${filename}-done.webp`, (err, stdout, stderr) => {
                         if (err) {
                              console.error(err);
                              return
                         }
                         const buff = fs.readFileSync(`./media/sticker/${filename}-done.webp`)
                         conn.sendMessage(from, buff, TypePsn.sticker, { quoted: hurtz })
                         if (fs.existsSync(savedFilename)) fs.unlinkSync(savedFilename)
                         if (fs.existsSync(`./media/sticker/${filename}-done.webp`)) fs.unlinkSync(`./media/sticker/${filename}-done.webp`)
                    })
                    return
               }
               if (savedFilename.slice(-4) === 'jpeg') {
                    const format = `ffmpeg -i ${savedFilename} -vcodec libwebp -vf scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1,fps=fps=30 -lossless 0 -an -vsync 0 -s 512:512 ./media/sticker/${filename}.webp`
                    exec(format, (err, stdout, stderr) => {
                         if (err) throw new TypeError(err)
                         INFOLOG(`Image Sticker`)
                         exec(`webpmux -set exif ./media/sticker/data.exif ./media/sticker/${filename}.webp -o ./media/sticker/${filename}-done.webp`, (err, stdout, stderr) => {
                              if (err) {
                                   console.error(err);
                                   return
                              }
                              const buff = fs.readFileSync(`./media/sticker/${filename}-done.webp`)
                              conn.sendMessage(from, buff, TypePsn.sticker, { quoted: hurtz })
                              if (fs.existsSync(savedFilename)) fs.unlinkSync(savedFilename)
                              if (fs.existsSync(`./media/sticker/${filename}.webp`)) fs.unlinkSync(`./media/sticker/${filename}.webp`)
                              if (fs.existsSync(`./media/sticker/${filename}-done.webp`)) fs.unlinkSync(`./media/sticker/${filename}-done.webp`)
                         })
                    })
                    return
               }

               exec(`ffmpeg -i ${savedFilename} -vcodec libwebp -vf scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1,fps=fps=${myfps} -lossless 0 -loop 0 -preset default -ss 00:00:00 -t 00:00:${ending} -an -vsync 0 -s 512:512 ./media/sticker/${filename}.webp`, (err, stdout, stderr) => {
                    if (err) throw new TypeError(err)
                    exec(`webpmux -set exif ./media/sticker/data.exif ./media/sticker/${filename}.webp -o ./media/sticker/${filename}-done.webp`, (err, stdout, stderr) => {
                         if (err) {
                              console.error(err);
                              return
                         }
                         const buff = fs.readFileSync(`./media/sticker/${filename}-done.webp`)
                         conn.sendMessage(from, buff, TypePsn.sticker, { quoted: hurtz })
                         if (fs.existsSync(savedFilename)) fs.unlinkSync(savedFilename)
                         if (fs.existsSync(`./media/sticker/${filename}.webp`)) fs.unlinkSync(`./media/sticker/${filename}.webp`)
                         if (fs.existsSync(`./media/sticker/${filename}-done.webp`)) fs.unlinkSync(`./media/sticker/${filename}-done.webp`)
                    })
               })
          } else if (cmd == `${prf}runtime`) {
               var uptime = process.uptime();
               const date = new Date(uptime * 1000);
               const days = date.getUTCDate() - 1,
                    hours = date.getUTCHours(),
                    minutes = date.getUTCMinutes(),
                    seconds = date.getUTCSeconds(),
                    milliseconds = date.getUTCMilliseconds();
               let segments = [];
               if (days > 0) segments.push(days + ' Hari');
               if (hours > 0) segments.push(hours + ' Jam');
               if (minutes > 0) segments.push(minutes + ' Menit');
               if (seconds > 0) segments.push(seconds + ' Detik');
               if (milliseconds > 0) segments.push(milliseconds + ' milidetik');
               const dateString = segments.join(', ');
               INFOLOG("Uptime: " + dateString);
               balas(from, `Waktu bot aktif / telah berjalan selama *${dateString}*`)
          } else if (cmd == `${prf}title`) {
               if (!isOwner) return balas(from, `Fitur ini masih rawan bot terbanned`)
               if (args.length === 1) balas(from, `Penggunaan *!title <Nama Gc Baru>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const subjeknya = body.slice(7)
               await conn.groupUpdateSubject(from, subjeknya)
          } else if (cmd == `${prf}desc`) {
               if (!isOwner) return balas(from, `Fitur ini masih rawan bot terbanned`)
               if (args.length === 1) balas(from, `Penggunaan *!desc <Deskripsi Gc Baru>*`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const descnya = body.slice(6)
               await conn.groupUpdateDescription(from, descnya)
          } else if (cmd == `${prf}mutegrup`) {
               if (!isAdmin) return balas(from, `Maaf anda bukan admin!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               conn.groupSettingChange(from, GroupSettingChange.messageSend, true)
          } else if (cmd == `${prf}unmutegrup`) {
               if (!isAdmin) return balas(from, `Maaf anda bukan admin!`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               conn.groupSettingChange(from, GroupSettingChange.messageSend, false)
          } else if (cmd == `${prf}translate`) {
               if (args.length === 1) return balas(from, `Tidak ada kode bahasa!\n\npenggunaan : *!translate <kode bahasa> <teks>*\nContoh : *!translate id how are you*\n\nUntuk kode bahasa bisa dilihat di *!listkodebahasa*`)
               if (args.length === 2) {
                    if (type != 'extendedTextMessage') return balas(from, `Mohon tag pesan apabila hanya memasukan kode bahasa!`)
                    translate(bodyQuoted, { to: args[1] }).then(res => {
                         balas(from, res.text)
                    }).catch(err => {
                         console.error(err);
                    });
               } else {
                    translate(args.slice(2).join(' '), { to: args[1] }).then(res => {
                         balas(from, res.text)
                    }).catch(err => {
                         console.error(err);
                    });
               }
          } else if (cmd == `${prf}cecan` || cmd == `${prf}cewek` || cmd == `${prf}cewe`) {
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const cecan = JSON.parse(fs.readFileSync('./lib/database/cecan.json'))
               const ciwi = Math.floor(Math.random() * cecan.length)
               sendDariUrl(from, cecan[ciwi], TypePsn.image, `Ciwi nya ${pushname}`)
          } else if (cmd == `${prf}cogan` || cmd == `${prf}cowok` || cmd == `${prf}cowo`) {
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               const cogan = JSON.parse(fs.readFileSync('./lib/database/cogan.json'))
               const cowo = Math.floor(Math.random() * cogan.length)
               sendDariUrl(from, cogan[cowo], TypePsn.image, `Cowo nya ${pushname}`)
          } else if (cmd == `${prf}linkgrup` || cmd == `${prf}linkgrup`) {
               if (!isGroup) return balas(from, `Harus didalam grup!`)
               if (!isBotAdmin) return balas(from, `Maaf Bot harus dijadikan admin terlebih dahulu!`)
               const linkgc = await conn.groupInviteCode(from)
               balas(from, `Link grup ${metadata.subject} : https://chat.whatsapp.com/${linkgc}`)
          } else if (cmd == `${prf}add`) {
               if (!isOwner) return balas(from, `Fitur ini masih rawan bot terbanned`)
               if (!isGroup) return balas(from, `Harus didalam grup!`)
               if (!isAdmin) return balas(from, `Maaf anda bukan admin`)
               if (!isBotAdmin) return balas(from, `Maaf Bot harus dijadikan admin terlebih dahulu!`)
               if (args.length === 1) return balas(from, `Masukan Nomer`)
               const data = args[1].replace(noSym, '')
               conn.groupAdd(from, [data + '@s.whatsapp.net'])
                    .then(() => conn.sendMessage(from, `Sukses menambahkan @${data}`), TypePsn.text, { quoted: customQuote('GROUP ADD PARTICIPANT'), contextInfo: { mentionedJid: [data + '@s.whatsapp.net'] } })
                    .catch((e) => {
                         console.log(e)
                         balas(from, `Gagal memasukan member!`)
                    })
          } else if (cmd == `${prf}msgtoconsole`) {
               if (!isOwner) return balas(from, `Maaf anda bukan owner / pemilik bot ini`)
               if (settings.MessageConsole) {
                    settings.MessageConsole = false
                    fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
                    balas(from, `Pesan chat di console telah dimatikan ❌`)
               } else {
                    settings.MessageConsole = true
                    fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
                    balas(from, `Berhasil mengaktifkan pesan chat di console ✅`)
               }
          } else if (cmd == `${prf}maintenance`) {
               if (!isOwner) return balas(from, `Maaf anda bukan owner / pemilik bot ini`)
               if (settings.Maintenace) {
                    settings.Maintenace = false
                    fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
                    balas(from, `Mode maintenace telah dimatikan ❌`)
               } else {
                    settings.Maintenace = true
                    fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
                    balas(from, `Berhasil mengaktifkan mode maintenace ✅`)
               }
          } else if (cmd == `${prf}vip`) {
               if (!isOwner) return balas(from, `Ingin VIP? Chat owner.. ketik *!owner*`)
               if (args.length === 1) return balas(from, `Penggunaan *!vip <add/delete/list> <@tagMember>*`)
               if (args[1] == 'add') {
                    if (!isOwner) return balas(from, `Maaf anda bukan owner / pemilik bot ini`)
                    const ji = args[2].replace('@', '') + '@s.whatsapp.net'
                    if (args.length === 2) return balas(from, `Mohon tag membernya!`)
                    if (args.length === 3) return balas(from, `Masukan data hari!`)
                    vip.push(ji)
                    expvip.push({
                         number: ji,
                         expired_on: moment(new Date()).add(Number(args[3]), 'days').valueOf(),
                         remaining: ''
                    })
                    fs.writeFileSync('./lib/database/expvip.json', JSON.stringify(expvip, null, 2))
                    fs.writeFileSync('./lib/database/vip.json', JSON.stringify(vip, null, 2))
                    conn.sendMessage(from, `${args[2]} telah menjadi VIP member ✅`, TypePsn.text, { quoted: hurtz, contextInfo: { mentionedJid: [ji] } })
               } else if (args[1] == 'delete') {
                    if (!isOwner) return balas(from, `Maaf anda bukan owner / pemilik bot ini`)
                    const ji = args[2].replace('@', '') + '@s.whatsapp.net'
                    if (args.length === 2) return balas(from, `Mohon tag membernya!`)
                    let vipl = []
                    for (let i in expvip) {
                         vipl.push(expvip[i].number)
                    }
                    const index = vipl.indexOf(ji)
                    // console.log(index, ji, util.format(vipl))
                    expvip.splice(index, 1)
                    fs.writeFileSync('./lib/database/expvip.json', JSON.stringify(expvip, null, 2))
                    conn.sendMessage(from, `${args[2]} telah diberhentikan dari VIP member ❌`, TypePsn.text, { quoted: hurtz, contextInfo: { mentionedJid: [ji] } })
               } else if (args[1] == 'list') {
                    let content = `*[ Menampilkan list VIP member 💠 ]*\n\n*Terdapat ${vip.length} nomer*\n`
                    let listed_number = []
                    for (let i = 0; i < expvip.length; i++) {
                         const expair = getRemaining(new Date(expvip[i].expired_on))
                         content += `\n${1 + i}. @${expvip[i].number.replace('@s.whatsapp.net', '')} ( Tersisa ${expair.days} hari )`
                         listed_number.push(expvip[i].number)
                    }
                    conn.sendMessage(from, content, TypePsn.text, { quoted: hurtz, contextInfo: { mentionedJid: listed_number } })
               } else {
                    balas(from, `Penggunaan *!vip <add/delete/list> <@tagMember>*`)
               }
          } else if (cmd == `${prf}sambutan`) {
               if (args[1] == 'aktif') {
                    sambutan.push(groupMetadata.id)
                    fs.writeFileSync('./lib/data_sambutan.json', JSON.stringify(sambutan, null, 2))
                    conn.sendMessage(from, `Fitur sambutan telah diaktifkan pada grup ${groupMetadata.subject}!`)
               } else if (args[1] == 'mati') {
                    let index = sambutan.indexOf(groupMetadata.id)
                    sambutan.splice(index, 1)
                    fs.writeFileSync('./lib/data_sambutan.json', JSON.stringify(sambutan, null, 2))
                    conn.sendMessage(from, `Fitur sambutan telah dinonaktifkan pada grup ${groupMetadata.subject}!`)
               }
          } else if (cmd == `${prf}gambar` || cmd == `${prf}image` || cmd == `${prf}foto`) {
               if (args.length === 1) return balas(from, `Kirim perintah pencarian gambar google dengan cara ketik perintah :\n*!gambar* _Query search_\nContoh :\n*!gambar* _Mobil_`)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               ImageSearch(query)
                    .then((result) => {
                         let acak = Math.floor(Math.random() * result.length)
                         sendDariUrl(from, result[acak], TypePsn.image, `*Hasil Pencarian dari ${query}*`)
                    }).catch(() => balas(from, `*Tidak bisa menemukan gambar* : ${query}`))
          } else if (cmd == `${prf}tebaksetting` || cmd == `${prf}tebaksettings`) {
               if (!isOwner) return balas(from, `Hanya owner!`)
               if (args.length === 1) return balas(from, `Mohon masukan nominal dalam detik! contoh : *!tebaksetting 60* (Satu menit)`)
               settings.Tebak_Gambar.Max = Number(args[1])
               fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
               balas(from, `Pengaturan tebak gambar telah diperbaharui ✅`)
          } else if (cmd == `${prf}tebak` || cmd == `${prf}tebakgambar` || cmd == `${prf}gambartebak`) {
               const reader = fs.readdirSync(`./lib/tebak-gambar/`)
               if (reader.includes(from + '.json')) {
                    balas(from, `Maaf sesi tebak gambar sedang berlangsung`)
                    const datanya = JSON.parse(fs.readFileSync(`./lib/tebak-gambar/${from}.json`))
                    conn.sendMessage(from, `Ini dia 👆👆👆`, TypePsn.text, { quoted: datanya.message })
               } else {
                    if (!cekLimit(sender, settings.Limit)) {
                         conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                              quoted: hurtz,
                              contextInfo: { mentionedJid: [nomerOwner[0]] }
                         })
                         return
                    }
                    pushLimit(sender, 5)
                    const nebak = await tebak_gambar()
                    INFOLOG('Jawaban : ' + nebak.jawaban + `( ${from} )`)
                    const regextebak = new RegExp('[^aeiou ]', 'g')
                    request({
                         url: nebak.img,
                         encoding: null
                    }, (err, resp, buffer) => {
                         conn.sendMessage(from, buffer, TypePsn.image, { quoted: hurtz, caption: `*Tebak gambar diatas ini*\n\nAnda mempunyai waktu ${settings.Tebak_Gambar.Max} detik untuk menebak gambar tersebut.\n\n_Note : untuk mengubah detik ketik *!tebaksetting*_\n\n*CLUE* :   ${nebak.jawaban.replace(regextebak, '_').split('').join(' ')}\n\n\`\`\`Sedang menunggu jawaban...\`\`\`` })
                              .then((obe) => {
                                   // console.log(obe)
                                   const objektebak = {
                                        status: true,
                                        name: pushname,
                                        number: sender,
                                        remaining: '',
                                        expired_on: moment(new Date()).add(settings.Tebak_Gambar.Max, 'seconds').valueOf(),
                                        message: obe,
                                        data: {
                                             img: nebak.img,
                                             answer: nebak.jawaban
                                        },
                                        listed: []
                                   }
                                   fs.writeFileSync(`./lib/tebak-gambar/${from}.json`, JSON.stringify(objektebak, null, 2))
                              })
                    })
               }
          } else if (fs.existsSync(`./lib/tebak-gambar/${from}.json`)) {
               const badan = body.toLowerCase()
               const datana = JSON.parse(fs.readFileSync(`./lib/tebak-gambar/${from}.json`))
               datana.listed.push(hurtz)
               fs.writeFileSync(`./lib/tebak-gambar/${from}.json`, JSON.stringify(datana, null, 2))
               if (badan.includes(datana.data.answer.toLowerCase())) {
                    INFOLOG('Jawaban benar oleh : ' + pushname)
                    const ngacak = Math.floor(Math.random() * 20) + 1
                    giftLimit(sender, ngacak)
                    balas(from, `Selamat! ${pushname} anda benar 😊 request limit anda telah ditambahkan sebesar ${ngacak} ✅\n\nMau main lagi? ketik : *!tebakgambar*`)
                    fs.unlinkSync(`./lib/tebak-gambar/${from}.json`)
               }
          } else if (cmd == `${prf}google` || cmd == `${prf}search`) {
               if (args.length === 1) return balas(from, `Kirim perintah Google search dengan cara ketik perintah :\n*!search* _Query search_\nContoh :\n*!search* _Detik News hari ini_`)
               if (query == undefined || query == ' ') return balas(from, `_Kesalahan tidak bisa menemukan hasil from ${query}_`, id)
               if (!cekLimit(sender, settings.Limit)) {
                    conn.sendMessage(from, `[ ⚠️ ] Out Of limit [ ⚠️ ]\n\n*Limit anda telah mencapai batas!*\n\n\`\`\`Limit amount akan direset dalam ${countResetLimit}\`\`\`\n\nDonate untuk mendapat lebih banyak limit._`, TypePsn.text, {
                         quoted: hurtz,
                         contextInfo: { mentionedJid: [nomerOwner[0]] }
                    })
                    return
               }
               pushLimit(sender, 1)
               crawl(query)
                    .then(results => {
                         let captserch = `_*Hasil Pencarian dari*_ ${query}\n`
                         for (let i = 0; i < results.length; i++) {
                              captserch += `\n\n===================================\n\n`
                              captserch += `\n*Judul* : ${results[i].title}\n*Deskripsi* : ${results[i].desc}\n*Link* : ${results[i].url}\n`
                         }
                         balas(from, captserch);
                    }).catch(e => {
                         ERRLOG(e)
                         balas(nomerOwner, e);
                    })
          } else if (cmd == `${prf}fakedeface`) {
               if (args.length === 1) return balas(from, `Penggunaan *!fakedeface <TITLE|DESC>*`)
               // const urlss = query.split('|')[0]
               const ranid = "M3CH4" + Crypto.randomBytes(4).toString('hex').toUpperCase()
               const custhumb = {
                    key: {
                         remoteJid: from,
                         fromMe: true,
                         id: ranid
                    },
                    message: {
                         extendedTextMessage: {
                              text: 'https://nasa.gov',
                              matchedText: 'https://nasa.gov',
                              description: query.split('|')[0],
                              title: query.split('|')[1],
                              previewType: 'dsdds',
                              jpegThumbnail: fs.readFileSync('./media/img.jpeg'),
                              contextInfo: {
                                   stanzaId: hurtz.key.id,
                                   participant: sender,
                                   quotedMessage: hurtz.message,
                                   mentionedJid: [nomerOwner[0]]
                              }
                         }
                    },
                    messageTimestamp: moment.unix()
               }
               conn.relayWAMessage(custhumb)
          } else if (cmd == `${prf}linkgrupmecha` || cmd == `${prf}linkgroupmecha`) {
               conn.groupInviteCode('6285559038021-1605869468@g.us').then(code => balas(from, `_Join Mecha Group : [ https://chat.whatsapp.com/${code} ]_`)).catch(console.log)
          } else if (cmd == `${prf}info` || cmd == `${prf}infobot`) {
               const penggunanya = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
               const performa = speed()
               const isCas = battery[1].live == 'true' ? "Sedang di cas ✅⚡" : "Tidak di cas 🔌❌"
               const batteryNow = battery[1].value
               const hi = pushLimit(sender, 0)
               const latensi = speed() - performa
               var uptime = process.uptime();
               const date = new Date(uptime * 1000);
               const days = date.getUTCDate() - 1,
                    hours = date.getUTCHours(),
                    minutes = date.getUTCMinutes(),
                    seconds = date.getUTCSeconds(),
                    milliseconds = date.getUTCMilliseconds();
               let segments = [];
               if (days > 0) segments.push(days + ' Hari');
               if (hours > 0) segments.push(hours + ' Jam');
               if (minutes > 0) segments.push(minutes + ' Menit');
               if (seconds > 0) segments.push(seconds + ' Detik');
               if (milliseconds > 0) segments.push(milliseconds + ' milidetik');
               const dateString = segments.join(', ');
               const msgInfoBot = `     *[ Bot Status & Info ]*

👬 *Pengguna Bot Aktif* : ${penggunanya.length} Orang
👩‍🏫 *Waktu Bot Aktif* : ${dateString}
⏲️ *Reset Limit Pada* : ${countResetLimit}
📲 *Versi WA* : _${conn.user.phone.wa_version}_
🔋 *Batre* : _${batteryNow}% ${isCas}_
💻 *Host* : _${os.hostname()}_
📱 *Device* : _${conn.user.phone.device_manufacturer} Versi OS ${conn.user.phone.os_version}_
⚖️ *Ram Usage* : _${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
🧿 *Platform* : _${os.platform()}_
🔌 *CPU* : _${os.cpus()[0].model.replace(/ /g, '')}_
⚡ *Speed Process* : _${latensi.toFixed(4)}_
🕴 *Status Maintenance* : ${settings.Maintenace ? '✅' : '❌'}
🤖 *Join Mecha Group* :

[ https://chat.whatsapp.com/KVc2MuopydYJ1cJmiXhxie ] S1
[ https://chat.whatsapp.com/BGz644tprlY0Ee539LUW3m ] S2`
               balas(from, msgInfoBot)
          } else if (cmd == `${prf}menu` || cmd == `${prf}help`) {
               INFOLOG('Sending Menu')
               const penggunanya = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
               const performa = speed()
               const isCas = battery[1].live == 'true' ? "Sedang di cas ✅⚡" : "Tidak di cas 🔌❌"
               const batteryNow = battery[1].value
               const hi = pushLimit(sender, 0)
               const latensi = speed() - performa
               var uptime = process.uptime();
               const date = new Date(uptime * 1000);
               const days = date.getUTCDate() - 1,
                    hours = date.getUTCHours(),
                    minutes = date.getUTCMinutes(),
                    seconds = date.getUTCSeconds(),
                    milliseconds = date.getUTCMilliseconds();
               let segments = [];
               if (days > 0) segments.push(days + ' Hari');
               if (hours > 0) segments.push(hours + ' Jam');
               if (minutes > 0) segments.push(minutes + ' Menit');
               if (seconds > 0) segments.push(seconds + ' Detik');
               if (milliseconds > 0) segments.push(milliseconds + ' milidetik');
               const dateString = segments.join(', ');
               const strMenu = `Hii ${pushname} ✨
Limit Anda : ${Number(hi[0].limit) < 1 ? 0 + " ❌" : hi[0].limit + " ✅"}
Plan : ${isVIP ? 'VIP MEMBER 💠' : 'FREE MEMBER 🏋'}

💌 Contact My WhatsApp : @6285559038021 
📮 Follow My Instagram : hzzz.formech_

Map >>

⚪ : Fitur member tanpa limit
🔷 : Fitur admin dan limit +1
💚 : Fitur member dan limit +1
💛 : Fitur member dan limit +2
🉐 : Fitur member dan limit +5
🔴 : Fitur VIP (No limit)

----------------------------------------

👬 *Pengguna Bot Aktif* : ${penggunanya.length} Orang
👩‍🏫 *Waktu Bot Aktif* : ${dateString}
⏲️ *Reset Limit Pada* : ${countResetLimit}
📲 *Versi WA* : _${conn.user.phone.wa_version}_
🔋 *Batre* : _${batteryNow}% ${isCas}_
💻 *Host* : _${os.hostname()}_
📱 *Device* : _${conn.user.phone.device_manufacturer} Versi OS ${conn.user.phone.os_version}_
⚖️ *Ram Usage* : _${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
🧿 *Platform* : _${os.platform()}_
🔌 *CPU* : _${os.cpus()[0].model.replace(/ /g, '')}_
⚡ *Speed Process* : _${latensi.toFixed(4)}_
🕴 *Status Maintenance* : ${settings.Maintenace ? '✅' : '❌'}
🤖 *Join Mecha Group* :

[ https://chat.whatsapp.com/KVc2MuopydYJ1cJmiXhxie ] S1
[ https://chat.whatsapp.com/BGz644tprlY0Ee539LUW3m ] S2

     *[ Free Features & Info ]*

⚪ !menu _[Menampilkan seluruh menu]_
⚪ !runtime _[Menampilkan waktu bot berjalan]_
⚪ !limit _[Menampilkan limit]_
⚪ !translate <Kode Bahasa> <Teks> _[Translate Pesan]_
⚪ !linkgrupmecha _[Menampilkan Link Grup Bot Mecha]_

     *[ Fitur VIP ]*

🔴 !hidetag <teksnya> _[Tag orang tanpa terlihat sedang tag]_
🔴 !fakereply <@TagMember|Pesan orang|Pesan bot> _[Balas pesan palsu]_
🔴 !sticker wm <Pack>|<Author> _[Sticker custom watermarkgit]_

     *[ Fitur Voting ]*

Note : Khusus fitur ini tanpa prefix!

⚪ votelist _[Melihat list vote]_
💚 votesetting <Maksimal vote>|<Waktu expired vote> _[Pengaturan vote]_
💚 votestart <@tagMember> <Alasan> _[Memulai sesi voting]_
 | ⚪ vote _[Vote jika setuju]_
 | ⚪ devote _[Vote jika tidak setuju]_ 

     *[ Fitur Games ]*

🉐 !tebakgambar _[Mengaktifkan permainan tebak gambar]_
 | ⚪ <jawaban> _[Langsung ketik jawaban tanpa prefix]_
 | ⚪ sisa _[Unuk melihat waktu tersisa untuk menjawab]_
🉐 !charagame <enable/disable> _[Mengaktifkan character game]_
 | ⚪ !addchara <Nama Character> _[Menambah karakter anime]_
 | ⚪ !guess <Nama Character> _[Tebak untuk karakter yang bot kirim]_
 | ⚪ !gallery / !gallery <@tagUser> _[Melihat list galery karakter terklaim]_
 | ⚪ !charalist _[Melihat semua chara di database]_
💛 !minesweeper _[Mengaktifkan game minesweeper]_
 | ⚪ isi <y x> _[Mengisi sel dengan koordinat y x]_

     *[ Fitur Social Media & Download ]*

💚 !igstalk <@username> _[Melihat Profile Instagram]_
💚 !igsearch <@username> _[Mencari Profile Instagram]_
💚 !ig <https://linkig> _[IG Downloader]_
💚 !twitter <https://linktwitter> _[Twitter Video Downloader]_
💚 !facebook <https://linkfacebook> _[Facebook Video Downloader]_
💚 !tiktok <https://linktiktok> _[Tiktok Downloader]_
💚 !tts <Kode negara> <Teksnya> _[Teks ke vn]_
💚 !listkodebahasa _[Menampilkan list kode bahasa]_
💚 !tomp3 <TagVideo> _[Extract video ke audio]_
💚 !pitch <Nomer dari -10 sampai 10> _[Merubah Pitch Suara]_
💚 !getpp <@tagmember> _[Mengambil Foto Profil]_
💛 !play <Judul Lagu> _[Memainkan lagu dari YT]_
💛 !ytmp3 <https://linkyt> _[Youtube Download MP3]_
💛 !ytmp4 <https://linkyt> _[Youtube Download MP4]_

     *[ Fitur stiker ]*

💚 !stiker <Stickerpack|Author> _(Watermark boleh tidak diisi dan bisa tag media)_
💚 !trigger <@TagMember> _[Efek triggered]_
💚 !tomedia <TagStiker> _[Stikergif ke video]_
💚 !ttp <TEXT> _[Text To Sticker]_

     *[ Fitur Admin ]* 

🔷 !antidelete <aktif/mati> _[Anti penghapusan pesan]_
🔷 !title <teksnya> _[Mengubah judul grup]_
🔷 !desc <teksnya> _[Mengubah deskripsi grup]_
🔷 !mutegrup _[Setting group chat hanya admin]_
🔷 !unmutegrup _[Setting group chat untuk semua member]_
🔷 !promote <@tagMember> _[Menaikan jabatan member jadi admin]_
🔷 !demote <@tagMember> _[Menurunkan admin jadi member]_ (Tidak berlaku untuk pembuat grup)
🔷 !infogrup <aktif/mati> _[Info keluar/masuk/audit jabatan untuk ditampilkan]_

     *[ Autoresponder ]*

💚 !respon tambah <Kunci Pertanyaan|Respon BOT> _[Menambah respon untuk bot]_
💚 !respon tambahtanpatag <Kunci Pertanyaan|Respon BOT> _[Menambah respon untuk bot tanpa reply]_
💚 !respon hapus <Kunci Pertanyaan> _[Menghapus respon dari bot]_
💚 !respon list _[Melihat seluruh respon bot]_
     
     *[ Fitur Gacha ]*

💚 !wallpaper _[Random Wallpaper Unsplash]_
💚 !cecan _[Random ciwi cantik]_
💚 !cogan _[Random cowo ganteng]_
💚 !rate _[Nilai dan Rating]_
💚 !apakah <Pertanyaan> _[Bertanya sesuatu?]_

     *[ Fitur Image Manipulate ]*

💚 !harta <teks> _[Gambar Harta Tahta]_
💚 !nulis <teks> _[Nulis di kertas]_
💚 !warnai <TagGambar> _[Mewarnai gambar hitam putih]_
💛 !brokeCard <TagGambar>
💛 !iphone <TagGambar>
💛 !underwater <TagGambar>
💛 !drawing <TagGambar>
💛 !burningfire <TagGambar>
💚 !smoke <teksnya>
💚 !harrypotter <Teksnya>
💚 !horrorHouse <teksnya>
💚 !coffee <teksnya>
💚 !battlefield <teks1|teks2>
💚 !googleKeyword <teks1|teks2|teks3>
💛 !gtaV <TagGambar>
💚 !glitch <text>
💚 !rain <text>
💚 !sea <text>
💚 !neon <text>
💚 !stars <text>
💚 !wood <text>
💚 !darklogo <text>
💛 !nightsea <tagGambar>
💛 !photoglitch <tagGambar>
💛 !anaglyph <tagGambar>
💛 !balloon <tagGambar>
💛 !typographic <tagGambar>
💛 !photosky <tagGambar>
💛 !wanted <Nama|Harga> (Sambil Tag Gambar)
💛 !fireworkvideo <TagGambar>
💛 !cooldesign <text>
💛 !colorfuldesign <text>
💛 !armydesign <text>

     *[ Fitur Search ]*

💚 !heroml <nama hero> _[Menampilkan Detail Hero Mobile Legends]_
 | ⚪ !herolist _[Menampilkan semua nama nama hero ML]_
💚 !chord <lagu> _[Mencari Chord Musik]_
💚 !apk <Nama Aplikasi/Game> _[Mencari APP / GAME APK]_
 | 💚 !getapk <Id Download> _[Melihat detail dan link download]_
 | 🔴 !getapkdirect <index> <Id Download> _[Download APK Langsung]_
💚 !yts <Judul Video/Musik> _[Pencarian Youtube]_
💚 !google <Teks> _[Pencarian Google]_
💚 !pinterest <Teks> _[Pencarian Pinterest]_
💚 !lirik <Judul lagu> _[Cari Lirik Lagu]_
💚 !video <Judul Video> _[Pencarian lagu]_
 | 💛 !getvideo <id> \`\`\`atau\`\`\` !getvideo <urutan>
💚 !musik <Judul Lagu> _[Pencarian lagu]_
 | 💛 !getmusik <id> \`\`\`atau\`\`\` !getmusik <urutan>

     *[ Owner Feature ]*

💗 !upstory <?txt>/<?img>/<?vid> <caption> _[Update Story]_
💗 !refuel <jumlah> _[Isi ulang semua limit]_
💗 !leave _[Keluar grup]_
💗 !reset <jumlah> _[Reset semua limit]_
💗 !restart _[Restart bot]_
💗 !gift <@tagMember> <jumlah> _[Gift limit]_
💗 !msgtoconsole _[Pesan WhatsApp ke Console Log]_
💗 !tambahbot <namasesi> <@tagYgMauJadiBot> _[Tambah bot baru / jalankan]_
💗 !vip <add/delete/list> <@tagMember> _[Mengaudit Member VIP]_
💗 !maintenance <Set Untuk Maintenance BOT>
💗 !startbot <namasesi> _[Memulaikan bot kembali]_
💗 !stopbot <namasesi> _[Memberhentikan bot]_
💗 !hapusbot <namasesi> _[Menghapus bot]_
💗 !listbot _[Melihat semua user bot]_
💗 > <query> _[Perintah untuk execute command yang terbatas dan teratur]_
💗 >> <query> _[Perintah untuk execute command prompt / terminal]_
💗 >>> <query> _[Perintah untuk execute function dalam code bot]_


*[NOTE]*
> _Ini termasuk Bot DGC ChatBot V4 lalu ganti nama jadi MechaBot_
> _Bot ini multiprefix namun prefix utamanya adalah !_
> _Format memakai <> itu sebagai petunjuk untuk diisikan_
> _Gunakan bot dengan bijak_
╰╼ _MechaBOT ©2020 ᴍᴀᴅᴇ ʙʏ_ 💗`
               const ranid = "M3CH4" + Crypto.randomBytes(4).toString('hex').toUpperCase()
               let expired = ''
               for (let index = 0; index <= 10; index++) { expired += 9 }
               const custhumb = {
                    key: {
                         remoteJid: from,
                         fromMe: true,
                         id: ranid
                    },
                    message: {
                         extendedTextMessage: {
                              text: strMenu,
                              matchedText: 'https://chat.whatsapp.com/KVc2MuopydYJ1cJmiXhxie',
                              description: 'BOT WhatsApp',
                              title: '(    🤖 MENU MECHABOT 🤖    )',
                              previewType: 'NONE',
                              jpegThumbnail: fs.readFileSync('./media/img.jpeg'),
                              contextInfo: {
                                   stanzaId: hurtz.key.id,
                                   participant: sender,
                                   quotedMessage: hurtz.message,
                                   mentionedJid: [nomerOwner[0]]
                              }
                         }
                    },
                    messageTimestamp: new Date() / 1000
               }
               const custreph = {
                    key: {
                         remoteJid: from,
                         fromMe: true,
                         id: ranid
                    },
                    message: {
                         extendedTextMessage: {
                              text: strMenu, previewType: 'NONE',
                              contextInfo: {
                                   stanzaId: '',
                                   participant: '0@s.whatsapp.net',
                                   quotedMessage: {
                                        conversation: '			(    🤖 MENU MECHABOT V1.3.2 🤖    )'
                                   },
                                   remoteJid: '6285559038021-1605869468@g.us',
                                   mentionedJid: [nomerOwner[0]],
                              }
                         }
                    },
                    messageTimestamp: new Date() / 1000,
                    status: 'ERROR',
                    ephemeralOutOfSync: false
               }
               const content = await conn.prepareMessageContent(
                    strMenu,
                    TypePsn.extendedText,
                    { quoted: hurtz }
               )
               conn.prepareMessageFromContent(from, content, { quoted: hurtz })
               conn.relayWAMessage(custreph)
               // Fix
               // conn.sendMessage(from, strMenu, TypePsn.text, { quoted: customQuote('			(    🤖 MENU MECHABOT V1.3.2 🤖    )'), contextInfo: { mentionedJid: [nomerOwner[0]] } })
          }
     }
}
