const { createExif } = require('./lib/create-exif')
const chalk = require('chalk')
const moment = require('moment')
const { getFilesize } = require('./lib/func')
const fs = require('fs')
const util = require('util')
const os = require('os')
const Table = require('cli-table')
const sharp = require('sharp')
const speed = require('performance-now')
const { text2img } = require('./lib/text2img')
const canvacord = require("canvacord");
const { baseURI, ytsr, yta, ytv, buffer2Stream, stream2Buffer, noop } = require('./lib/ytdl')
const { getApk, getApkReal, searchApk, sizer } = require('./lib/apk')
const { exec, spawn } = require('child_process')
const { webp2mp4File, reverseVideoFile, mp42mp3, mp32mp4, uploadwebp, webp2mp4Url, apng2webpUrl } = require('./lib/converter')
const mktemp = require('mktemp')
const { getStikerLine } = require('./lib/stickerline')
const { default: Axios } = require('axios')
const { kode } = require('./lib/kodebhs')
const emoji = require('node-emoji')
const { Grid } = require('minesweeperjs')
const { advancedglow, futuristic, cloud, blackpink, sand, scifi, dropwater, codmw, bokeh, neon, thunder, horrorblood, firework, bloodglass, neonlight, marvel, phub, glitch, brokeCard, iphone, underwater, drawing, burningFire, semok, harryPotter, horrorHouse, coffee, battlefield, googleKeyword, gunBanner, gtaV, dota } = require('./lib/image-manipulation')
const { relativeTimeRounding } = require('moment')
const time = moment().format('DD/MM HH:mm:ss')

function INFOLOG(info) {
     console.log('\x1b[1;34m~\x1b[1;37m>>', '[\x1b[1;33mINF\x1b[1;37m]', time, color(info))
}

function ERRLOG(e) {
     console.log('\x1b[1;31m~\x1b[1;37m>>', '[\x1b[1;31mERROR\x1b[1;37m]', time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
}

module.exports = handle = async (GroupSettingChange, Mimetype, MessageType, conn, hurtz, chat) => {
     let infoMSG = JSON.parse(fs.readFileSync('./lib/database/msgInfo.json'))
     infoMSG.push(JSON.parse(JSON.stringify(hurtz)))
     fs.writeFileSync('./lib/database/msgInfo.json', JSON.stringify(infoMSG, null, 2))
     const urutan_pesan = infoMSG.length
     if (urutan_pesan === 5000) {
          infoMSG.splice(0, 4300)
          fs.writeFileSync('./lib/database/msgInfo.json', JSON.stringify(infoMSG, null, 2))
     }
     if (hurtz.key && hurtz.key.remoteJid == 'status@broadcast') return
     if (!hurtz.message) return
     const groupMines = JSON.parse(fs.readFileSync('./lib/database/group-minesweeper.json'))
     const dataRevoke = JSON.parse(fs.readFileSync('./lib/database/RevokedGroup.json'))
     const from = hurtz.key.remoteJid
     const konten = JSON.stringify(hurtz.message, null, 2)
     const TypePsn = MessageType
     const self = hurtz.key.fromMe
     const isGroup = from.endsWith('@g.us')
     const type = Object.keys(hurtz.message)[0]
     const body = type == 'conversation' ? hurtz.message.conversation : type == 'extendedTextMessage' ? hurtz.message.extendedTextMessage.text : type == 'imageMessage' ? hurtz.message.imageMessage.caption : type == 'stickerMessage' ? 'Sticker' : type == 'audioMessage' ? 'Audio' : type == 'videoMessage' ? hurtz.message.videoMessage.caption : type == 'documentMessage' ? 'document' : hurtz.message
     const args = body.split(' ')//
     const cmd = body.toLowerCase().split(' ')[0] || ''
     const prf = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/gi) : '-'
     const anticol = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g
     const isMedia = (type === 'imageMessage' || type === 'videoMessage')
     const isQuotedImage = type === 'extendedTextMessage' && konten.includes('imageMessage')
     const isQuotedVideo = type === 'extendedTextMessage' && konten.includes('videoMessage')
     const isQuotedSticker = type === 'extendedTextMessage' && konten.includes('stickerMessage')
     const isQuotedAudio = type === 'extendedTextMessage' && konten.includes('audioMessage')
     const mediaData = type === 'extendedTextMessage' ? JSON.parse(JSON.stringify(hurtz).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : hurtz
     const isCmd = body.startsWith(prf)
     const sender = self ? conn.user.jid : isGroup ? hurtz.participant : hurtz.key.remoteJid
     const botNumber = conn.user.jid
     const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
     const groupName = isGroup ? groupMetadata.subject : ''
     const groupId = isGroup ? groupMetadata.id : ''
     const isImageMsg = type == 'imageMessage' ? true : false
     const isVideoMsg = type == 'videoMessage' ? true : false
     const dataImgQuote = isQuotedImage ? JSON.parse(JSON.stringify(hurtz.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage.caption)) : '{"Data":"Apasu :v"}'
     const battery = JSON.parse(fs.readFileSync('./lib/database/batt.json'))

     const isGrupMines = groupMines.includes(from)

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
               member.push(result.id.replace('@c.us', '@s.whatsapp.net'))
          })
          conn.sendMessage(from, text, TypePsn.text, {
               text: text,
               contextInfo: { mentionedJid: member }
          })
     }

     async function sendDariUrl(dari, url, type, text) {
          if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(url)) return console.error(`Not a valid url!`)
          const caption = text || ''
          const buffData = await Axios.request({
               method: 'GET',
               url: url,
               responseType: 'arraybuffer',
               responseEncoding: 'binary'
          });
          conn.sendMessage(dari, buffData.data, type, { quoted: hurtz, caption: caption })
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

     //End Of Func!
     const conts = hurtz.key.fromMe ? conn.user.jid : conn.contacts[sender] || { notify: jid.replace(/@.+/, '') }
     const pushname = hurtz.key.fromMe ? conn.user.name : conts.notify || conts.vname || conts.name || '-'


     if (chat.presences) { // receive presence updates -- composing, available, etc.
          Object.values(chat.presences).forEach(presence => {
               if (presence.lastKnownPresence === 'available' || presence.lastKnownPresence == 'unavailable') return
               const statusKontak = presence.lastKnownPresence === 'composing' ? 'sedang mengetik' : ''
               INFOLOG(`${presence.name} sekarang ${statusKontak} di ${isGroup ? groupName : pushname}`)
          })
     }

     function customQuote(isi) {
          return { key: { fromMe: true }, message: { conversation: isi } }
     }

     // Tipe pesan
     const text = TypePsn.text
     const video = TypePsn.video
     const location = TypePsn.location
     const image = TypePsn.image
     const sticker = TypePsn.sticker
     // End line TypePsn 


     const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`


     // console.log(JSON.parse(dataImgQuote))
     // if (self) return
     // console.log(hurtz)
     if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>>', ' < ' + chalk.blueBright('CMD') + ' > ', time, color(body), 'dari', color(pushname), 'ID Chat', color(from), 'Urutan', color(urutan_pesan))
     if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>>', '<' + chalk.greenBright('MSG') + '>', time, color(body), 'dari', color(pushname), 'ID Chat', color(from), 'Urutan', color(urutan_pesan))
     if (isCmd && isGroup) console.log('\x1b[1;33m~\x1b[1;37m>>', '<' + chalk.blueBright('CMD') + '>', time, color(body), 'dari', color(pushname), 'di', color(groupName), 'ID Chat', color(from), 'Urutan', color(urutan_pesan))
     if (!isCmd && isGroup) console.log('\x1b[1;33m~\x1b[1;37m>>', '<' + chalk.greenBright('MSG') + '>', time, color(body), 'dari', color(pushname), 'di', color(groupName), 'ID Chat', color(from), 'Urutan', color(urutan_pesan))





     const db = JSON.parse(fs.readFileSync('./lib/new-chat/database.json'))
     // const from = '62857313534sa1@s.whatsapp.net'
     const nomerOwner = ['6285559038021@s.whatsapp.net']
     const isOwner = nomerOwner.includes(sender)
     const isExist = db.number.includes(from)
     const now = moment().unix()
     const after = moment().add(1, 'hours').unix()
     const db_black = JSON.parse(fs.readFileSync('./lib/new-chat/blacklist.json'))
     const isPrivateChat = from.endsWith('@s.whatsapp.net')
     const isBlacklist = db_black.includes(from.replace('@s.whatsapp.net', ''))
     const MessageSelf = `Hai ${pushname} 👋🏻\n\n*MRHRTZ* sedang sibuk sekarang\nmohon tinggalkan pesan disini dan dia akan segera membalas!.\n-\n*MRHRTZ* is busy right now\nplease leave a message here and he will reply right away!`
     // const MessageSelf = `Hai ${pushname} 👋🏻\n\n*JUMATAN DULUUUUUU!!!*`
     if (isExist && isPrivateChat && !self && !isBlacklist) {
          const index = db.number.indexOf(from)
          const isNow = db.timestamp_after[index] <= now
          if (isNow) {
               console.log(` ${now} ][\]>= ${db.timestamp_after[index]} || MESSAGES!!`)
               conn.sendMessage(from, MessageSelf, text, { quoted: { key: { fromMe: true }, message: { conversation: "🤖 _*THIS IS MRHRTZ SELFBOT ASSISTANT*_ 🤖" } } })
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
          conn.sendMessage(from, MessageSelf, text, { quoted: { key: { fromMe: true }, message: { conversation: "🤖 _*THIS IS MRHRTZ SELFBOT ASSISTANT*_ 🤖" } } })
          db.number.push(from)
          db.timestamp_after.push(after)
          fs.writeFileSync('./lib/new-chat/database.json', JSON.stringify(db, null, 2))
          console.log(`Adding data!`)
     }
     // Object.defineProperty(hurtz, "message.extendedTextMessage.text", {value:"Emm"})
     // if (!self) return


     if (body.startsWith('> ') && sender == '6285559038021@s.whatsapp.net') {
          INFOLOG(pushname, 'mencoba execute perintah')
          let type = Function
          if (/await/.test(body)) type = AsyncFunction
          let func = new type('print', 'exec', 'conn', 'Axios', 'moment', 'fs', 'process', 'mediaData', 'from', 'TypePsn', 'hurtz', 'Mimetype', 'anticol', 'mktemp', 'chat', body.slice(2))
          let output
          try {
               output = func((...args) => {
                    INFOLOG(...args)
                    balas(from, util.format(...args))
               }, exec, conn, Axios, moment, fs, process, mediaData, from, TypePsn, hurtz, Mimetype, anticol, mktemp, chat)
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

     if (hurtz.message.conversation == null) {
          console.log('No error, lanjutkan..')
     }
     // console.log(hurtz)
     if (sender != '6285559038021@s.whatsapp.net'/* || !self*/) return
     if (type == 'extendedTextMessage' || type == 'conversation' || type == 'imageMessage') {
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
          } else if (cmd == `${prf}yts`) {
               if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!yts* _Video/Musik/Channel YT_')
               ytsr(body.slice(5)).then(res => {
                    let captions = `*YOUTUBE SEARCH : ${body.slice(5)}*\n\n`
                    for (let i = 0; i < res.length; i++) {
                         const { id, author, title, ago, views, desc, duration, timestamp, url } = res[i]
                         captions += `
___________________________________________

*ID* : ${id}
*Title* : ${title}
*Duration* : ${timestamp}
*Author* : ${author}
*Published* : ${ago}
*Views* : ${views}
*Description* : ${desc}
*Link* : ${url}
`
                    }
                    sendDariUrl(from, res[0].thumb, TypePsn.image, captions)
               })
          } else if (cmd == `${prf}play`) {
               if (args.length === 1) return hurtz.reply(from, 'Kirim perintah *!play* _Judul lagu yang akan dicari_')
               const play = await ytsr(body.slice(6))
               const mulaikah = play[0].url
               yta(mulaikah).then((resyt3) => {
                    const { dl_link, thumb, title, filesizeF } = resyt3
                    const { author, ago, views, desc, timestamp } = play[0]
                    INFOLOG(title)
                    Axios.get(thumb, {
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                         const buffer_thumbyt3 = Buffer.from(data, 'base64')
                         const capt_yt3 = `*Data telah didapatkan!*

*Title* : ${title}
*Duration* : ${timestamp}
*Type* : MP3
*Author* : ${author}
*Published* : ${ago}
*Views* : ${views}
*Filesize* : ${filesizeF}
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
                              ERRLOG(ex);
                         });
                    })
               }).catch(e => ERRLOG(e))
          } else if (cmd == `${prf}ttp`) {
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
                                                  conn.sendMessage(from, buff, TypePsn.sticker)
                                                  fs.unlinkSync(`./media/text-${filename}.png`)
                                                  fs.unlinkSync(`./media/sticker/${filename}.webp`)
                                                  fs.unlinkSync(`./media/sticker/${filename}-done.webp`)
                                             })
                                        })
                                   })
                         }).catch(console.log)
                    })
          } else if (cmd == `${prf}fakereply`) {
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
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/convert/${filename}`);
               const output = './media/convert/' + moment().unix() + '.mp3'
               exec(`ffmpeg -i ${savedFilename} -filter_complex "asetrate=48000*2^(${args[1]}/12),atempo=1/2^(${args[1]}/12)" ${output}`, (err, stdout, stderr) => {
                    if (err) throw new Error(err)
                    sendmp3(from, output)
                    fs.unlinkSync(savedFilename)
                    fs.unlinkSync(output)
                    return
               })
          } else if (cmd == `${prf}tts`) {
               if (args.length === 1) {
                    balas(from, `Masukan Kode Negara dan teks!\n\nContoh : *!tts id Halo\n\nUntuk melihat kode negara lainnya silahkan ketik *!listkodebahasa*`)
                    return
               } else if (args.length === 2) {
                    balas(from, `Masukan teksnya! atau tag pesan yg sudah ada.`)
                    return
               }
               try {
                    const gtts = require('node-gtts')(args[1]);
                    gtts.save('./media/tts/wehh.wav', body.slice(8), function () {
                         exec('ffmpeg -i ./media/tts/wehh.wav ./media/tts/wehh.mp3', (err, stdout, stderr) => {
                              if (err) throw new TypeError(err)
                              const buff = fs.readFileSync('./media/tts/wehh.mp3')
                              conn.sendMessage(from, buff, TypePsn.audio, { mimetype: Mimetype.mp4Audio, ptt: true })
                              fs.unlinkSync('./media/tts/wehh.wav')
                              fs.unlinkSync('./media/tts/wehh.mp3')
                         })
                    })
               } catch (e) {
                    console.log(e)
                    balas(from, `Terdapat kesalahan! mungkin data bahasa salah. silahkan ketik *!listkodebahasa* untuk melihat kode bahasa.\n\nFormat : *!tts <kodebhs> <teks>*\nContoh : *!tts id Halo kamu*`)
               }
          } else if (cmd == `${prf}listkodebahasa*`) {
               balas(from, kode)
          } else if (cmd == `${prf}advancedglow`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!advancedglow textnya*`)
               advancedglow(body.slice(14))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${puname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}futuristic`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!futuristic textnya*`)
               futuristic(body.slice(12))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}cloud`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!cloud textnya*`)
               cloud(body.slice(7))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}blackpink`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!blackpink textnya*`)
               blackpink(body.slice(11))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}sand`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!sand textnya*`)
               sand(body.slice(6))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}scifi`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!scifi textnya*`)
               scifi(body.slice(7))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}dropwater`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!dropwater textnya*`)
               dropwater(body.slice(11))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}codmw`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!codmw textnya*`)
               codmw(body.slice(7))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}bokeh`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!bokeh textnya*`)
               bokeh(body.slice(7))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}neon`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!neon textnya*`)
               neon(body.slice(6))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}thunder`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!thunder textnya*`)
               thunder(body.slice(9))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}horrorblood`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!horrorblood textnya*`)
               horrorblood(body.slice(13))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}firework`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!firework textnya*`)
               firework(body.slice(10))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}bloodglass`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!bloodglass textnya*`)
               bloodglass(body.slice(12))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}marvel`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!marvel textnya|text kedua*`)
               const textsec = body.split('|')[1] || 'MECHA'
               marvel(body.slice(8).split('|')[0], textsec)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}phub`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!phub textnya|text kedua*`)
               const textsec = body.split('|')[1] || 'MECHA'
               phub(body.slice(6).split('|')[0], textsec)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}glitch`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!glitch textnya|text kedua*`)
               const textsec = body.split('|')[1] || 'MECHA'
               glitch(body.slice(8).split('|')[0], textsec)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(console.log)
          } else if (cmd == `${prf}brokecard`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               brokeCard(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}iphone`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
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
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               burningFire(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}smoke`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!smoke teksnya*`)
               semok(body.slice(7))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}harrypotter`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!harrypotter teksnya*`)
               harryPotter(body.slice(13))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}horrorhouse`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!horrorhouse teksnya*`)
               horrorHouse(body.slice(13))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}coffee`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!coffee teksnya*`)
               coffee(body.slice(8))
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}battlefield`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!battlefield teks1|teks2*`)
               battlefield(body.slice(13).split('|')[0], body.split('|')[1])
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}googlekeyword`) {
               if (args.length === 1) return balas(from, `Penggunaan : *!googleKeyword teks1|teks2|teks3*`)
               googleKeyword(body.slice(15).split('|')[0], body.split('|')[1], body.split('|')[2])
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                    }).catch(e => {
                         console.log(e)
                    })
          } else if (cmd == `${prf}gtav`) {
               if (!isQuotedImage) return balas(from, `Tidak ada media! mohon tag gambar.`)
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/effect/${filename}`)
               gtaV(savedFilename)
                    .then((rest) => {
                         sendDariUrl(from, rest.result, TypePsn.image, `Dah jadi ni ${pushname}`)
                         fs.unlinkSync(savedFilename)
                    }).catch(e => {
                         fs.unlinkSync(savedFilename)
                         console.log(e)
                    })
          } else if (cmd == `${prf}minesweeper`) {
               if (isGrupMines) return balas(from, `Game minesweeper telah aktif sebelumnya!`)
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
                    groupMines.splice(index, 1)
                    fs.writeFileSync('./lib/database/group-minesweeper.json', JSON.stringify(groupMines, null, 2))
               }
          } else if (cmd == `${prf}tiktok`) {
               if (args.length === 1) return balas(from, `Utuk mendownload tiktok no watermark\ngunakan ${prefix}tiktonowm link\n\nContoh: ${prefix}tiktoknowm https://vt.tiktok.com/ZS3AjTVV/`, id)
               await axios.get(`http://videfikri.com/api/tiktok/?url=${body.slice(8)}`)
                    .then(({ data }) => {
                         const link = data.result.link
                         const thumb = data.result.thumb
                         console.log(data)
                         axios.get(link, {
                              responseType: 'arraybuffer'
                         })
                              .then(({ data }) => {
                                   fs.writeFileSync('./media/filetiktod.mp4', data)
                                   const buff = fs.readFileSync('./media/filetiktod.mp4')
                                   kuroo.sendFile(from, buff, './media/filetiktod.mp4', 'Dah jadi ni', id)
                                   fs.unlinkSync('./media/filetiktod.mp4')
                              })
                    })
          } else if (cmd == `${prf}toimage` || cmd == `${prf}toimg`) {
               const savedFilename = await conn.downloadAndSaveMediaMessage(mediaData, `./media/sticker/${filename}`);
               fs.readFile(savedFilename, (err, data) => {
                    conn.sendMessage(from, data, TypePsn.image)
                    fs.unlinkSync(savedFilename)
               })
          } else if (cmd == `${prf}getpp`) {
               const profil = await conn.getProfilePicture(args[1].replace('@', '') + '@s.whatsapp.net')
               sendDariUrl(from, profil, TypePsn.image, `Nihh profilnya`)
          } else if (cmd == `${prf}trigger`) {
               if (args.length === 1) {
                    // console.log('cnth1')
                    const pepe = await conn.getProfilePicture(sender)
                    let image = await canvacord.Canvas.trigger(pepe);
                    createExif('Created By MechaBOT', 'Follow Insta Dev @hzzz.formech_')
                    fs.writeFile('./media/effect/triggered.gif', image, () => {
                         exec(`ffmpeg -i ./media/effect/triggered.gif -vcodec libwebp -vf fps=fps=30 -lossless 0 -loop 0 -pix_fmt yuv420p -preset default -an -vsync 0 -s 512:512 ./media/effect/triggered.webp`, (err, stdout, stderr) => {
                              if (err) throw new TypeError(err)
                              exec(`webpmux -set exif ./media/sticker/data.exif ./media/effect/triggered.webp -o ./media/effect/triggered-done.webp`, (err, stdout, stderr) => {
                                   if (err) throw new TypeError(err)
                                   const buff = fs.readFileSync('./media/effect/triggered-done.webp')
                                   conn.sendMessage(from, buff, TypePsn.sticker)
                                   fs.unlinkSync('./media/effect/triggered.gif')
                                   fs.unlinkSync('./media/effect/triggered.webp')
                                   fs.unlinkSync('./media/effect/triggered-done.webp')
                              })
                         })
                    })
               } else if (/@[0-9]/gi.test(args[1])) {
                    const pepe = await conn.getProfilePicture(args[1].replace('@', '') + '@s.whatsapp.net')
                    let image = await canvacord.Canvas.trigger(pepe);
                    createExif('Created By MechaBOT', 'Follow Insta Dev @hzzz.formech_')
                    fs.writeFile('./media/effect/triggered.gif', image, () => {
                         exec(`ffmpeg -i ./media/effect/triggered.gif -vcodec libwebp -vf fps=fps=30 -lossless 0 -loop 0 -pix_fmt yuv420p -preset default -an -vsync 0 -s 512:512 ./media/effect/triggered.webp`, (err, stdout, stderr) => {
                              if (err) throw new TypeError(err)
                              exec(`webpmux -set exif ./media/sticker/data.exif ./media/effect/triggered.webp -o ./media/effect/triggered-done.webp`, (err, stdout, stderr) => {
                                   if (err) throw new TypeError(err)
                                   const buff = fs.readFileSync('./media/effect/triggered-done.webp')
                                   conn.sendMessage(from, buff, TypePsn.sticker)
                                   fs.unlinkSync('./media/effect/triggered.gif')
                                   fs.unlinkSync('./media/effect/triggered.webp')
                                   fs.unlinkSync('./media/effect/triggered-done.webp')
                              })
                         })
                    })
               } else if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(args[1])) {
                    let image = await canvacord.Canvas.trigger(args[1]);
                    console.log('cnth2')
                    createExif('Created By MechaBOT', 'Follow Insta Dev @hzzz.formech_')
                    fs.writeFile('./media/effect/triggered.gif', image, () => {
                         exec(`ffmpeg -i ./media/effect/triggered.gif -vcodec webp -loop 0 -pix_fmt yuv420p ./media/effect/triggered.webp`, (err, stdout, stderr) => {
                              if (err) throw new TypeError(err)
                              exec(`webpmux -set exif ./media/sticker/data.exif ./media/effect/triggered.webp -o ./media/effect/triggered-done.webp`, (err, stdout, stderr) => {
                                   if (err) throw new TypeError(err)
                                   const buff = fs.readFileSync('./media/effect/triggered-done.webp')
                                   conn.sendMessage(from, buff, TypePsn.sticker)
                                   fs.unlinkSync('./media/effect/triggered.gif')
                                   fs.unlinkSync('./media/effect/triggered.webp')
                                   fs.unlinkSync('./media/effect/triggered-done.webp')
                              })
                         })
                    })
               }
          } else if (cmd == `${prf}apk`) {
               if (args.length === 1) return balas(from, `Masukan nama apk nyah!`)
               searchApk(body.slice(5)).then(res => {
                    let captions = '*Menampilkan list apk*'
                    for (let i = 0; i < res.length; i++) {
                         captions += `

*Urutan* : ${1 + i}
*Nama APK* : ${res[i].name}
*Download* : _!getapk ${res[i].dl_url.replace('https://rexdlfile.com/index.php?id=', '')}_
*Deskripsi* : ${res[i].desc}
                              `
                    }
                    sendDariUrl(from, res[0].thumb, TypePsn.image, captions)
               }).catch(() => balas(from, `APK mungkin tidak ada!`))
          } else if (cmd == `${prf}getapk`) {
               if (args.length === 1) return balas(from, `Masukan nama download apk nya!`)
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
          } else if (cmd == `${prf}batt`) {
               const batt = fs.readFileSync('./lib/database/batt.json', 'utf-8')
               conn.sendMessage(from, '*Battery* : ' + batt, TypePsn.text, { quoted: hurtz })
               console.log(batt)
          } else if (cmd == `${prf}searchmsg`) {
               const searched = await conn.searchMessages(body.slice(11).split('|')[0], body.split('|')[1], body.split('|')[2], body.split('|')[3])
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
               const args_yt4 = body.slice(7)
               ytv(args_yt4).then((resyt4) => {
                    const { dl_link, thumb, title, filesizeF } = resyt4
                    INFOLOG(title)
                    //Send Thumb
                    Axios.get(thumb, {
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                         const buffer_thumbyt4 = Buffer.from(data, 'base64')
                         const capt_yt4 = `*Data telah didapatkan!*

*Judul* : ${title}
*Type* : MP4
*Filesize* : ${filesizeF}

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
                         .catch(e => ERRLOG(e))
               })
          } else if (cmd == `${prf}ytmp3`) {
               const args_yt3 = body.slice(7)
               yta(args_yt3).then((resyt3) => {
                    const { dl_link, thumb, title, filesizeF } = resyt3
                    INFOLOG(title)
                    //Send Thumb
                    Axios.get(thumb, {
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                         const buffer_thumbyt3 = Buffer.from(data, 'base64')
                         const capt_yt3 = `*Data telah didapatkan!*

*Judul* : ${title}
*Type* : MP3
*Filesize* : ${filesizeF}

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
               }).catch(e => ERRLOG(e))
          } else if (cmd == `${prf}tomp4`) {
               if (!isQuotedAudio) return balas(from, `Harus tag pesan audio!`)
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
               if (!isQuotedVideo) return balas(from, `Tidak ada video yg di tag!`)
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
          } else if (cmd == `${prf}stikergif` || cmd == `${prf}stickergif`) {
               const buffer_tikel = await conn.downloadMediaMessage(hurtz)
               let webpres = webp.buffer2webpbuffer(buffer_tikel, 'mp4', '-q 80')
               webpres.then((result) => {
                    console.log(result)
                    conn.sendMessage(from, result, TypePsn.sticker, { mimetype: Mimetype.webp })
               })
          } else if (cmd == `${prf}hidetag`) {
               hidetag(from, body.slice(9))
          } else if (cmd == `${prf}tomedia`) {
               if (!isQuotedSticker) return balas(from, `Mohon hanya tag stiker! bukan media lain.`)
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
                                   conn.sendMessage(from, fs.readFileSync(`./media/sticker/${filename}-done.mp4`), TypePsn.video, { mimetype: Mimetype.gif, caption: `Dah jadi ni ${pushname}` })
                                   fs.unlinkSync(savedFilename)
                                   fs.unlinkSync(`./media/sticker/${filename}-done.mp4`)
                              })

                         })
                    }).catch((e) => {
                         console.log(e)
                         balas(from, `Error gan :(`)
                         fs.unlinkSync(savedFilename)
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
                                                  fs.unlinkSync(savedFilename)
                                                  fs.unlinkSync(`./media/sticker/${filename}-done.mp4`)
                                             })

                                        })
                                   }).catch((e) => {
                                        console.log(e)
                                        balas(from, `Error gan :(`)
                                        fs.unlinkSync(savedFilename)
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
          } else if (cmd == `${prf}stiker` || cmd == `${prf}sticker`) {
               let packstik
               let authorstik
               if (args[1] == 'wm') {
                    packstik = body.slice(8).split('|')[0] || 'Created By MechaBOT'
                    authorstik = body.split('|')[1] || 'Follow Insta Dev @hzzz.formech_'
               } else {
                    packstik = 'Created By MechaBOT'
                    authorstik = 'Follow Insta Dev @hzzz.formech_'
               }
               const myfps = body.split('-fps ')[1] || '12'
               const ending = body.split('-end ')[1] || '10'
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
                         conn.sendMessage(from, buff, TypePsn.sticker)
                         fs.unlinkSync(savedFilename)
                         fs.unlinkSync(`./media/sticker/${filename}-done.webp`)
                    })
               }
               if (savedFilename.slice(-4) === 'jpeg') {
                    sharp(savedFilename).resize({
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
                                        conn.sendMessage(from, buff, TypePsn.sticker)
                                        console.log(stdout)
                                        fs.unlinkSync(savedFilename)
                                        fs.unlinkSync(`./media/sticker/${filename}.webp`)
                                        fs.unlinkSync(`./media/sticker/${filename}-done.webp`)
                                   })
                              })
                         })
               } else {
                    exec(`ffmpeg -i ${savedFilename} -vcodec libwebp -vf scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1,fps=fps=${myfps} -lossless 0 -loop 0 -preset default -ss 00:00:00 -t 00:00:${ending} -an -vsync 0 -s 512:512 ./media/sticker/${filename}.webp`, (err, stdout, stderr) => {
                         if (err) throw new TypeError(err)
                         exec(`webpmux -set exif ./media/sticker/data.exif ./media/sticker/${filename}.webp -o ./media/sticker/${filename}-done.webp`, (err, stdout, stderr) => {
                              if (err) {
                                   console.error(err);
                                   return
                              }
                              const buff = fs.readFileSync(`./media/sticker/${filename}-done.webp`)
                              conn.sendMessage(from, buff, TypePsn.sticker)
                              fs.unlinkSync(savedFilename)
                              fs.unlinkSync(`./media/sticker/${filename}.webp`)
                              fs.unlinkSync(`./media/sticker/${filename}-done.webp`)
                         })
                    })
               }
          } else if (cmd == `${prf}runtime`) {
               function format(seconds) {
                    function pad(s) {
                         return (s < 10 ? '0' : '') + s;
                    }
                    var hours = Math.floor(seconds / (60 * 60));
                    var minutes = Math.floor(seconds % (60 * 60) / 60);
                    var seconds = Math.floor(seconds % 60);
                    balas(from, hours)
                    return pad(hours) + ' Jam ' + pad(minutes) + ' Menit ' + pad(seconds) + ' Detik'
               }
               var uptime = process.uptime();
               balas(from, `Waktu bot aktif / telah berjalan selama *${format(uptime)}*`)
          } else if (cmd == `${prf}title`) {
               const subjeknya = body.slice(7)
               await conn.groupUpdateSubject(from, subjeknya)
          } else if (cmd == `${prf}desc`) {
               const descnya = body.slice(6)
               await conn.groupUpdateDescription(from, descnya)
          } else if (cmd == `${prf}mutegrup`) {
               await conn.groupSettingChange(from, GroupSettingChange.messageSend, true)
          } else if (cmd == `${prf}unmutegrup`) {
               await conn.groupSettingChange(from, GroupSettingChange.messageSend, false)
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
          } else if (cmd == `${prf}push`) {
               console.log(conn.getName())
          } else if (cmd == `${prf}menu` || cmd == `${prf}help`) {
               const performa = speed()
               const isCas = battery[1].live == 'true' ? "Sedang di cas ✅⚡" : "Tidak di cas 🔌❌"
               const batteryNow = battery[1].value
               const latensi = speed() - performa
               const strMenu = `    (っ◔◡◔)っ 🤖 MENU MECHABOT 🤖 


Contact My WhatsApp : @6285559038021

Legend :

⚪ : Fitur member tanpa limit
🔷 : Fitur admin dan limit +1
💚 : Fitur member dan limit +1
💛 : Fitur member dan limit +2
🔴 : Fitur VIP dan limit +5


_Note : Bot ini multiprefix namun prefix utamanya adalah !_


📲 *Versi WA* : _${conn.user.phone.wa_version}_
🔋  *Batre* : _${batteryNow}% ${isCas}_
💻 *Host* : _${os.hostname()}_
📱 *Device* : _${conn.user.phone.device_manufacturer} Versi OS ${conn.user.phone.os_version}_
⚖️ *Ram Usage* : _${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
🧿 *Platform* : _${os.platform()}_
🔌 *CPU* : _${os.cpus()[0].model.replace(/ /g, '')}_
⚡ *Speed Process* : _${latensi.toFixed(4)}_

*Info Bot*

⚪ !menu _[Menampilkan seluruh menu]_
⚪ !runtime _[Menampilkan waktu bot berjalan]_

*Fitur VIP*

🔴 !hidetag <teksnya>
🔴 !fakereply <@TagMember|Pesan orang|Pesan bot>

*Fitur Games*

💚 !minesweeper
 | ⚪ isi <x y>

*Fitur Media & Download*

💚 !tts <Kode negara> <Teksnya> _[Teks ke vn]_
💚 !listkodebahasa _[Menampilkan list kode bahasa]_
💚 !tomp3 <TagVideo> _[Extract video ke audio]_
💛 !ytmp3 <https://linkyt> _[Youtube Download MP3]_
💛 !ytmp4 <https://linkyt> _[Youtube Download MP4]_

*Fitur stiker*

💚 !stiker <Stickerpack|Author> _(Watermark boleh tidak diisi dan bisa tag media)_
💚 !trigger <@TagMember> _[Efek triggered]_
💚 !tomedia <TagStiker> _[Stikergif ke video]_
💚 !ttp <TEXT> _[Text To Sticker]_

*Fitur Admin* 

🔷 !antidelete <aktif/mati> _[Anti penghapusan pesan]_
🔷 !title <teksnya> _[Mengubah judul grup]_
🔷 !desc <teksnya> _[Mengubah deskripsi grup]_
🔷 !mutegrup _[Setting group chat hanya admin]_
🔷 !unmutegrup _[Setting group chat untuk semua member]_

*Fitur imagemaker*

_[Memanipulasi teks dan atau gambar]_

💚 !advancedglow <teksnya>
💚 !futuristic <teksnya>
💚 !cloud <teksnya>
💚 !blackpink <teksnya>
💚 !sand <teksnya>
💚 !scifi <teksnya>
💚 !dropwater <teksnya>
💚 !codmw <teksnya>
💚 !bokeh <teksnya>
💚 !neon <teksnya>
💚 !thunder <teksnya>
💚 !horrorblood <teksnya>
💚 !firework <teksnya>
💚 !bloodglass <teksnya>
💚 !neonlight <teksnya>
💚 !marvel <teks1|teks2>
💚 !phub <teks1|teks2>
💚 !glitch <teks1|teks2>
💛 !brokeCard <TagGambar>
💛 !iphone <TagGambar>
💛 !underwater <TagGambar>
💛 !drawing <TagGambar>
💛 !burningFire <TagGambar>
💚 !semok <teksnya>
💚 !harryPotter <Teksnya>
💚 !horrorHouse <teksnya>
💚 !coffee <teksnya>
💚 !battlefield <teks1|teks2>
💚 !googleKeyword <teks1|teks2|teks3>
💛 !gtaV <TagGambar>

                    `
               conn.sendMessage(from, strMenu, TypePsn.text, {
                    quoted: hurtz,
                    contextInfo: { mentionedJid: [nomerOwner[0]] }
               })
          }
     }
}