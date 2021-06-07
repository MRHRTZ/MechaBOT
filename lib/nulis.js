let { spawn } = require('child_process')
const moment = require('moment-timezone')
const time = moment().format('DD/MM HH:mm:ss')
const color = require('./color')
const fs = require('fs')

function INFOLOG(info) {
     return console.log('\x1b[1;34m~\x1b[1;37m>>', '<\x1b[1;33mINF\x1b[1;37m>', time, color(info))
}

function ERRLOG(e) {
     return console.log('\x1b[1;31m~\x1b[1;37m>>', '<\x1b[1;31mERROR\x1b[1;37m>', time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
}
// Font By MFarelS:V
let fontPath = './src/Nisaa.ttf'
function nulis2(args, filename) {
     return new Promise((resolve, reject) => {
          if (!args) return console.log(`No Input Writing!`)
          let inputPath = './src/kertas.jpg'
          let outputPath = `./tmp/${filename}-nulis-hasil.jpg`
          let d = new Date()
          let tgl = d.toLocaleDateString('id-Id')
          let hari = d.toLocaleDateString('id-Id', { weekday: 'long' })
          let proses_tahap_satu = args.replace(/(\S+\s*){1,10}/g, '$&\n')
          let proses_tahap_dua = proses_tahap_satu.split('\n').slice(0, 30).join('\n')
          let teks = proses_tahap_dua
          spawn('convert', [
               inputPath,
               '-font',
               fontPath,
               '-size',
               '1024x784',
               '-pointsize',
               '20',
               '-interline-spacing',
               '1',
               '-annotate',
               '+806+78',
               hari,
               '-font',
               fontPath,
               '-size',
               '1024x784',
               '-pointsize',
               '18',
               '-interline-spacing',
               '1',
               '-annotate',
               '+806+102',
               tgl,
               '-font',
               fontPath,
               '-size',
               '1024x784',
               '-pointsize',
               '20',
               '-interline-spacing',
               '-7.5',
               '-annotate',
               '+344+142',
               teks,
               outputPath
          ])
               .on('error', e => ERRLOG(e) && reject)
               .on('exit', () => {
                    INFOLOG('Write Saved!')
                    resolve(outputPath)
               })
     })
}

function nulis(teks, filename) {
     return new Promise((resolve, reject) => {
          const splitText = teks.replace(/(\S+\s*){1,10}/g, '$&\n')
          const fixHeight = splitText.split('\n').slice(0, 25).join('\n')
          spawn('convert', [
               './src/kertas2.jpg',
               '-font',
               './src/Nisaa.ttf',
               '-size',
               '700x960',
               '-pointsize',
               '25',
               '-interline-spacing',
               '1',
               '-annotate',
               '+170+222',
               fixHeight, // convert ./src/kertas2.jpg -font ./src/Nisaa.ttf -size 700x960 -pointsize 25 -interline-spacing -annotate +170+222 Hai out.jpg
               `./tmp/${filename}-nulis-hasil.jpg`
          ])
               .on('error', () => reject)
               .on('exit', () => {
                    resolve(fs.readFileSync(`./tmp/${filename}-nulis-hasil.jpg`))
                    if (fs.existsSync(`./tmp/${filename}-nulis-hasil.jpg`)) fs.unlinkSync(`./tmp/${filename}-nulis-hasil.jpg`)
               })
     })
}

// nulis(`Haloo a9snuf9eo8nyawoi7acynow87i4tncawo87ei4ctnaow87i4cntagow87e4icntwopa7ei
// tnc[waawc4 ntia nwy49i cnatw49ye4ctn awy4e9ctywa9penct]`, `a`)
module.exports.nulis = nulis

// nulis('Haii', 'sam')
//      .then(console.log)
//      .catch(console.log)