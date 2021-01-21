const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const moment = require('moment')
const { baseURI, ytsr, yta, ytv, buffer2Stream, stream2Buffer, noop } = require('./lib/ytdl')
const time = moment().format('DD/MM HH:mm:ss')
const {
     WAConnection,
     MessageType,
     Presence,
     MessageOptions,
     Mimetype,
     WALocationMessage,
     WA_MESSAGE_STUB_TYPES,
     ReconnectMode,
     ProxyAgent,
     waChatKey,
} = require("@adiwajshing/baileys")
const { default: Axios } = require('axios')
const conn = new WAConnection()

module.exports = hurtzHandler = async (hurtz) => {
     try {

          function INFOLOG(info) {
               return console.log('\x1b[1;35m~\x1b[1;37m>>', '[\x1b[1;33mINF\x1b[1;37m]', time, color(info))
          }
          function MSGLOG(info) {
               return console.log('\x1b[0;30m~\x1b[1;37m>>', '[\x1b[1;32mMSG\x1b[1;37m]', time, color(info))
          }
          function ERRLOG(e) {
               return console.log('\x1b[1;31m~\x1b[1;37m>>', '[\x1b[1;31mERROR\x1b[1;37m]', time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
          }

          const from = hurtz.key.remoteJid
          const konten = JSON.stringify(hurtz.message, null, 2)
          const TypePsn = MessageType
          const self = hurtz.key.fromMe
          const type = Object.keys(hurtz.message)[0]
          const body = type == 'conversation' ? hurtz.message.conversation : type == 'extendedTextMessage' ? hurtz.message.extendedTextMessage.text : type == 'imageMessage' ? hurtz.message.imageMessage.caption : type == 'stickerMessage' ? 'Sticker' : type == 'audioMessage' ? 'Audio' : 'tidak terdefinisi'
          const cmd = body.toLowerCase().split(' ')[0] || ''
          const prf = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/gi) : '-'
          const args = cmd.split(' ')
          const isImageMsg = type == 'imageMessage' ? true : false
          console.log(hurtz)
          MSGLOG(`Tipe ${chalk.yellowBright(type)} Pesan ${chalk.blueBright(body)} dari ${from}`)
          // Object.defineProperty(hurtz, "message.extendedTextMessage.text", {value:"Emm"})
          // if (!self) return
          if (hurtz.message.conversation == null) {
               console.log('No error, lanjutkan..')
          }
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
                    // console.log(hurtz)
               } else if (cmd == `${prf}cekgrup`) {
                    conn.sendMessage(from, hurtz.key.remoteJid, TypePsn.text, { quoted: hurtz })
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
                    })
                         .catch(e => ERRLOG(e))
               } else if (cmd == `${prf}stiker` || cmd == `${prf}sticker`) {
                    if (!isImageMsg) return conn.sendMessage(from, `Mohon maaf kirim gambar dengan caption *!stiker*`, TypePsn.text, { quoted: hurtz })
                    const buffer_tikel = await conn.downloadAndSaveMediaMessage(hurtz)
                    const imagena = fs.readFileSync('./undefined.jpeg')
                    await conn.sendMessage(from, imagena, TypePsn.image, { mimetype: Mimetype.jpeg })
               }
          }

          conn.on('close', ({ reason, isReconnecting }) => (
               INFOLOG('TERDISKONEK! : ' + reason + ', ' + chalk.blue('Menkoneksi ulang : ' + isReconnecting))
          ))
     } catch (error) {
          ERRLOG(error)
     }
} 