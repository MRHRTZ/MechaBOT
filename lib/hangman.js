const fs = require('fs')
const hang = [`
  +---+
  |   |
      |
      |
      |
      |
=========`, `
  +---+
  |   |
  O   |
      |
      |
      |
=========`, `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`]

const kata = JSON.parse(fs.readFileSync('./database/hangman.json')) ///lib
const random = kata[Math.floor(Math.random() * kata.length)]
const settings = JSON.parse(fs.readFileSync('../src/settings.json'))

function setHangman(sesi = '') {
     const sesipath = './database/db_hangman/' + sesi + '.json'
     if (fs.existsSync(sesipath)) {
          const db_hang = JSON.parse(fs.readFileSync(sesipath))
     } else {
          let strReg = '[a-zA-Z]'
          let tertebak = []
          const reg = new RegExp(`${strReg}`, 'g')
          const obj = {
               status: true,
               sesi: sesi,
               regexp: reg,
               kata: random.replace(reg, ' _ ').replace(/ /g, '^'),
               kata_pisah: random.split(''),
               kata_tersisa: settings.HangmanWord,
               testing: random.split('').length + '-' + random.replace(reg, ' _ ').length
          }
          // fs.writeFileSync(sesipath, JSON.stringify(obj, null, 3))
          return obj
     }
}

console.log(setHangman());