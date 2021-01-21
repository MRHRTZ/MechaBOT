const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')
const fs = require('fs')
const os = require('os')
const path = require('path')
const util = require('util')
const moment = require('moment-timezone')
const time = moment().format('DD/MM HH:mm:ss')
const color = require('./color')
const { Readable, Writable } = require('stream')
const yts = require('yt-search')

const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

function INFOLOG(info) {
    return console.log('\x1b[1;34m~\x1b[1;37m>>', '[\x1b[1;33mINF\x1b[1;37m]', time, color(info))
}

function ERRLOG(e) {
    return console.log('\x1b[1;31m~\x1b[1;37m>>', '[\x1b[1;31mERROR\x1b[1;37m]', time, color('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at))
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
                        let document = (new JSDOM(res.result)).window.document
                        let type = document.querySelectorAll('td')
                        let filesize = type[type.length - 10].innerHTML
                        let id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                        let thumb = document.querySelector('img').src
                        let title = document.querySelector('b').innerHTML

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

module.exports.baseURI = baseURI
module.exports.ytsr = ytsr
module.exports.yta = yta
module.exports.ytv = ytv
module.exports.buffer2Stream = buffer2Stream
module.exports.stream2Buffer = stream2Buffer
module.exports.noop = noop