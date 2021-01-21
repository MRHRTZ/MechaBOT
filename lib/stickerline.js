const { default: Axios } = require('axios');
const { apng2webpUrl } = require('./converter')

function slineMetadata(id) {
     return new Promise((resolve, reject) => {
          Axios.get(`http://dl.stickershop.line.naver.jp/products/0/0/1/${id}/android/productInfo.meta`)
               .then(({ data }) => {
                    const id = data.packageId
                    const title = data.title.en
                    const author = data.author.en
                    const ani = data.hasAnimation
                    let stickers = []
                    data.stickers.forEach((rest) => {
                         stickers.push(rest)
                    })
                    resolve({
                         id: id,
                         title: title,
                         animate: ani,
                         author: author,
                         stickers: stickers
                    })
               }).catch(reject)
     })
}


function getStikerLine(url) {
     return new Promise((resolve, reject) => {
          const id = url.match(/[0-9]/g).join('')
          slineMetadata(id)
          .then(async (a) => {
               const stiker = a.stickers
               const id = a.id
               let urls = []
               if (a.animate) {
                    for (let i = 0; i < stiker.length; i++) {
                         const dapetcv = await apng2webpUrl(`https://sdl-stickershop.line.naver.jp/products/0/0/1/${id}/android/animation/${stiker[i].id}.png`)
                         urls.push(dapetcv.result)
                    }
               } else if (!a.animate) {
                    for (let i = 0; i < stiker.length; i++) {
                         const dapetcv = await apng2webpUrl(`http://dl.stickershop.line.naver.jp/stickershop/v1/sticker/${stiker[i].id}/android/sticker.png`)
                         urls.push(dapetcv.result)
                    }

               }
               resolve({
                    status: true,
                    message: "Created By MRHRTZ",
                    result: urls
               })
          }).catch(reject)
     })
}

module.exports.getStikerLine = getStikerLine