const { exec } = require('child_process')
const fs = require('fs')

const input = 'cekanim' + '.webp'
const output = 'mine' + '.mp4'
const delay = '0'
const loop = '0'
const tmp = './tmp'
let detector = []
if (!fs.existsSync(tmp)) {
     fs.mkdirSync(tmp)
}
const data = fs.readdirSync(`${tmp}`)
for (let i = 0; i < data.length; i++) {
     if (data.includes(`${input}-${i}.png`)) {
          detector.push(`${i}`)
     }
}

exec(`webpinfo -quiet -summary ${input}`, (err, stdout, stderr) => {
     if (err) throw new Error(err)
     const frame = Number(stdout.split('Chunk type')[0].replace('Summary:\r\nNumber of frames: ', '').replace(/\r\n/g, ''))
     console.log('Frame : ' + frame)
     for (let i = 0; i <= frame; i++) {
          exec(`webpmux -get frame ${i} ${input} -o ${tmp}/${input}-${i}.webp`, (err, stdout, stderr) => {
               if (err) throw new Error(err)
               exec(`dwebp ${tmp}/${input}-${i}.webp -o ${tmp}/${input}-${i}.png`, (err, stdout, stderr) => {
                    if (err) throw new Error(err)
                    detector.push('Go on..')
               })
          })
     }
     exec(`convert ${tmp}/${input}-*.png -delay ${delay} -loop ${loop} ${input}.gif`, (err, stdout, stderr) => {
          if (err) throw new Error(err)
          const dirs = fs.readdirSync(`${tmp}`)
          let dirss = []
          for (let i = 0; i < dirs.length; i++) {
               if (dirs.includes(`${input}-${i}.png`)) {
                    dirss.push(`${input}-${i}`)
               }
          }
          for (let i = 0; i < dirss.length; i++) {
               fs.unlinkSync(`${tmp}/${input}-${i}.webp`)
               fs.unlinkSync(`${tmp}/${input}-${i}.png`)
          }
          exec(`ffmpeg -i ${input}.gif -pix_fmt yuv420p ${output}`, (err, stdout, stderr) => {
               if (err) throw new Error(err)
               fs.unlinkSync(`${output}`)
          })
          
          // fs.unlinkSync(`${output}`)
          console.log(`Process success!`)
     })
     

     // console.log(detector)
})
