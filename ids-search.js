const fs = require('fs')
let infoMSG = JSON.parse(fs.readFileSync('./lib/msgInfo.json'))
const id = 'C8BE827D2D3FC091117412ED5871A42D'
let int
for (let i = 0; i < infoMSG.length; i++) {
     if (infoMSG[i].key.id == id) {
          const dataInfo = infoMSG[i]
          int = dataInfo
     }
}
console.log(int)