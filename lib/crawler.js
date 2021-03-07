const { default: Axios } = require('axios')
const cheerio = require('cheerio')

/**
 * Fungsi untuk search ya gaes
 * @param {string} query Searching Web engine
*/
function crawl(query) {
     return new Promise((resolve, reject) => {
          Axios.get('https://search.lycos.com/web/?q=' + query)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    let title = []
                    let url = []
                    let desc = []
                    $('h2.result-title > a').get().map((rest) => {
                         title.push($(rest).text())
                    })
                    $('h2.result-title > a').get().map((rest) => {
                         url.push(decodeURIComponent($(rest).attr('href').split('&as=')[1]))
                    })
                    $('span.result-description').get().map((rest) => {
                         desc.push($(rest).text())
                    })
                    let result = []
                    for (let i = 0; i < title.length; i++) {
                         result.push({
                              title: title[i],
                              url: url[i],
                              desc: desc[i]
                         })
                    }
                    resolve(result)
               })
               .catch(reject)
     })
}

/**
 * Fungsi untuk search tugas ya gaes
 * @param {string} query Search task query
*/
function brainly(query) {
     return new Promise((resolve, reject) => {
          crawl(`intext:"${query}" site:brainly.co.id`)
               .then((result) => {
                    Axios.get(result[0].url)
                         .then(({ data }) => {
                              let answer = []
                              const $ = cheerio.load(data)
                              $('div[data-test="answer-box-text"]').get().map((rest) => {
                                   answer.push($(rest).text().replace('\n', ''))
                              })
                              let media = []
                              let media_question = []
                              $('div[data-test="question-box-attachments"] > div > div > div > img.brn-qpage-next-attachments-viewer-image-preview__image').get().map((rest) => {
                                   if ($(rest).length) {
                                        media_question.push($(rest).attr('src'))
                                   }
                              })
                              $('div[data-test="answer-box-attachments"] > div > div > div > img.brn-qpage-next-attachments-viewer-image-preview__image').get().map((rest) => {
                                   if ($(rest).length) {
                                        media.push($(rest).attr('src'))
                                   }
                              })
                              const time = $('div.sg-text.sg-text--xsmall.sg-text--gray-secondary > time').attr('datetime')
                              const mapel = $('a[data-test="question-box-subject"]').text().replace(/\n/g, '')
                              const kelas = $('a[data-test="question-box-grade"]').text().replace(/\n/g, '')
                              const pertanyaan = $('h1[data-test="question-box-text"] > span').text().replace('\n', '')
                              let jawaban = []
                              for (let i = 0; i < answer.length; i++) {
                                   jawaban.push({
                                        teks: answer[i],
                                        media: media[i] || []
                                   })
                              }
                              let result = {
                                   status: true,
                                   pertanyaan: pertanyaan,
                                   foto_pertanyaan: media_question,
                                   waktu_dibuat: time,
                                   kelas: kelas,
                                   mapel: mapel,
                                   jawaban: jawaban
                              }
                              if (result.pertanyaan == '') return resolve({ status: false, message: 'Jawaban tidak ditemukan!' })
                              resolve(result)
                         }).catch(reject)
               })
               .catch(() => reject({ status: false, message: 'Jawaban tidak ditemukan!' }))
     })
}

function wiki(query, language_code = 'id') {
     return new Promise((resolve, reject) => {
          crawl(`intext:"${query}" site:wikipedia.org`)
               .then((result) => {
                    if (result.length === 0) return reject({ status: false, message: 'Data tidak ditemukan!' })
                    console.log(result)
                    Axios.get(result[0].url.includes('wiki') ? `http://${language_code}.wikipedia.org/wiki/` + result[0].url.split('/wiki/')[1] : 'http://google.com')
                         .then(({ data }) => {
                              const $ = cheerio.load(data)
                              const title = $('h1.firstHeading').text()
                              if (title == '') return reject(language_code == 'id' ? { status: false, message: 'Tidak ditemukan oleh wiki! coba gunakan kode bahasa lain.' } : { status: false, message: 'Data not found on wiki! try use another language code.' })
                              const scrap = $('p').text()
                              resolve({ status: true, title: title, description: scrap })
                         })
                         // .catch(reject)
                         .catch(() => reject(language_code == 'id' ? { status: false, message: 'Tidak ditemukan oleh wiki! coba gunakan kode bahasa lain.' } : { status: false, message: 'Data not found on wiki! try use another language code.' }))
               })
               // .catch(reject)
               .catch(() => reject(language_code == 'id' ? { status: false, message: 'Tidak ditemukan oleh wiki! coba gunakan kode bahasa lain.' } : { status: false, message: 'Data not found on wiki! try use another language code.' }))
     })
}

// brainly('apaASfASASFas')
// crawl(`jokowi wikipedia`)
// wiki('susi susanti', 'id')
     // .then(console.log)
     // .catch(console.log)

module.exports.brainly = brainly
module.exports.crawl = crawl
module.exports.wiki = wiki