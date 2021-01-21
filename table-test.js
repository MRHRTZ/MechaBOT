const { exec, spawn } = require('child_process')
const fs = require('fs')
const moment = require('moment')
const Table = require('cli-table')
const table = new Table({ head: ["No", "Nomer wa", "Tersedia"] })

for (let i = 0; i < 5; i++) {
     const num = `628555629802${i}`
     const isOk = num.slice(-1) == 2 || num.slice(-1) == 3 ? "Ok" : "Hmm"
     // console.log(isOk)
     table.push(
          [1 + i, `wa.me/${num}`, isOk]
     )
}

// exec('', (err, stdout, stderr) => {
//      if (err) {
//           console.error(err);
//           return;
//      }
//      console.log(stdout)
// })

// console.log(table.toString().replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,''))
function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
}

// console.log(getRandomInt(0, 6))
// const db = JSON.parse(fs.readFileSync('./lib/new-chat/database.json'))
// const from = '62857313534sa1@s.whatsapp.net'
// const isExist = db.number.includes(from)
// const now = moment().unix()
// const after = moment().add(2, 'minutes').unix()
// if (isExist) {
//      const index = db.number.indexOf(from)
//      const isNow = db.timestamp_after[index] <= now
//      if (isNow) {
//           console.log(` ${now} >= ${db.timestamp_after[index]} || MESSAGES!!`)
//           db.timestamp_after.splice(index, 1)
//           db.timestamp_after.push(after)
//           fs.writeFileSync('./lib/new-chat/database.json', JSON.stringify(db, null, 2))
//      } else {
//           console.log(` ${now} >= ${db.timestamp_after[index]} || Not this time.`)
//      }
// } else {
//      db.number.push(from)
//      db.timestamp_after.push(after)
//      fs.writeFileSync('./lib/new-chat/database.json', JSON.stringify(db, null, 2))
//      console.log(`Adding data!`)
// }

// const te = db.number.indexOf('6285731353491@s.whatsapp.net')
// db.number.splice(te, 1)
// db.timestamp_after.splice(te, 1)
// fs.writeFileSync('./lib/new-chat/database.json', JSON.stringify(db, null, 2))

// const isSameOrAfter = after <= now ? true : false

// console.log(`Now : ${now}, After : ${after}, isSameOrAfter : ${isSameOrAfter}`)

