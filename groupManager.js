const { default: Axios } = require('axios');
const fs = require('fs');
const moment = require('moment')
const time = moment().format('DD/MM HH:mm:ss')
const Canvas = require("discord-canvas")
let bg = JSON.parse(fs.readFileSync('./lib/database/unsplash.json'))
let colour = ["f0f8ff", "faebd7", "00ffff", "7fffd4", "f0ffff", "f5f5dc", "ffe4c4", "000000", "ffebcd", "0000ff", "8a2be2", "a52a2a", "deb887", "5f9ea0", "7fff00", "d2691e", "ff7f50", "6495ed", "fff8dc", "dc143c", "00ffff", "00008b", "008b8b", "b8860b", "a9a9a9", "006400", "bdb76b", "8b008b", "556b2f", "ff8c00", "9932cc", "8b0000", "e9967a", "8fbc8f", "483d8b", "2f4f4f", "00ced1", "9400d3", "ff1493", "00bfff", "696969", "1e90ff", "b22222", "fffaf0", "228b22", "ff00ff", "dcdcdc", "f8f8ff", "ffd700", "daa520", "808080", "008000", "adff2f", "f0fff0", "ff69b4", "cd5c5c", "4b0082", "fffff0", "f0e68c", "e6e6fa", "fff0f5", "7cfc00", "fffacd", "add8e6", "f08080", "e0ffff", "fafad2", "d3d3d3", "90ee90", "ffb6c1", "ffa07a", "20b2aa", "87cefa", "778899", "b0c4de", "ffffe0", "00ff00", "32cd32", "faf0e6", "ff00ff", "800000", "66cdaa", "0000cd", "ba55d3", "9370d8", "3cb371", "7b68ee", "00fa9a", "48d1cc", "c71585", "191970", "f5fffa", "ffe4e1", "ffe4b5", "ffdead", "000080", "fdf5e6", "808000", "6b8e23", "ffa500", "ff4500", "da70d6", "eee8aa", "98fb98", "afeeee", "d87093", "ffefd5", "ffdab9", "cd853f", "ffc0cb", "dda0dd", "b0e0e6", "800080", "663399", "ff0000", "bc8f8f", "4169e1", "8b4513", "fa8072", "f4a460", "2e8b57", "fff5ee", "a0522d", "c0c0c0", "87ceeb", "6a5acd", "708090", "fffafa", "00ff7f", "4682b4", "d2b48c", "008080", "d8bfd8", "ff6347", "40e0d0", "ee82ee", "f5deb3", "ffffff", "f5f5f5", "ffff00", "9acd32"]
let acak, acakbg;

module.exports = groupHandler = async (setting, GroupSettingChange, Mimetype, MessageType, conn, update, hurtz) => {
     // console.log(update)

     function INFOLOG(info) {
          console.log('\x1b[1;34m~\x1b[1;37m>>', '<\x1b[1;33mINF\x1b[1;37m>', time, color(info))
     }

     function ERRLOG(e) {
          console.log('\x1b[1;31m~\x1b[1;37m>>', '<\x1b[1;31mERROR\x1b[1;37m>', time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
     }

     const database = JSON.parse(fs.readFileSync('./lib/database/welcomer-leaver.json'))
     // const sample = {
     //      jid: '6285559038021-1603688917@g.us',
     //      participants: ['2348036712904@s.whatsapp.net'],
     //      action: 'remove'
     // }
     const pepelist = [
          'https://www.gambarunik.id/wp-content/uploads/2019/06/Berbagai-Gambar-Foto-Profil-Kosong-Lucu-Untuk-Status.jpg',
          'http://2.bp.blogspot.com/-IU9LB4mu-Ms/TYW4GeURMQI/AAAAAAAAA4A/4cqznKhNBp8/s1600/funny%2BFacebook%2Bdefault%2Bpictures3.jpg',
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png',
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
     ]
     const from = update.jid
     const people = update.participants[0]
     const action = update.action
     const fromMe = people == conn.user.jid ? true : false
     const conts = fromMe ? conn.user.jid : conn.contacts[people] || { notify: jid.replace(/@.+/, '') }
     const pushname = fromMe ? conn.user.name : conts.notify || conts.vname || conts.name || '-'

     async function sendDariUrl(dari, url, type, text) {
          if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(url)) return console.error(`Not a valid url!`)
          const caption = text || ''
          const buffData = await Axios.request({
               method: 'GET',
               url: url,
               responseType: 'arraybuffer',
               responseEncoding: 'binary'
          });
          conn.sendMessage(dari, buffData.data, type, { contextInfo: { mentionedJid: [people] }, caption: caption })
     }
     if (database.includes(from)) {
               const titlegc = (await conn.groupMetadata(from)).subject
               INFOLOG('INFO GRUP!')
               acak = Math.floor(Math.random() * colour.length);
               acakbg = Math.floor(Math.random() * bg.length);
               let partisipan = []
               const dataparts = (await conn.groupMetadata(from)).participants
               for (let parts of dataparts) {
                    partisipan.push(parts.jid)
               }
               if (action == 'remove') {
                    conn.getProfilePicture(people)
                         .then(async(profile) => {
                              text = ['Goodbye:(', 'RIP', 'See You Again', 'Knp Keluar:(', 'Miss You :)']
                              const image = await new Canvas.Goodbye()
                                   .setText('title', text[Math.floor(Math.random() * text.length)])
                                   .setUsername(pushname)
                                   .setDiscriminator(people.replace(/@s.whatsapp.net/, '').slice(5, 9))
                                   // .setMemberCount(partisipan.indexOf(people))
                                   .setGuildName(titlegc)
                                   .setAvatar(profile)
                                   .setColor("border", "#" + colour[acak])
                                   .setColor("username-box", "#" + colour[acak])
                                   .setColor("discriminator-box", "#" + colour[acak])
                                   .setColor("message-box", "#" + colour[acak])
                                   .setColor("title", "#" + colour[acak])
                                   .setColor("avatar", "#" + colour[acak])
                                   .setBackground(bg[acakbg].download_url)
                                   .toAttachment();
                              fs.writeFile('./media/effect/leave.png', image.toBuffer(), (e) => {
                                   if (e) return console.log(e)
                                   const buffer = fs.readFileSync('./media/effect/leave.png')
                                   conn.sendMessage(from, buffer, MessageType.image, { caption: `Selamat tinggal @${people.replace(/@s.whatsapp.net/, '')}, semoga tenang dialam sana. 😇`, contextInfo: { mentionedJid: [people] } })
                                   fs.unlinkSync('./media/effect/leave.png')
                              })
                         })
                         .catch(async(e) => {
                              ERRLOG(e)
                              const profile = pepelist[Math.floor(Math.random() * pepelist.length)]
                              text = ['Goodbye:(', 'RIP', 'Berduka', 'Knp Keluar:(', 'Miss You :)']
                              const image = await new Canvas.Goodbye()
                                   .setText('title', text[Math.floor(Math.random() * text.length)])
                                   .setUsername(pushname)
                                   .setDiscriminator(people.replace(/@s.whatsapp.net/, '').slice(5, 9))
                                   // .setMemberCount(partisipan.indexOf(people))
                                   .setGuildName(titlegc)
                                   .setAvatar(profile)
                                   .setColor("border", "#" + colour[acak])
                                   .setColor("username-box", "#" + colour[acak])
                                   .setColor("discriminator-box", "#" + colour[acak])
                                   .setColor("message-box", "#" + colour[acak])
                                   .setColor("title", "#" + colour[acak])
                                   .setColor("avatar", "#" + colour[acak])
                                   .setBackground(bg[acakbg].download_url)
                                   .toAttachment();
                              fs.writeFile('./media/effect/leave.png', image.toBuffer(), (e) => {
                                   if (e) return console.log(e)
                                   const buffer = fs.readFileSync('./media/effect/leave.png')
                                   conn.sendMessage(from, buffer, MessageType.image, { caption: `Selamat tinggal @${people.replace(/@s.whatsapp.net/, '')}, semoga tenang dialam sana. 😇`, contextInfo: { mentionedJid: [people] } })
                                   fs.unlinkSync('./media/effect/leave.png')
                              })
                         })
               } else if (action == 'add') {
                    conn.getProfilePicture(people)
                         .then(async(profile) => {
                              text = ['Haii', 'Haloo', 'Moga Betah', 'Met Datang', 'Nice']
                              const image = await new Canvas.Welcome()
                                   .setText('title', text[Math.floor(Math.random() * text.length)])
                                   .setUsername(pushname)
                                   .setDiscriminator(people.replace(/@s.whatsapp.net/, '').slice(5, 9))
                                   .setMemberCount(partisipan.indexOf(people))
                                   .setGuildName(titlegc)
                                   .setAvatar(profile)
                                   .setColor("border", "#" + colour[acak])
                                   .setColor("username-box", "#" + colour[acak])
                                   .setColor("discriminator-box", "#" + colour[acak])
                                   .setColor("message-box", "#" + colour[acak])
                                   .setColor("title", "#" + colour[acak])
                                   .setColor("avatar", "#" + colour[acak])
                                   .setBackground(bg[acakbg].download_url)
                                   .toAttachment();
                              fs.writeFile('./media/effect/welcome.png', image.toBuffer(), (e) => {
                                   if (e) return console.log(e)
                                   const buffer = fs.readFileSync('./media/effect/welcome.png')
                                   conn.sendMessage(from, buffer, MessageType.image, { caption: `Selamat datang digrup ${titlegc} @${people.replace(/@s.whatsapp.net/, '')}, semoga betah disini ya 😉`, contextInfo: { mentionedJid: [people] } })
                                   fs.unlinkSync('./media/effect/welcome.png')
                              })
                         })
                         .catch(async(e) => {
                              ERRLOG(e)
                              const profile = pepelist[Math.floor(Math.random() * pepelist.length)]
                              text = ['Haii', 'Haloo', 'Moga Betah', 'Met Datang', 'Nice']
                              const image = await new Canvas.Welcome()
                                   .setText('title', text[Math.floor(Math.random() * text.length)])
                                   .setUsername(pushname)
                                   .setDiscriminator(people.replace(/@s.whatsapp.net/, '').slice(5, 9))
                                   .setMemberCount(partisipan.indexOf(people))
                                   .setGuildName(titlegc)
                                   .setAvatar(profile)
                                   .setColor("border", "#" + colour[acak])
                                   .setColor("username-box", "#" + colour[acak])
                                   .setColor("discriminator-box", "#" + colour[acak])
                                   .setColor("message-box", "#" + colour[acak])
                                   .setColor("title", "#" + colour[acak])
                                   .setColor("avatar", "#" + colour[acak])
                                   .setBackground(bg[acakbg].download_url)
                                   .toAttachment();
                              fs.writeFile('./media/effect/welcome.png', image.toBuffer(), (e) => {
                                   if (e) return console.log(e)
                                   const buffer = fs.readFileSync('./media/effect/welcome.png')
                                   conn.sendMessage(from, buffer, MessageType.image, { caption: `Selamat datang digrup ${titlegc} @${people.replace(/@s.whatsapp.net/, '')}, semoga betah disini ya 😉`, contextInfo: { mentionedJid: [people] } })
                                   fs.unlinkSync('./media/effect/welcome.png')
                              })
                         })
               } else if (action == 'promote') {
                    conn.sendMessage(from, `Jabatan @${people.replace(/@s.whatsapp.net/, '')} telah dinaikan menjadi admin. 😄`, MessageType.text, { contextInfo: { mentionedJid: [people] } })
               } else if (action == 'demote') {
                    conn.sendMessage(from, `Jabatan @${people.replace(/@s.whatsapp.net/, '')} telah dihapus dari admin. 😔`, MessageType.text, { contextInfo: { mentionedJid: [people] } })
               }
     }
}