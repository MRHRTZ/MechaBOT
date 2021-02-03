const { default: Axios } = require('axios');
const fs = require('fs');

module.exports = groupHandler = async (setting, GroupSettingChange, Mimetype, MessageType, conn, update) => {
     // console.log(update)
     const database = JSON.parse(fs.readFileSync('./lib/database/welcomer-leaver.json'))
     const sample = {
          jid: '6285559038021-1603688917@g.us',
          participants: ['2348036712904@s.whatsapp.net'],
          action: 'remove'
     }
     const pepelist = [
          'https://www.gambarunik.id/wp-content/uploads/2019/06/Berbagai-Gambar-Foto-Profil-Kosong-Lucu-Untuk-Status.jpg',
          'http://2.bp.blogspot.com/-IU9LB4mu-Ms/TYW4GeURMQI/AAAAAAAAA4A/4cqznKhNBp8/s1600/funny%2BFacebook%2Bdefault%2Bpictures3.jpg',
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png',
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
     ]
     const from = update.jid
     const people = update.participants[0] 
     const profile = (await conn.getProfilePicture(people)) ? await conn.getProfilePicture(people) : pepelist[Math.floor(Math.random() * pepelist.length)]
     const action = update.action
     async function sendDariUrl(dari, url, type, text) {
          if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi.test(url)) return console.error(`Not a valid url!`)
          const caption = text || ''
          const buffData = await Axios.request({
               method: 'GET',
               url: url,
               responseType: 'arraybuffer',
               responseEncoding: 'binary'
          });
          conn.sendMessage(dari, buffData.data, type, { contextInfo: { mentionedJid: [ people ] }, caption: caption })
     }
     console.log(update)
     if (!database.includes(from)) return
     console.log('ada')
     if (action == 'remove') {
          sendDariUrl(from, profile, MessageType.image, `Selamat tinggal @${people.replace(/@s.whatsapp.net/,'')}, semoga tenang dialam sana. 😇`)         
     } else if (action == 'add') {
          sendDariUrl(from, profile, MessageType.image, `Selamat datang digrup ${(await conn.groupMetadata(from)).subject} @${people.replace(/@s.whatsapp.net/,'')}, semoga betah disini ya 😉`)
     } else if (action == 'promote') {
          conn.sendMessage(from, `Jabatan @${people.replace(/@s.whatsapp.net/,'')} telah dinaikan menjadi admin. 😄`, MessageType.text, { contextInfo: { mentionedJid: [ people] } })
     } else if (action == 'demote') {
          conn.sendMessage(from, `Jabatan @${people.replace(/@s.whatsapp.net/,'')} telah dihapus dari admin. 😔`, MessageType.text, { contextInfo: { mentionedJid: [ people] } })
     }
}