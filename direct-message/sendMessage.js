const fs = require('fs')
let detect = JSON.parse(fs.readFileSync(__dirname + '/detector.json'))

no = '6285559038021'
pesan = `Halo`
type = [
     'textMessage',
     'imageMessage',
     'videoMessage',
     'audioMessage',
     'stickerMessage',
     'extendedTextMessage'
]

detect.push({
     from: no + '@s.whatsapp.net',
     pesan: pesan,
     tipe: type[0]
})
console.log('Pesan telah terkirim ke nomor : ' + no)
fs.writeFileSync(__dirname + '/detector.json', JSON.stringify(detect, null, 2))