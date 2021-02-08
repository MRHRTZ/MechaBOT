// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const port = process.env.PORT || 5050;
const fs = require('fs')
const zezi = (JSON.parse(fs.readFileSync('./src/settings.json'))).Sesi;
let sesi

// io.on('connection', (socket) => {
//      // socket.on('chat message', msg => {
//      //      io.emit('chat message', msg);
//      // });
//      app.get('/', (req, res) => {
//           res.sendFile(__dirname + '/index.html');
//      });
// });

// http.listen(port, () => {
//      console.log(`Socket.IO server running at http://localhost:${port}/`);
// });

// for (let se of zezi) {
//      if (conn.user.jid == se.Jid) {
//           sesi = se.Name
//      }
// }
const mysession = process.argv[2] || 'mecha'///*'mecha'*/'MRHRTZ'
const { WAConnection, MessageType, Presence, MessageOptions, Mimetype, WALocationMessage, WA_MESSAGE_STUB_TYPES, ReconnectMode, ProxyAgent, waChatKey, GroupSettingChange } = require("@adiwajshing/baileys")
const qrcode = require('qrcode')
const chalk = require('chalk')
const moment = require('moment')
const time = moment().format('DD/MM HH:mm:ss')
let blokir = []


function INFOLOG(info) {
     console.log('\x1b[1;34m~\x1b[1;37m>>', '<\x1b[1;33mINF\x1b[1;37m>', time, color(info))
}

function ERRLOG(e) {
     console.log('\x1b[1;31m~\x1b[1;37m>>', '<\x1b[1;31mERROR\x1b[1;37m>', time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
}

require('./myHandler')
require('./revokeHandler')
require('./groupManager')
nocache('./myHandler', module => INFOLOG(`${module} Telah diupdate!`))
nocache('./groupManager', module => INFOLOG(`${module} Telah diupdate!`))
nocache('./revokeHandler', module => INFOLOG(`${module} Telah diupdate!`))

// global.conn = new WAConnection()
// conn.logger.level = 'debug'

const mulai = async (sesi, conn = new WAConnection()) => {

     conn.on('qr', qr => {
          conn.regenerateQRIntervalMs = null
          qrcode.toDataURL(qr, { scale: 8 }, (err, Durl) => {
               const data = Durl.replace(/^data:image\/png;base64,/, '')
               // console.log(url)
               fs.writeFileSync(`./media/qrcode/${sesi}.png`, data, 'base64')
          })
          console.log(`[ ${moment().format('HH:mm:ss')} ] Silahkan scan,,`)
     })

     conn.on('credentials-updated', () => {
          console.log(`Berhasil update kredensial`)
          const authInfo = conn.base64EncodedAuthInfo()
          fs.writeFileSync('./sessions/' + sesi + '.sesi.json', JSON.stringify(authInfo, null, 2))
     })

     fs.existsSync('./sessions/' + sesi + '.sesi.json') && conn.loadAuthInfo('./sessions/' + sesi + '.sesi.json')

     conn.connect()

     conn.on('chat-update', async (chat) => {
          if (chat.imgUrl) {
               INFOLOG('imgUrl of chat changed ', chat.imgUrl)
               return
          }
          // only do something when a new message is received
          if (!chat.hasNewMessage) {
               if (chat.messages) {
                    // INFOLOG('updated message: ', chat.messages.first)
               }
               return
          }
          const hurtz = chat.messages.all()[0];
          const setting = require('./src/settings.json')
          require('./myHandler')(setting, GroupSettingChange, Mimetype, MessageType, conn, hurtz, chat)
     })

     conn.on('group-participants-update', async (update) => {
          // INFOLOG(getName(conn, update.participants[0]) + ' Telah ' + update.action == 'remove' ? 'Keluar' : update.action == 'add' ? 'Masuk Grup' : update.action == 'promote' ? 'Menjadi Admin' : update.action == 'demote' ? 'Dihapus admin' : update.action + ' Di ' + update.jid)
          INFOLOG(update.jid + ' : ' + update.action)
          const setting = require('./src/settings.json')
          require('./groupManager')(setting, GroupSettingChange, Mimetype, MessageType, conn, update)
     })

     conn.on('close', ({ reason, isReconnecting }) => (
          INFOLOG('TERDISKONEK! : ' + reason + ', ' + chalk.blue('Menkoneksi ulang : ' + isReconnecting))
     ))

     conn.on('CB:action,,battery', json => {
          const batteryLevelStr = json[2][0][1].value
          const batterylevel = parseInt(batteryLevelStr)
          // INFOLOG('battery level: ' + batterylevel)
          fs.writeFileSync('./lib/database/batt.json', JSON.stringify(json[2][0], null, 2))
     })

     conn.on('CB:Blocklist', json => {
          if (blokir.length > 2) return
          for (let index of json[1].blocklist) {
               blokir.push(index.replace(/@c.us/g, '@s.whatsapp.net'))
          }
     })

     conn.on('message-update', async (hurtzz) => {
          require('./revokeHandler')(WA_MESSAGE_STUB_TYPES, hurtzz, conn, Mimetype, MessageType)
     })
}




/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
     INFOLOG('Module', `${module}`, 'sedang diperhatikan untuk perubahan')
     fs.watchFile(require.resolve(module), async () => {
          await uncache(require.resolve(module))
          cb(module)
     })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
     return new Promise((resolve, reject) => {
          try {
               delete require.cache[require.resolve(module)]
               resolve()
          } catch (e) {
               reject(e)
          }
     })
}



mulai(mysession)
     .catch(e => ERRLOG(e))