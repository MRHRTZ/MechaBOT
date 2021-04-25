const fetch = require('node-fetch')
const { default: Axios } = require('axios')
const FormData = require('form-data')
const { JSDOM } = require('jsdom')
const cheerio = require('cheerio')
const moment = require('moment-timezone')
const time = moment().format('DD/MM HH:mm:ss')
const color = require('./color')
const { Readable, Writable } = require('stream')
const yts = require('yt-search')

const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

function INFOLOG(info) {
    return console.log('\x1b[1;34m~\x1b[1;37m>>', '<\x1b[1;33mINF\x1b[1;37m>', time, color(info))
}

function ERRLOG(e) {
    return console.log('\x1b[1;31m~\x1b[1;37m>>', '<\x1b[1;31mERROR\x1b[1;37m>', time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
}

function post(url, formdata) {
    INFOLOG(Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&'))
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: "*/*",
            'accept-language': "en-US,en;q=0.9",
            'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&')
    })
}

function ytv(url) {
    return new Promise((resolve, reject) => {
        try {
            if (ytIdRegex.test(url)) {
                let ytId = ytIdRegex.exec(url)
                url = 'https://youtu.be/' + ytId[1]
                post('https://www.y2mate.com/mates/en60/analyze/ajax', {
                    url,
                    q_auto: 0,
                    ajax: 1
                })
                    .then(res => res.json())
                    .then(res => {
                        INFOLOG('Scraping...')
                        document = (new JSDOM(res.result)).window.document
                        yaha = document.querySelectorAll('td')
                        filesize = yaha[yaha.length - 23].innerHTML
                        id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                        thumb = document.querySelector('img').src
                        title = document.querySelector('b').innerHTML

                        post('https://www.y2mate.com/mates/en60/convert', {
                            type: 'youtube',
                            _id: id[1],
                            v_id: ytId[1],
                            ajax: '1',
                            token: '',
                            ftype: 'mp4',
                            fquality: 360
                        })
                            .then(res => res.json())
                            .then(res => {
                                let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
                                resolve({
                                    dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
                                    thumb,
                                    title,
                                    filesizeF: filesize,
                                    filesize: KB
                                })
                            }).catch(reject)
                    }).catch(reject)
            } else { reject('URL INVALID') }
        } catch (e) {
            ERRLOG(e)
        }
    })

}


function yta(url) {
    return new Promise((resolve, reject) => {
        try {
            if (ytIdRegex.test(url)) {
                let ytId = ytIdRegex.exec(url)
                url = 'https://youtu.be/' + ytId[1]
                post('https://www.y2mate.com/mates/en60/analyze/ajax', {
                    url,
                    q_auto: 0,
                    ajax: 1
                })
                    .then(res => res.json())
                    .then(res => {
                        const $ = cheerio.load(res.result)
                        let document = (new JSDOM(res.result)).window.document
                        let type = document.querySelectorAll('td')
                        let filesize = type[type.length - 10].innerHTML
                        let id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                        let thumb = document.querySelector('img').src
                        let title = document.querySelector('b').innerHTML
                        let quality = []
                        $('a[type="button"]').get().map(rest => {
                            quality.push({
                                ftype: $(rest).attr('data-ftype'),
                                fquality: $(rest).attr('data-fquality')
                            })
                        })
                        // return console.log(quality)
                        post('https://www.y2mate.com/mates/en60/convert', {
                            type: 'youtube',
                            _id: id[1],
                            v_id: ytId[1],
                            ajax: '1',
                            token: '',
                            ftype: 'mp3',
                            fquality: 128
                        })
                            .then(res => res.json())
                            .then(res => {
                                let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
                                resolve({
                                    dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
                                    thumb,
                                    title,
                                    filesizeF: filesize,
                                    filesize: KB
                                })
                            }).catch(reject)
                    }).catch(reject)
            } else { reject('URL INVALID') }
        } catch (e) {
            ERRLOG(e)
        }
    })
}

function ytsr(query) {
    return new Promise((resolve, reject) => {
        yts(query).then((result) => {
            let data = result.all
            let pertype = []
            for (let i = 0; i < data.length; i++) {
                if (data[i].type == "video") {
                    pertype.push({
                        id: data[i].videoId,
                        type: data[i].type,
                        author: data[i].author.name,
                        title: data[i].title,
                        ago: data[i].ago,
                        views: data[i].views,
                        desc: data[i].description,
                        duration: data[i].duration.seconds,
                        timestamp: data[i].timestamp,
                        thumb: data[i].thumbnail,
                        url: data[i].url
                    })
                }
            }
            resolve(pertype)
        })
            .catch(reject)
    })
}

function baseURI(buffer = Buffer.from([]), metatype = 'text/plain') {
    return `data:${metatype};base64,${buffer.toString('base64')}`
}

/**
 * Writable Stream Callback
 * @callback WritableStreamCallback
 * @param {WritableStream} stream 
 */

/**
 * Convert Writable Stream to Buffer
 * @param {WritableStreamCallback} cb Callback with stream
 * @returns {Promise<Buffer>}
 */
function stream2Buffer(cb = noop) {
    return new Promise(resolve => {
        let write = new Writable()
        write.data = []
        write.write = function (chunk) {
            this.data.push(chunk)
        }
        write.on('finish', function () {
            resolve(Buffer.concat(this.data))
        })

        cb(write)
    })
}

/**
 * Convert Buffer to Readable Stream
 * @param {Buffer} buffer
 * @returns {ReadableStream}
 */
function buffer2Stream(buffer) {
    return new Readable({
        read() {
            this.push(buffer)
            this.push(null)
        }
    })
}

/**
 * No Operation
 *  */
function noop() { }


function ytdl(url, typeS, qualityS) {
    return new Promise((resolve, reject) => {
        if (!typeS) return reject({ status: false, message: 'pleas input mp4/mp3 type!' })
        if (!qualityS) return reject({ status: false, message: 'please input quality!' })
        const fd = new FormData()
        fd.append('url', url)
        fd.append('q_auto', '0')
        fd.append('ajax', '1')
        Axios({
            method: 'POST',
            url: 'https://www.y2mate.com/mates/en60/analyze/ajax',
            data: fd,
            headers: {
                'content-Type': `multipart/form-data; boundary=${fd._boundary}`,
                'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36'
            }
        }).then(({ data }) => {
            const $ = cheerio.load(data.result)
            const thumb = $('div.thumbnail.cover > a > img').attr('src')//$('a > img').attr('src')
            const scr = $('script').get()[1].children[0].data
            eval(scr)
            const title = k_data_vtitle
            const fd = new FormData()
            fd.append('type', video_service)
            fd.append('_id', k__id)
            fd.append('v_id', k_data_vid)
            fd.append('ajax', '1')
            fd.append('token', '')
            fd.append('ftype', typeS)
            fd.append('fquality', qualityS)
            let filesize = []
            $('tbody > tr > td:nth-child(2)').get().map(rest => {
                filesize.push($(rest).text())
            })
            let quality = []
            $('a[type="button"]').get().map(rest => {
                quality.push({
                    type: $(rest).attr('data-ftype'),
                    quality: $(rest).attr('data-fquality')
                })
            })
            let infoQ = []
            for (let i = 0; i < quality.length; i++) {
                infoQ.push({
                    type: quality[i].type,
                    quality: quality[i].quality,
                    filesize: filesize[i]
                })
            }
            infoQ.splice(infoQ.findIndex(i => i.type == 'm4a' ), 1)
            infoQ.splice(infoQ.findIndex(i => i.type == '3gp' ), 1)
            Axios({
                method: 'POST',
                url: 'https://www.y2mate.com/mates/en68/convert',
                data: fd,
                headers: {
                    'content-Type': `multipart/form-data; boundary=${fd._boundary}`,
                    'origin': 'https://www.y2mate.com',
                    'referer': 'https://www.y2mate.com/id/youtube/qKI0Ur63Rko',
                    'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
                    'x-requested-with': 'XMLHttpRequest'
                }
            }).then(({ data }) => {
                const $ = cheerio.load(data.result)
                const url = $('a[type="button"]').attr('href')
                const fsize = infoQ.find(q => q.quality == qualityS && q.type == typeS)
                if (fsize === undefined) return reject({ status: false, message: `Can't find ${qualityS} res with ${typeS}`, listQuality: infoQ })
                // resolve(thumb)
                resolve({
                    title: title,
                    service: video_service,
                    thumb: thumb,
                    download: url,
                    type: fsize.type,
                    quality: fsize.quality,
                    filesize: fsize.filesize,
                    floatsize: fsize.filesize.includes('MB') ? parseFloat(fsize.filesize) * (1000 * /MB$/.test(fsize.filesize)) : Math.floor(fsize.filesize.split(' ')[0]),
                    listQuality: infoQ
                })
            })
        })
    })
}


module.exports.ytdl = ytdl
module.exports.baseURI = baseURI
module.exports.ytsr = ytsr
module.exports.yta = yta
module.exports.ytv = ytv
module.exports.buffer2Stream = buffer2Stream
module.exports.stream2Buffer = stream2Buffer
module.exports.noop = noop

// ytdl('https://youtube.com/shorts/wQDdBDBpZvw?feature=share', 'mp4', '360').then(console.log).catch(console.log)