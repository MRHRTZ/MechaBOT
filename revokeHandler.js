const { getFilesize } = require('./lib/func')
const fs = require('fs')
const moment = require('moment')
const time = moment().format('DD/MM HH:mm:ss')
const exec = require('child_process').exec
const { createExif } = require('./lib/create-exif')
function ERRLOG(e) {
     return console.log('()\x1b[1;37m->', '<\x1b[1;31mERROR\x1b[1;37m>', time, color(e))
}

module.exports = revokejs = async (WA_MESSAGE_STUB_TYPES, hurtz, conn, Mimetype, MessageType) => {
     try {
          const from = hurtz.key.remoteJid
          const messageStubType = WA_MESSAGE_STUB_TYPES[hurtz.messageStubType] || 'MESSAGE'
          const dataRevoke = JSON.parse(fs.readFileSync('./lib/database/RevokedGroup.json'))
          const isRevoke = dataRevoke.includes(from)
          if (messageStubType == 'REVOKE' && isRevoke) {
               const from = hurtz.key.remoteJid
               const isGroup = hurtz.key.remoteJid.endsWith('@g.us') ? true : false
               const sender = hurtz.key.fromMe ? conn.user.jid : isGroup ? hurtz.participant : hurtz.key.remoteJid
               let int
               let infoMSG = JSON.parse(fs.readFileSync('./lib/database/msgInfo.json'))
               const id_deleted = hurtz.key.id
               const conts = hurtz.key.fromMe ? conn.user.jid : conn.contacts[sender] || { notify: jid.replace(/@.+/, '') }
               const pushname = hurtz.key.fromMe ? conn.user.name : conts.notify || conts.vname || conts.name || '-'
               for (let i = 0; i < infoMSG.length; i++) {
                    if (infoMSG[i].key.id == id_deleted) {
                         const dataInfo = infoMSG[i]
                         const type = Object.keys(infoMSG[i].message)[0]
                         const timestamp = infoMSG[i].messageTimestamp
                         int = {
                              no: i,
                              type: type,
                              timestamp: timestamp,
                              data: dataInfo
                         }
                    }
               }
               const opt4tag = {
                    quoted: int.data,
                    contextInfo: { mentionedJid: [sender] }
               }
               const index = Number(int.no)
               const body = int.type == 'conversation' ? infoMSG[index].message.conversation : int.type == 'extendedTextMessage' ? infoMSG[index].message.extendedTextMessage.text : int.type == 'imageMessage' ? infoMSG[index].message.imageMessage.caption : int.type == 'stickerMessage' ? 'Sticker' : int.type == 'audioMessage' ? 'Audio' : int.type == 'videoMessage' ? infoMSG[index].message.videoMessage.caption : '-'
               const mediaData = int.type === 'extendedTextMessage' ? JSON.parse(JSON.stringify(int.data).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : int.data
               if (int.type == 'conversation' || int.type == 'extendedTextMessage') {
                    const strConversation = `\`\`\`[ ⚠️ Terdeteksi Penghapusan Pesan ⚠️ ]

Nama : ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
Tipe : Text
Waktu : ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
Pesan : ${body ? body : '-'}\`\`\`
`
                    conn.sendMessage(from, strConversation, MessageType.text, opt4tag)
               } else if (int.type == 'stickerMessage') {
                    createExif('Created By MechaBOT', 'Follow Insta Dev @hanif.thetakeovers_')
                    const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
                    const savedFilename = await conn.downloadAndSaveMediaMessage(int.data, `./media/sticker/${filename}`);
                    const sizestik = getFilesize(savedFilename)
                    const strConversation = `\`\`\`[ ⚠️ Terdeteksi Penghapusan Pesan ⚠️ ]

Nama : ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
Tipe : Sticker
Ukuran : ${sizestik}
Waktu : ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}\`\`\`
`
                    exec(`webpmux -set exif ./media/sticker/data.exif ${savedFilename} -o ./media/sticker/${filename}-done.webp`, (err, stdout, stderr) => {
                         if (err) {
                              console.error(err);
                              return
                         }
                         const buff = fs.readFileSync(`./media/sticker/${filename}-done.webp`)
                         conn.sendMessage(from, strConversation, MessageType.text, opt4tag)
                         conn.sendMessage(from, buff, MessageType.sticker)
                         // console.log(stdout)
                         fs.unlinkSync(savedFilename)
                         fs.unlinkSync(`./media/sticker/${filename}-done.webp`)
                    })

               } else if (int.type == 'imageMessage') {
                    const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
                    const savedFilename = await conn.downloadAndSaveMediaMessage(int.data, `./media/revoke/${filename}`);
                    const sizes = getFilesize(savedFilename)
                    const buff = fs.readFileSync(savedFilename)
                    const strConversation = `\`\`\`[ ⚠️ Terdeteksi Penghapusan Pesan ⚠️ ]

Nama : ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
Tipe : Image
Ukuran : ${sizes}
Waktu : ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
Pesan : ${body ? body : '-'}\`\`\`
`
                    conn.sendMessage(from, buff, MessageType.image, { quoted: int.data, contextInfo: { mentionedJid: [sender] }, caption: strConversation })
                    fs.unlinkSync(savedFilename)
               } else if (int.type == 'videoMessage') {
                    const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
                    const savedFilename = await conn.downloadAndSaveMediaMessage(int.data, `./media/revoke/${filename}`);
                    const sizes = getFilesize(savedFilename)
                    const buff = fs.readFileSync(savedFilename)
                    const strConversation = `\`\`\`[ ⚠️ Terdeteksi Penghapusan Pesan ⚠️ ]

Nama : ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
Tipe : Video
Ukuran : ${sizes}
Waktu : ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
Pesan : ${body ? body : '-'}\`\`\`
`
                    conn.sendMessage(from, buff, MessageType.video, { quoted: int.data, contextInfo: { mentionedJid: [sender] }, caption: strConversation })
                    fs.unlinkSync(savedFilename)
               }
          }
     } catch (error) {
          ERRLOG(error)
     }
}