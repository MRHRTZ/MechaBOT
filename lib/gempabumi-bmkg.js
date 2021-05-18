const cheerio = require('cheerio')
const { default: Axios } = require('axios')
const { resolve } = require('path')

function getDataGempa() {
     return new Promise((resolve, reject) => {
          Axios.get('https://www.bmkg.go.id/gempabumi/gempabumi-terkini.bmkg')
               .then(({ data }) => {
                    let fetched = []
                    const $ = cheerio.load(data)
                    $('body > div.wrapper > div.container.content > div > div.col-md-8 > div > div > table > tbody > tr').get().map(rest => {
                         fetched.push({
                              no: $(rest).find('td:nth-child(1)').text(),
                              waktu: $(rest).find('td:nth-child(2)').text(),
                              lintang: $(rest).find('td:nth-child(3)').text(),
                              bujur: $(rest).find('td:nth-child(4)').text(),
                              magnitudo: $(rest).find('td:nth-child(5)').text(),
                              kedalaman: $(rest).find('td:nth-child(6)').text(),
                              wilayah: $(rest).find('td:nth-child(7)').text(),
                         })
                    })
                    resolve(fetched)
               })
               .catch((response) => {
                    reject({ status: false, message: response })
               })
     })
}

function getGempa() {
     return new Promise((resolve, reject) => {
          Axios.get('https://www.bmkg.go.id/')
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    // console.log(data);
                    resolve({
                         status: true,
                         gambar: $('div.gempabumi-home-bg.margin-top-13 > div > div:nth-child(1) > a').attr('href'),
                         waktu: $('span.waktu').text(),
                         magnitudo: $('div.gempabumi-detail > ul > li:nth-child(2)').text(),
                         kedalaman: $('div.gempabumi-detail > ul > li:nth-child(3)').text(),
                         koordinat: $('div.gempabumi-detail > ul > li:nth-child(4)').text(),
                         lokasi: $('div.gempabumi-detail > ul > li:nth-child(5)').text(),
                         tsunami: $('div.gempabumi-detail > ul > li:nth-child(6)').text()
                    })
               })
               .catch((response) => {
                    reject({ status: false, message: response })
               })
     })
}

module.exports = { getGempa }
// getGempa()
     //      // getDataGempa()
     // .then(console.log)
     // .catch(console.log)