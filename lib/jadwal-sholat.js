const { default: Axios } = require('axios');
const cheerio = require('cheerio');

function getTempat() {
     return new Promise((resolve, reject) => {
          Axios.get('http://www.jadwalsholat.pkpu.or.id/?id=14')
          .then(({ data }) => {
               const $ = cheerio.load(data)
               let dataTempat = []
               $('td[align="center"] > select > option').get().map(rest => {
                    dataTempat.push($(rest).text())
               })
               resolve(dataTempat)
          })
          .catch(reject)
     })
}

function getDataJadwal(kota) {
     return new Promise(async(resolve, reject) => {
          const arrTempat = await getTempat()
          let reWrite = []
          for (let wrt of arrTempat) {
               reWrite.push(wrt.toLowerCase())
          }
          // console.log(reWrite)
          const index = reWrite.indexOf(kota.toLowerCase()) + 1
          // console.log(index)
          if (index == 0) return reject({ status: false, message: 'Kota tersebut tidak tersedia', list_kota: arrTempat })
          Axios.get('http://www.jadwalsholat.pkpu.or.id/?id=' + index)
          .then(({ data }) => {
               const $ = cheerio.load(data);
               let dataGenap = []
               let dataGanjil = []
               let tanggal = []
               let shubuh = []
               let imsyak = []
               let dzuhur = []
               let ashar = []
               let magrib = []
               let isya = []
               $('tr.table_light').get().map(rest => {
                    tanggal.push(Number($(rest).text().slice(0, 2)))
                    shubuh.push($(rest).text().slice(2, 7))
                    dzuhur.push($(rest).text().slice(7, 12))
                    ashar.push($(rest).text().slice(12, 17))
                    magrib.push($(rest).text().slice(17, 22))
                    isya.push($(rest).text().slice(22))
               }) 
               $('tr.table_dark').get().map(rests => {
                    tanggal.push(Number($(rests).text().slice(0, 2)))
                    shubuh.push($(rests).text().slice(2, 7))
                    dzuhur.push($(rests).text().slice(7, 12))
                    ashar.push($(rests).text().slice(12, 17))
                    magrib.push($(rests).text().slice(17, 22))
                    isya.push($(rests).text().slice(22))
               })
               $('tr.table_highlight').get().map(rests => {
                    tanggal.push(Number($(rests).text().slice(0, 2)))
                    shubuh.push($(rests).text().slice(2, 7))
                    dzuhur.push($(rests).text().slice(7, 12))
                    ashar.push($(rests).text().slice(12, 17))
                    magrib.push($(rests).text().slice(17, 22))
                    isya.push($(rests).text().slice(22))
               })
               let fetch = []
               for (let i = 0; i < tanggal.length; i++){
                    const index = tanggal.indexOf(i + 1)
                    fetch.push({
                         tanggal: tanggal[index],
                         shubuh: shubuh[index],
                         dzuhur: dzuhur[index],
                         ashar: ashar[index],
                         magrib: magrib[index],
                         isya: isya[index]
                    })
               }
               const result = {
                    status: true,
                    message: 'Created By MRHRTZ',
                    result: {
                         kota: $('tr.table_block_content > td[colspan="4"]').text().replace(/\(|\)/gi,''),
                         arah: $('tr:nth-child(3) > td:nth-child(2)').text().split(':')[0],
                         jarak: $('tr:nth-child(4) > td:nth-child(2)').text().replace('Shubuh','').split(':')[0],
                         penetapan_waktu: {
                              shubuh: $('tr:nth-child(2) > td:nth-child(2)').text().replace(':',''),
                              ashar: $('tr:nth-child(3) > td:nth-child(2)').text().split('Mekah')[1],
                              isya: $('tr:nth-child(4) > td:nth-child(2)').text().split('Mekah')[1],
                              imsyak: $('tr:nth-child(5) > td:nth-child(2)').text().split(':')[2],
                              jadwal_diberi: $('tr:nth-child(6) > td:nth-child(2)').text().split(':')[2]
                         },
                         bulan: $('tr.table_title > td[align="center"] > b').text(),
                         jadwal: fetch
                    }
               }
               resolve(result)
          })
          .catch((e) => reject(e))
     })
}

// getDataJadwal('bandung')
// .then(console.log)
// .catch(console.log)

module.exports.getTempat = getTempat
module.exports.getDataJadwal = getDataJadwal