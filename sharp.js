const sharp = require('sharp');
const fs = require('fs');

const buff = fs.readFileSync('./xixi.gif')

// sharp(buff)
//      .toFormat('webp')
     // .resize(512, 512, {
     //      fit: 'contain',
     //      background: {
     //           r: 0,
     //           g: 0,
     //           b: 0,
     //           alpha: 0
     //      }
//      })
//      .toFile('file.webp')

sharp('./imageDownload.jpeg', { pages: -1 })
.flatten({
     fit: 'contain',
     background: {
          r: 0,
          g: 0,
          b: 0,
          alpha: 0
     }
})
.toFile('./xo.webp')
