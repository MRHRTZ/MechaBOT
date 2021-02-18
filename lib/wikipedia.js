const { default: Axios } = require('axios')
const cheerio = require('cheerio')

function wiki(query, language_code = 'id') {
     return new Promise((resolve, reject) => {
          const parent = `https://${language_code}.wikipedia.org/w/index.php?search=${query}&ns0=1`
          Axios.get(parent)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    if (!data.match('mw-search-result-heading')){
                         const title = $('h1.firstHeading').text()
                         const scrap = $('p').text()
                         resolve({ status: true, title: title, description: scrap })
                    } else {
                         reject(language_code == 'id' ? { status: false, message: 'Tidak ditemukan oleh wiki! coba gunakan kode bahasa lain.' } : { status: false, message: 'Data not found on wiki! try use another language code.' })
                    }
               })
               // .catch(reject)
               .catch(() => reject(language_code == 'id' ? { status: false, message: 'Tidak ditemukan oleh wiki! coba gunakan kode bahasa lain.' } : { status: false, message: 'Data not found on wiki! try use another language code.' }))
     })  
}

// wiki(`jokowi dodo`, 'id')
//      .then(console.log)
//      .catch(console.log)