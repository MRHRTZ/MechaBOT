"use strict";

const fs = require('fs')
const { WAConnection, MessageType, Presence, MessageOptions, Mimetype, WALocationMessage, WA_MESSAGE_STUB_TYPES, ReconnectMode, ProxyAgent, waChatKey, GroupSettingChange } = require("@adiwajshing/baileys")
const qrcode = require('qrcode')
const chalk = require('chalk')
const cron = require('node-cron');
const moment = require('moment')
const time = moment().format('DD/MM HH:mm:ss')
let blokir = []



function INFOLOG(info) {
     console.log('\x1b[1;34m~\x1b[1;37m>>', '<\x1b[1;33mINF\x1b[1;37m>', time, color(info))
}

function ERRLOG(e) {
     console.log('\x1b[1;31m~\x1b[1;37m>>', '<\x1b[1;31mERROR\x1b[1;37m>', time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
}

const settings = JSON.parse(fs.readFileSync('./src/settings.json'))
// const mysession = settings.Session_Name
const mysession = process.argv[2] || 'daz.'///*'mecha'*/'MRHRTZ'

let clientsNow = []
let webSockets = {}
// const client_log = require('./src/handler/socketHandler').client_log
const isClientLog = true //clientsNow.some(arr => client_log.includes(arr))

require('./myHandler')
require('./revokeHandler')
require('./groupManager')
require('./socketHandler')
nocache('./myHandler', module => {
     console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + chalk.cyanBright(` "${module}" Updated!`))
     clientsNow.forEach((client) => {
          if (!isClientLog) return
          client.send(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + chalk.cyanBright(` "${module}" Updated!`))
     })
})
nocache('./groupManager', module => {
     console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + chalk.cyanBright(` "${module}" Updated!`))
     clientsNow.forEach((client) => {
          if (!isClientLog) return
          client.send(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + chalk.cyanBright(` "${module}" Updated!`))
     })
})
nocache('./revokeHandler', module => {
     console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + chalk.cyanBright(` "${module}" Updated!`))
     clientsNow.forEach((client) => {
          if (!isClientLog) return
          client.send(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + chalk.cyanBright(` "${module}" Updated!`))
     })
})
nocache('./socketHandler', module => {
     console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + chalk.cyanBright(` "${module}" Updated!`))
     clientsNow.forEach((client) => {
          if (!isClientLog) return
          client.send(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + chalk.cyanBright(` "${module}" Updated!`))
     })
})

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

     conn.on('contacts-received', () => {
          conn.logger.info(`Berhasil update kredensial`)
          const authInfo = conn.base64EncodedAuthInfo()
          fs.writeFileSync('./sessions/' + sesi + '.sesi.json', JSON.stringify(authInfo, null, 2))
     })

     fs.existsSync('./sessions/' + sesi + '.sesi.json') && conn.loadAuthInfo('./sessions/' + sesi + '.sesi.json')

     conn.connect()

     const express = require('express')
     const PORT = process.env.PORT || settings.PORT;
     const { Server } = require('ws');

     const server = express()
          .use((req, res) => {
               res.send({ status: true, address: req.headers['x-forwarded-for'] || req.connection.remoteAddress })
          })
          .listen(PORT, () => console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + ' ' + chalk.blueBright('Socket Ready On Port ' + PORT)));

     // console.log(server)

     const wss = new Server({ server });


     wss.on('connection', async (ws) => {
          // console.log(ws.id);
          clientsNow.push(ws)
          var userID = clientsNow.length
          webSockets[userID] = ws
          console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + ' ' + chalk.bgBlueBright('Client ' + userID + ' Connected '))
          const statusConnected = chalk.greenBright('\nConnected client id : ' + clientsNow.length)
          ws.send(statusConnected)

          ws.onmessage = (message) => {
               // return console.log(message)
               const dataMsg = message.data

               clientsNow.forEach((client) => {
                    client.send(chalk.cyanBright('Client ') + ': ' + chalk.white(dataMsg))
               });
               const wsArgs = dataMsg.split(/ +/g)
               console.log(
                    chalk.greenBright('[ MECHABOT ] '),
                    moment(new Date()).format('HH:mm:ss DD/MM/YYYY'),
                    chalk.blueBright(dataMsg),
                    "dari",
                    chalk.bgGreen(`[ Client WS ]`));
               require('./socketHandler')(ws, conn, dataMsg, wsArgs, clientsNow)

               // if (dataMsg == 'kirim') {
               //      conn
               //      ws.send(util.format(eval(dataMsg.slice(4))))
               // }
          }//)
          ws.on('close', () => console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + ' ' + chalk.bgRedBright('Client Disconnected')));
     });

     cron.schedule('06 8 * * *', () => {
          let obj = JSON.parse(fs.readFileSync("./lib/database/limit.json"));
          for (let i in obj) {
               if (obj[i].limit < settings.Limit) {
                    obj[i].Status = true;
                    obj[i].limit = settings.Limit;
               }
          }
          fs.writeFileSync("./lib/database/limit.json", JSON.stringify(obj, null, 2));
          console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('HH:mm:ss DD/MM/YYYY') + ' ' + chalk.bgBlueBright('Reset success : ' + settings.Limit + ' limit'))
     }, {
          scheduled: true,
          timezone: "Asia/Jakarta"
     });

     conn.on('chat-update', async (chat) => {
          // const m = chat.messages.all()[0] // pull the new message from the update
          // const messageStubType = WA_MESSAGE_STUB_TYPES[m.messageStubType] ||  'MESSAGE'
          // console.log('STUB', messageStubType)
          if (chat.imgUrl) {
               INFOLOG('imgUrl of chat changed ', chat.imgUrl)
               return
          }
          // only do something when a new message is received
          if (!chat.hasNewMessage) {
               if (chat.messages) {
                    // INFOLOG('Chat baru di ' + chat.jid + '.')
               }
               return
          }
          const hurtz = chat.messages.all()[0];
          if (!hurtz.key) return
          // const setting = require('./src/settings.json')
          require('./myHandler')(mysession, GroupSettingChange, Mimetype, MessageType, conn, hurtz, chat, clientsNow)
     })

     conn.on('group-participants-update', async (update) => {
          // INFOLOG(getName(conn, update.participants[0]) + ' Telah ' + update.action == 'remove' ? 'Keluar' : update.action == 'add' ? 'Masuk Grup' : update.action == 'promote' ? 'Menjadi Admin' : update.action == 'demote' ? 'Dihapus admin' : update.action + ' Di ' + update.jid)
          INFOLOG(update.jid + ' : ' + update.action)
          const setting = require('./src/settings.json')
          require('./groupManager')(setting, GroupSettingChange, Mimetype, MessageType, conn, update)
     })

     conn.on('close', ({ reason, isReconnecting }) => {
          INFOLOG('Terputus :( ' + reason + ', ' + chalk.blue('Menkoneksi ulang : ' + isReconnecting))
          if (!isReconnecting) {
               INFOLOG('Shuting Down')
               process.exit(1)
          }
     })
     conn.on('CB:action,add:relay,message', (cek) => {
          const type = cek[2][0][2] ? cek[2][0][2].message ? cek[2][0][2].message.protocolMessage ? cek[2][0][2].message.protocolMessage.type : false : false : false
          /*
          message ProtocolMessage {
          optional MessageKey key = 1;
          enum ProtocolMessageType {
               REVOKE = 0;
               EPHEMERAL_SETTING = 3;
               EPHEMERAL_SYNC_RESPONSE = 4;
               HISTORY_SYNC_NOTIFICATION = 5;
               APP_STATE_SYNC_KEY_SHARE = 6;
               APP_STATE_SYNC_KEY_REQUEST = 7;
               MSG_FANOUT_BACKFILL_REQUEST = 8;
               INITIAL_SECURITY_NOTIFICATION_SETTING_SYNC = 9;
          }
          */
          if (type === 0 && !type) {
               require('./revokeHandler')(mysession, WA_MESSAGE_STUB_TYPES, cek[2][0][2], conn, Mimetype, MessageType)
          }
     })
     // conn.logger.
     conn.on('CB:action,,battery', json => {
          // const batteryLevelStr = json[2][0][1].value
          // const batterylevel = parseInt(batteryLevelStr)
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
          console.log(hurtzz)
     })
}




/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
     INFOLOG(`Module ${module} sedang diperhatikan terhadap perubahan`)
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