const { default: Axios } = require('axios')
const cheerio = require('cheerio')

function randomFamily100() {
     return new Promise((resolve, reject) => {
          Axios
          .get('https://teknologital.com/kunci-jawaban-ica-ica/')
          .then(({ data }) => {
               const $ = cheerio.load(data)
               const datanya = $('div.entry-content > p:nth-child(4)').text().split('\n')
               let pertanyaan = []
               let jawaban = []
               for (let dath of datanya) {
                    if (!dath.includes('Jawaban : ')) {
                         pertanyaan.push(dath)
                    } else {
                         jawaban.push(dath)
                    }
               }
               let result = []
               
               console.log(pertanyaan.length, jawaban.length)
               // resolve({ res: jawaban })
          })
          .catch(reject)
     })
}

randomFamily100()
.then(console.log)
.catch(console.log)