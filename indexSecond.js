const qrcode = require('qrcode-terminal')
const fs = require('fs')
const util = require('util')
const webp = require('webp-converter')
const ffmpeg = require('fluent-ffmpeg')
const chalk = require('chalk')
const moment = require('moment')
const { baseURI, ytsr, yta, ytv, buffer2Stream, stream2Buffer, noop } = require('./lib/ytdl')
const time = moment().format('DD/MM HH:mm:ss')
const sambutan = JSON.parse(fs.readFileSync('./lib/data_sambutan.json'))
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
  GroupSettingChange,
} = require("@adiwajshing/baileys")
const { default: Axios } = require('axios')
webp.grant_permission()

function INFOLOG(info) {
  return console.log('\x1b[1;35m~\x1b[1;37m>>', '[\x1b[1;33mINF\x1b[1;37m]', time, color(info))
}
function MSGLOG(info) {
  return console.log('\x1b[0;30m~\x1b[1;37m>>', '[\x1b[1;32mMSG\x1b[1;37m]', time, color(info))
}
function ERRLOG(e) {
  return console.log('\x1b[1;31m~\x1b[1;37m>>', '[\x1b[1;31mERROR\x1b[1;37m]', time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
}
const conn = new WAConnection()
// const hurtzHandler = require('./hurtzHandler')

async function mulai() {

  conn.on('qr', qr => {
    qrcode.generate(qr, { small: true })
    console.log(`[ ${moment().format('HH:mm:ss')} ] Silahkan scan,,`)
  })

  conn.on('credentials-updated', () => {
    console.log(`Berhasil update kredensial`)
    const authInfo = conn.base64EncodedAuthInfo()
    fs.writeFileSync('./sessions/komat.sesi.json', JSON.stringify(authInfo, null, 2))
  })
  fs.existsSync('./sessions/komat.sesi.json') && conn.loadAuthInfo('./sessions/komat.sesi.json')

  conn.connect()


  conn.on('message-new', async (hurtz) => {


    try {
      const generateMessageID = () => {
        return randomBytes(10).toString('hex').toUpperCase()
    }
    
    const getGroupAdmins = (participants) => {
      admins = []
      for (let i of participants) {
        i.isAdmin ? admins.push(i.jid) : ''
      }
      return admins
    }
    
    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`
    }

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
      const isGroup = from.endsWith('@g.us')
      const type = Object.keys(hurtz.message)[0]
      const body = type == 'conversation' ? hurtz.message.conversation : type == 'extendedTextMessage' ? hurtz.message.extendedTextMessage.text : type == 'imageMessage' ? hurtz.message.imageMessage.caption : type == 'stickerMessage' ? 'Sticker' : type == 'audioMessage' ? 'Audio' : type == 'videoMessage' ? hurtz.message.videoMessage.caption : ''
      const args = body.split(' ')
      const cmd = body.toLowerCase().split(' ')[0] || ''
      const prf = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/gi) : '-'
      // const args = cmd.split(' ')
      const isMedia = (type === 'imageMessage' || type === 'videoMessage')
      const isQuotedImage = type === 'extendedTextMessage' && konten.includes('imageMessage')
      const isQuotedVideo = type === 'extendedTextMessage' && konten.includes('videoMessage')
      const isQuotedSticker = type === 'extendedTextMessage' && konten.includes('stickerMessage')
      const isCmd = body.startsWith(prf)
      const sender = isGroup ? hurtz.participant : hurtz.key.remoteJid
      const botNumber = conn.user.jid
      const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
      const groupName = isGroup ? groupMetadata.subject : ''
      const groupId = isGroup ? groupMetadata.id : ''
      const isImageMsg = type == 'imageMessage' ? true : false
      const isVideoMsg = type == 'videoMessage' ? true : false
      // console.log(args)
      // MSGLOG(`Tipe ${chalk.yellowBright(type)} Pesan ${chalk.blueBright(body)} dari ${from}`)
      if (!isGroup && isCmd) console.log('\x1b[1;31m)\x1b[1;37m>', '[' + chalk.blueBright('CMD') + ']', time, color(args[0]), 'dari', color(sender.split('@')[0]), 'args :', color(args.length))
      if (!isGroup && !isCmd) console.log('\x1b[1;31m)\x1b[1;37m>', '[' + chalk.greenBright('MSG') + ']', time, color('Pesan'), 'dari', color(sender.split('@')[0]), 'args :', color(args.length))
      if (isCmd && isGroup) console.log('\x1b[1;31m)\x1b[1;37m>', '[' + chalk.blueBright('CMD') + ']', time, color(args[0]), 'dari', color(sender.split('@')[0]), 'di', color(groupName), 'args :', color(args.length))
      if (!isCmd && isGroup) console.log('\x1b[1;31m)\x1b[1;37m>', '[' + chalk.greenBright('MSG') + ']', time, color('pesan'), 'dari', color(sender.split('@')[0]), 'di', color(groupName), 'args :', color(args.length))

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
        } else if (cmd == `${prf}stikergif` || cmd == `${prf}stickergif`) {
          const buffer_tikel = await conn.downloadMediaMessage(hurtz)
          let webpres = webp.buffer2webpbuffer(buffer_tikel, 'mp4', '-q 80')
          webpres.then((result) => {
            console.log(result)
            conn.sendMessage(from, result, TypePsn.sticker, { mimetype: Mimetype.webp })
          })
        } else if (cmd == `${prf}hidetag`) {
          const grup = await conn.groupMetadata(from)
          let member = []
          let pesan = ["Ekhem", "Wutt", "Ceeek", "Oyy", "Hmmm"]
          const prom = body.slice(11).split('|')[0]
          const pesane = body.split('|')[1]
          grup.participants.forEach(result => {
            member.push(result.id.replace('@c.us', '@s.whatsapp.net'))
          })
          //  console.log(member)
          const kirim = pesan[Math.floor(Math.random() * pesan.length)]
          conn.sendMessage(from, kirim, TypePsn.text, {
            text: 'ok',
            contextInfo: { mentionedJid: member }
          })
        } else if (cmd == `${prf}stiker` || cmd == `${prf}sticker`) {
          if (!isImageMsg) return conn.sendMessage(from, `Mohon maaf kirim gambar dengan caption *!stiker*`, TypePsn.text, { quoted: hurtz })
          const buffer_tikel = await conn.downloadMediaMessage(hurtz)
          let webpres = webp.buffer2webpbuffer(buffer_tikel, 'jpeg', '-q 80')
          webpres.then((result) => {
            console.log(result)
            conn.sendMessage(from, result, TypePsn.sticker, { mimetype: Mimetype.webp })
          })
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
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
}


mulai().catch(e => ERRLOG(e))