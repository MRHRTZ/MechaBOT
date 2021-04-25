const { default: Axios } = require('axios')
const cheerio = require('cheerio')
const baseUrl = 'https://www.gsmarena.com/'


function searchPhone(query) {
     return new Promise((resolve, reject) => {
          Axios.get(baseUrl + 'res.php3?sSearch=' + query)
               .then(({ data }) => {
                    const $ = cheerio.load(data)
                    const result = []
                    $('div.makers > ul > li').get().map(rest => {
                         result.push({
                              title: $(rest).find('a > img').attr('title'),
                              url: baseUrl + $(rest).find('a').attr('href'),
                              img: $(rest).find('a > img').attr('src')
                         })
                    })
                    resolve({ status: true, result: result })
               })
          .catch(e => reject({ status: false, message: e.message }))
     })
} 

function specs(url) {
     return new Promise((resolve, reject) => {
          if (!url.includes('gsmarena.com')) return reject({ status: false, message: 'url invalid!' })
          Axios.get(url, {
               headers: {
                    'user-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36'
               }
          })
          .then(({ data }) => {
               const $ = cheerio.load(data)
               let iterator = []
               $("tr > td.nfo").get().map(rest => {
                    if ($(rest).text().toLowerCase() == 'yes' || $(rest).text().toLowerCase() == 'no') {
                         iterator.push($(rest).text())
                    }
               })
               const lengthType = $('td.nfo[data-spec="cam1modules"]').text().split('\r\n').length
               const lengthType2 = $('td.nfo[data-spec="cam2modules"]').text().split('\r\n').length
               const result = {
                    phone: $('h1[data-spec="modelname"]').text,
                    network: {
                         technology: $('a.link-network-detail').text()
                    },
                    launch: {
                         announced: $('td.nfo[data-spec="year"]').text(),
                         status: $('td.nfo[data-spec="status"]').text()
                    },
                    body: {
                         dimensions: $('td.nfo[data-spec="dimensions"]').text(),
                         weight: $('td.nfo[data-spec="weight"]').text(),
                         build: $('td.nfo[data-spec="build"]').text(),
                         sim: $('td.nfo[data-spec="sim"]').text()
                    },
                    display: {
                         type: $('td.nfo[data-spec="displaytype"]').text(),
                         size: $('td.nfo[data-spec="displaysize"]').text(),
                         resolution: $('td.nfo[data-spec="displayresolution"]').text(),
                         protection: $('td.nfo[data-spec="displayprotection"]').text()
                    },
                    platform: {
                         os: $('td.nfo[data-spec="os"]').text(),
                         chipset: $('td.nfo[data-spec="chipset"]').text(),
                         cpu: $('td.nfo[data-spec="cpu"]').text(),
                         gpu: $('td.nfo[data-spec="gpu"]').text()
                    },
                    memory: {
                         card_slot: $('td.nfo[data-spec="memoryslot"]').text(),
                         internal: $('td.nfo[data-spec="internalmemory"]').text().split(', '),
                         other: $('td.nfo[data-spec="memoryother"]').text()
                    },
                    main_camera: {
                         type: lengthType == 1 ? 'Single' : lengthType == 2 ? 'Dual' : lengthType == 3 ? 'Triple' : lengthType == 4 ? 'Quad' : lengthType == 5 ? 'Penta' : 'Penta',
                         camera: $('td.nfo[data-spec="cam1modules"]').text().split('\r\n')
                    },
                    selfie_camera: {
                         type: lengthType2 == 1 ? 'Single' : lengthType2 == 2 ? 'Dual' : lengthType2 == 3 ? 'Triple' : lengthType2 == 4 ? 'Quad' : lengthType2 == 5 ? 'Penta' : 'Penta',
                         camera: $('td.nfo[data-spec="cam2modules"]').text().split('\r\n')
                    },
                    sound: {
                         loudspeaker: iterator[0],
                         '3.5mm_jack': iterator[1]
                    },
                    comm: {
                         wlan: $('td.nfo[data-spec="wlan"]').text(),
                         bluetooth: $('td.nfo[data-spec="bluetooth"]').text(),
                         gps: $('td.nfo[data-spec="gps"]').text(),
                         nfc: iterator[2],
                         infrared_port: iterator[3],
                         radio: $('td.nfo[data-spec="radio"]').text(),
                         usb: $('td.nfo[data-spec="usb"]').text()
                    },
                    features: {
                         sensor: $('td.nfo[data-spec="sensors"]').text().split(', ')
                    },
                    battery: {
                         type: $('td.nfo[data-spec="batdescription1"]').text()
                    },
                    misc: {
                         colors: $('td.nfo[data-spec="colors"]').text(),
                         models: $('td.nfo[data-spec="models"]').text(),
                         price: $('td.nfo[data-spec="price"]').text()
                    }
               }
               $('table:nth-child(8) > tbody > tr > td.nfo').get().map(rest => result.main_camera.push($(rest).attr('text')))
               resolve({ status: true, result: result })
          })
          .catch(e => reject({ status: false, message: e.message }))
     })
}

specs('https://www.gsmarena.com/asus_rog_phone_5-10715.php')
// searchPhone('Asus Toof')
.then(a => console.log(JSON.stringify(a, null, 4)))
.catch(console.log)