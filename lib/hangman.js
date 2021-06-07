const fs = require('fs')
const hang = [
     `\r\n------+\r\n  |       |\r\n  |     \r\n  |       \r\n  |\r\n  |\r\n===========`,
     `\r\n------+\r\n  |       |\r\n  |     \uD83D\uDE04\r\n  |\r\n  |\r\n  |\r\n===========`,
     `\r\n------+\r\n  |       |\r\n  |     \uD83D\uDE00\r\n  |       |\r\n  |\r\n  |\r\n===========`,
     `\r\n------+\r\n  |       |\r\n  |     \uD83D\uDE42\r\n  |     \/ |\r\n  |\r\n  |\r\n===========`,
     `\r\n------+\r\n  |       |\r\n  |     \uD83D\uDE10\r\n  |     \/ | \\\r\n  |\r\n  |\r\n===========`,
     `\r\n------+\r\n  |       |\r\n  |     \uD83D\uDE1F\r\n  |     \/ | \\\r\n  |      \/\r\n  |\r\n===========`,
     `\r\n------+\r\n  |       |\r\n  |     \uD83D\uDE35\r\n  |     \/ | \\\r\n  |      \/ \\\r\n  |\r\n===========`
]

const kata = JSON.parse(fs.readFileSync('./lib/database/hangman.json'))
const random = (kata[Math.floor(Math.random() * kata.length)]).toLowerCase()
const settings = JSON.parse(fs.readFileSync('./src/settings.json'))

function setHangman(sesi = '', kata, pushname, jid) {
     const sesipath = './lib/database/db_hangman/' + sesi + '.json'
     if (fs.existsSync(sesipath)) {
          let db_hang = JSON.parse(fs.readFileSync(sesipath))
          if (db_hang.kata_belum_ditebak.toLowerCase().includes(kata.toLowerCase())) {
               // benar
               let tertebak = db_hang.tertebak
               tertebak.push(kata)
               let WORDS = db_hang.kata_belum_ditebak
               for (let i = 0;i < tertebak.length;i++) {
                    WORDS = WORDS.replace(new RegExp(tertebak[i], 'gi'), '')
               }
               let strReg = '[\b(?!' + WORDS + ')\S+\b$]'
               const reg = new RegExp(`${strReg}`, 'g')
               let obj = {
                    status: true,
                    game: 'playing',
                    statusUser: {
                         benar: [...db_hang.statusUser.benar, pushname],
                         salah: [...db_hang.statusUser.salah]
                    },
                    jidUser: {
                         benar: [...db_hang.jidUser.benar, jid],
                         salah: [...db_hang.jidUser.salah]
                    },
                    ditebak: pushname,
                    sesi: db_hang.sesi,
                    regexp: strReg,
                    tertebak: tertebak,
                    kata_belum_ditebak: WORDS,
                    kata: db_hang.kata_ori.replace(reg, ' _ '),
                    kata_ori: db_hang.kata_ori,
                    kata_tersisa: db_hang.kata_tersisa,
                    hangman: hang[hang.length - db_hang.kata_tersisa]
               }
               // console.log(hang.length - db_hang.kata_tersisa);
               if (!obj.kata.includes('_')) {
                    obj = {
                         status: true,
                         message: 'Game berakhir dengan kemenangan!',
                         game: 'win',
                         hangman: hang[hang.length - db_hang.kata_tersisa],
                         statusUser: {
                              benar: [...db_hang.statusUser.benar],
                              salah: [...db_hang.statusUser.salah]
                         },
                         jidUser: {
                              benar: [...db_hang.jidUser.benar],
                              salah: [...db_hang.jidUser.salah]
                         },
                         kata: db_hang.kata_ori
                    }
                    fs.unlinkSync(sesipath)
                    return obj
               }
               fs.writeFileSync(sesipath, JSON.stringify(obj, null, 5))
               return obj
          } else {
               if (kata === 'falseXz') {
                    db_hang.game = 'Exist'
                    return db_hang
               }
               if (db_hang.tertebak.includes(kata)) {
                    return {
                         status: false,
                         message: 'Kata tersebut telah ditebak sebelumnya!',
                         tertebak: db_hang.tertebak
                    }
               }
               // salah
               let tersisa = db_hang.kata_tersisa - 1
               let obj = {
                    status: false,
                    message: 'Kata salah!',
                    game: 'playing',
                    statusUser: {
                         benar: [...db_hang.statusUser.benar],
                         salah: [...db_hang.statusUser.salah, pushname]
                    },
                    jidUser: {
                         benar: [...db_hang.jidUser.benar],
                         salah: [...db_hang.jidUser.salah, jid]
                    },
                    ditebak: pushname,
                    sesi: db_hang.sesi,
                    regexp: db_hang.regexp,
                    tertebak: db_hang.tertebak,
                    kata_belum_ditebak: db_hang.kata_belum_ditebak,
                    kata: db_hang.kata,
                    kata_ori: db_hang.kata_ori,
                    kata_tersisa: tersisa,
                    hangman: hang[hang.length - tersisa]
               }
               // console.log(hang.length - tersisa);
               if (tersisa <= 0) {
                    obj = {
                         status: false,
                         message: 'Game telah berakhir!',
                         game: 'lose',
                         hangman: hang[hang.length - db_hang.kata_tersisa],
                         statusUser: {
                              benar: [...db_hang.statusUser.benar],
                              salah: [...db_hang.statusUser.salah]
                         },
                         jidUser: {
                              benar: [...db_hang.jidUser.benar],
                              salah: [...db_hang.jidUser.salah]
                         },
                         kata: db_hang.kata_ori
                    }
                    fs.unlinkSync(sesipath)
                    return obj
               }
               fs.writeFileSync(sesipath, JSON.stringify(obj, null, 5))
               return obj
          }
     } else {
          let WORDS = random.replace(/ |\-/g, '')
          let strReg = '[\b(?!' + WORDS + ')\S+\b$]'
          const reg = new RegExp(`${strReg}`, 'g')
          const obj = {
               status: true,
               game: 'created',
               statusUser: {
                    benar: [],
                    salah: []
               },
               jidUser: {
                    benar: [],
                    salah: []
               },
               sesi: sesi,
               regexp: strReg,
               tertebak: [],
               kata_belum_ditebak: WORDS,
               kata: random.replace(reg, ' _ '),
               kata_ori: random,
               kata_tersisa: settings.HangmanWord,
               hangman: hang[hang.length - settings.HangmanWord]
          }
          fs.writeFileSync(sesipath, JSON.stringify(obj, null, 5))
          return obj
     }
}

function isPlayHangman(sesi = '') {
     const sesipath = './lib/database/db_hangman/' + sesi + '.json'
     if (fs.existsSync(sesipath)) {
          return true
     } else {
          return false
     }
}
// console.log(setHangman('hz', process.argv[2], 'yaha'));
// console.log(isPlayHangman('hZ'));

module.exports = { setHangman, isPlayHangman }