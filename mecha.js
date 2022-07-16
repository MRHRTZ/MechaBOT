"use strict";

const fs = require('fs')
const { default: sockWAConnection, MessageType, WAMessageStubType, useSingleFileAuthState, useMultiFileAuthState, DisconnectReason } = require("@adiwajshing/baileys")
const { default: Axios } = require('axios')
const qrcode = require('qrcode')
const chalk = require('chalk')
const cron = require('node-cron');
const moment = require('moment')
const time = moment().format('DD/MM HH:mm:ss')
const pino = require('pino')
const path = require('path')
const pretty = require('pino-pretty')
const stream = pretty({
     colorize: true
})

const logger = pino({}, stream)

let blokir = []

function INFOLOG(info) {
     console.log(chalk.greenBright('[ MECHABOT ]  '), time, color(info))
}

function ERRLOG(e) {
     console.log(chalk.greenBright('[ MECHABOT ]  '), time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
}

const settings = JSON.parse(fs.readFileSync('./src/settings.json'))
// const mysession = settings.Session_Name
const mysession = process.argv[2] || 'hz'///*'mecha'*/'MRHRTZ'

let clientsNow = []
let webSockets = {}
// const client_log = require('./src/handler/socketHandler').client_log
const isClientLog = true //clientsNow.some(arr => client_log.includes(arr))

require('./myHandler')
require('./revokeHandler')
require('./groupManager')
require('./socketHandler')
nocache('./myHandler', module => {
     console.log(chalk.greenBright('[ MECHABOT ] ') + moment(new Date()).format('DD/MM HH:mm:ss') + chalk.cyanBright(` "${module}" Updated!`))
     clientsNow.forEach((client) => {
          if (!isClientLog) return
          client.send(chalk.greenBright('[ MECHABOT ] ') + moment(new Date()).format('DD/MM HH:mm:ss') + chalk.cyanBright(` "${module}" Updated!`))
     })
})
nocache('./groupManager', module => {
     console.log(chalk.greenBright('[ MECHABOT ] ') + moment(new Date()).format('DD/MM HH:mm:ss') + chalk.cyanBright(` "${module}" Updated!`))
     clientsNow.forEach((client) => {
          if (!isClientLog) return
          client.send(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('DD/MM HH:mm:ss') + chalk.cyanBright(` "${module}" Updated!`))
     })
})
nocache('./revokeHandler', module => {
     console.log(chalk.greenBright('[ MECHABOT ] ') + moment(new Date()).format('DD/MM HH:mm:ss') + chalk.cyanBright(` "${module}" Updated!`))
     clientsNow.forEach((client) => {
          if (!isClientLog) return
          client.send(chalk.greenBright('[ MECHABOT ] ') + moment(new Date()).format('DD/MM HH:mm:ss') + chalk.cyanBright(` "${module}" Updated!`))
     })
})
nocache('./socketHandler', module => {
     console.log(chalk.greenBright('[ MECHABOT ] ') + moment(new Date()).format('DD/MM HH:mm:ss') + chalk.cyanBright(` "${module}" Updated!`))
     clientsNow.forEach((client) => {
          if (!isClientLog) return
          client.send(chalk.greenBright('[ MECHABOT ] ') + moment(new Date()).format('DD/MM HH:mm:ss') + chalk.cyanBright(` "${module}" Updated!`))
     })
})

// global.conn = new WAConnection()
// conn.logger.level = 'debug'

const mulai = async () => {
     try {
          // const { state, saveState } = useSingleFileAuthState('./mecha-session.json')
          const { state, saveCreds } = await useMultiFileAuthState('.mech')
          const fetchWaWeb = await Axios.get('https://web.whatsapp.com/check-update?version=0&platform=web')
          const version = fetchWaWeb.data.currentVersion.split('.').map(i => Number(i))

          const sock = sockWAConnection({
               printQRInTerminal: true,
               auth: state,
               version,
               logger
          })

          sock.contacts = []
          sock.chats = []
          sock.blocklist = [] // await sock.fetchBlocklist()

          sock.downloadAndSaveMediaMessage = async (m, path) => {
               const buffer = await downloadMediaMessage(
                    m,
                    'buffer',
                    {},
                    {
                         logger,
                         // pass this so that baileys can request a reupload of media
                         // that has been deleted
                         reuploadRequest: sock.updateMediaMessage
                    }
               )
               // save to file
               await writeFile(path, buffer)
               return path
          }

          sock.ev.on('connection.update', (update) => {
               const { connection, lastDisconnect } = update
               if (connection === 'close') {
                    const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
                    console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
                    // reconnect if not logged out
                    if (shouldReconnect) {
                         wss.close()
                         mulai()
                    } else {
                         console.log('connection stoped');
                    }
               } else if (connection === 'open') {
                    console.log('opened connection')
               }
          })
          sock.ev.on('messages.upsert', m => {
               // console.log('messages.upsert', m)
               // require('./myHandler')(mysession, GroupSettingChange, Mimetype, MessageType, sock, m, chat, clientsNow)
               try {
                    // require(messageModulePath)({ conn, anon, msg, from, fromMe, type, pushname, sender })
                    // require(chattingModulePath)({ conn, anon, msg, from, fromMe, type, pushname, sender })
                    require(path.join(__dirname, './myHandler'))(mysession, sock, m, clientsNow)

               } catch (e) {
                    conn.logger.info(e)
               }
          })

          sock.ev.on('presence.update', m => {
               // console.log('presence.update', m)
               if (!m?.id) return
               INFOLOG(`${m.id} is ${m.presences[m.id] ? m.presences[m.id]['lastKnownPresence'] : '..'}`)
          })

          sock.ev.on('chats.update', m => {
               // console.log('chats.update', m)
               if (sock.chats.filter(v => v.id == m[0].id).length) sock.chats.push(...m)
          })

          sock.ev.on('contacts.update', m => {
               // console.log('contacts.update', m)
               if (sock.contacts.filter(v => v.id == m[0].id).length) sock.contacts.push(...m)
          })

          sock.ev.on('creds.update', saveCreds)


          const express = require('express')
          const PORT = Math.floor(4000 + Math.random() * 9000) // process.env.PORT || settings.PORT;
          const { Server } = require('ws');

          const server = express()
               .use((req, res) => {
                    res.send({ status: true, address: req.headers['x-forwarded-for'] || req.connection.remoteAddress })
               })
               .listen(PORT, () => console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('DD/MM HH:mm:ss') + ' ' + chalk.blueBright('Socket Ready On Port ' + PORT)));

          // console.log(server)

          const wss = new Server({ server });


          wss.on('connection', async (ws) => {
               // console.log(ws.id);
               clientsNow.push(ws)
               var userID = clientsNow.length
               webSockets[userID] = ws
               console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('DD/MM HH:mm:ss') + ' ' + chalk.bgBlueBright('Client ' + userID + ' Connected '))
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
                         moment(new Date()).format('DD/MM HH:mm:ss'),
                         chalk.blueBright(dataMsg),
                         "dari",
                         chalk.bgGreen(`[ Client WS ]`));
                    require('./socketHandler')(ws, conn, dataMsg, wsArgs, clientsNow)
               }
               ws.on('close', () => console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('DD/MM HH:mm:ss') + ' ' + chalk.bgRedBright('Client Disconnected')));
          });

          cron.schedule(`${settings.Reset_Time.Minute} ${settings.Reset_Time.Hour} * * *`, () => {
               let obj = JSON.parse(fs.readFileSync("./lib/database/limit.json"));
               for (let i in obj) {
                    if (obj[i].limit < settings.Limit) {
                         obj[i].Status = true;
                         obj[i].limit = settings.Limit;
                    }
               }
               fs.writeFileSync("./lib/database/limit.json", JSON.stringify(obj, null, 2));
               console.log(chalk.greenBright('[ MECHABOT ]  ') + moment(new Date()).format('DD/MM HH:mm:ss') + ' ' + chalk.bgBlueBright('Reset success : ' + settings.Limit + ' limit'))
               conn.sendMessage(settings.Owner, `\`\`\`Berhasil reset limit sebanyak ${settings.Limit} pada ${settings.Reset_Time.Hour}:${settings.Reset_Time.Minute}\`\`\`  ✅`, MessageType.text)
          }, {
               scheduled: true,
               timezone: "Asia/Jakarta"
          });

          // conn.on('chat-update', async (chat) => {
          //      // const m = chat.messages.all()[0] // pull the new message from the update
          //      // const messageStubType = WA_MESSAGE_STUB_TYPES[m.messageStubType] ||  'MESSAGE'
          //      // console.log('STUB', messageStubType)
          //      if (chat.imgUrl) {
          //           INFOLOG('imgUrl of chat changed ', chat.imgUrl)
          //           return
          //      }
          //      // only do something when a new message is received
          //      if (!chat.hasNewMessage) {
          //           if (chat.messages) {
          //                // INFOLOG('Chat baru di ' + chat.jid + '.')
          //           }
          //           return
          //      }
          //      const hurtz = chat.messages.all()[0];
          //      if (!hurtz.key) return
          //      // const setting = require('./src/settings.json')
          //      require('./myHandler')(mysession, Mimetype, MessageType, conn, hurtz, chat, clientsNow)
          // })

          // conn.on('group-participants-update', async (update) => {
          //      // INFOLOG(getName(conn, update.participants[0]) + ' Telah ' + update.action == 'remove' ? 'Keluar' : update.action == 'add' ? 'Masuk Grup' : update.action == 'promote' ? 'Menjadi Admin' : update.action == 'demote' ? 'Dihapus admin' : update.action + ' Di ' + update.jid)
          //      INFOLOG(update.jid + ' : ' + update.action)
          //      const setting = require('./src/settings.json')
          //      require('./groupManager')(setting, Mimetype, MessageType, conn, update)
          // })

          // conn.on('close', ({ reason, isReconnecting }) => {
          //      INFOLOG('Terputus :( ' + reason + ', ' + chalk.blue('Menkoneksi ulang : ' + isReconnecting))
          //      if (!isReconnecting) {
          //           INFOLOG('Shuting Down')
          //           process.exit(1)
          //      }
          // })
          // conn.on('CB:action,add:relay,message', (cek) => {
          //      const type = cek[2][0][2] ? cek[2][0][2].message ? cek[2][0][2].message.protocolMessage ? cek[2][0][2].message.protocolMessage.type : false : false : false
          //      /*
          //      message ProtocolMessage {
          //      optional MessageKey key = 1;
          //      enum ProtocolMessageType {
          //           REVOKE = 0;
          //           EPHEMERAL_SETTING = 3;
          //           EPHEMERAL_SYNC_RESPONSE = 4;
          //           HISTORY_SYNC_NOTIFICATION = 5;
          //           APP_STATE_SYNC_KEY_SHARE = 6;
          //           APP_STATE_SYNC_KEY_REQUEST = 7;
          //           MSG_FANOUT_BACKFILL_REQUEST = 8;
          //           INITIAL_SECURITY_NOTIFICATION_SETTING_SYNC = 9;
          //      }
          //      */
          //      if (type === 0 && !type) {
          //           require('./revokeHandler')(mysession, WAMessageStubType, cek[2][0][2], conn, Mimetype, MessageType)
          //      }
          // })
          // // conn.logger.
          // conn.on('CB:action,,battery', json => {
          //      fs.writeFileSync('./lib/database/batt.json', JSON.stringify(json[2][0], null, 2))
          // })

          // conn.on('CB:Blocklist', json => {
          //      if (blokir.length > 2) return
          //      for (let index of json[1].blocklist) {
          //           blokir.push(index.replace(/@c.us/g, '@s.whatsapp.net'))
          //      }
          // })

          // conn.on('message-update', async (hurtzz) => {
          //      console.log(hurtzz)
          // })

          return sock
     } catch (e) {
          logger.error(e)
     }
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
