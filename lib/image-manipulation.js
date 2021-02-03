const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const baseUrl = 'https://photooxy.com'
const path = [
     '/other-design/create-an-easy-smoke-type-effect-390.html',
     '/other-design/cross-gun-like-a-fps-player-130.html',
     '/game-effects/make-grand-theft-auto-v-official-cover-132.html',
     '/dota/make-avatar-dota-2-online-139.html',
     '/game-effects/cool-circle-guns-wallpapers-141.html',
     '/other-design/make-google-suggestion-photos-238.html',
     '/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html',
     '/fps-game-effect/create-battlefield-4-rising-effect-152.html',
     '/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html',
     '/logo-and-text-effects/text-on-scary-cemetery-gate-172.html',
     '/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html',
     '/burning-effect/holding-fire-animation-304.html',
     '/other-design/photo-of-lead-art-337.html',
     '/art-effects/half-underwater-photo-effect-163.html',
     '/art-effects/iphone-x-mockup-online-204.html',
     '/art-effects/broke-a-card-298.html',
     '/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html',
     '/photo-frames/photo-of-summer-beach-383.html',
     '/photo-frames/summer-photo-frame-2018-381.html',
     '/photo-frames/photo-frame-in-nature-379.html',
     '/logo-and-text-effects/make-tik-tok-text-effect-375.html',
     '/art-effects/gif-animated-rain-online-361.html',
     '/logo-and-text-effects/creating-an-underwater-ocean-363.html',
     '/logo-and-text-effects/make-smoky-neon-glow-effect-343.html',
     '/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html',
     '/logo-and-text-effects/carved-wood-effect-online-171.html',
     '/other-design/create-dark-metal-text-with-special-logo-160.html',
     '/art-effects/night-beach-photo-effect-353.html',
     '/art-effects/glitch-red-cyan-photo-effect-202.html',
     '/art-effects/create-3d-anaglyph-photo-effect-203.html',
     '/art-effects/print-photo-on-balloon-300.html',
     '/art-effects/typographic-portrait-online-346.html',
     '/art-effects/great-night-sky-effect-292.html',
     '/manga-and-anime/make-one-piece-wanted-poster-online-129.html',
     '/other-design/firework-video-effect-online-396.html',
     '/other-design/make-a-video-that-spells-your-name-237.html'
]


function gtaV(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[2],
                    form: {
                         'image_1': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function dota(text, optionNumber) {
     return new Promise((resolve, reject) => {
          try {
               if (Number(optionNumber) > 5) {
                    resolve({ result: 'Failed! option number must 1-5' })
                    return
               } else if (Number(optionNumber) === NaN) {
                    resolve({ result: "Failed! You can't input string on number option." })
                    return
               }
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[3],
                    form: {
                         'optionNumber_0': optionNumber,
                         'text_2': text,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }

     })
}

function gunBanner(text_1, text_2, path_file) {
     return new Promise((resolve, reject) => {
          try {
               if (!text_1) {
                    resolve({ result: 'Failed! text 1 is empy' })
                    return
               } else if (!text_2) {
                    resolve({ result: 'Failed! text 2 is empy' })
                    return
               }
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[4],
                    form: {
                         'image_0': buff,
                         'text_2': text_1,
                         'text_3': text_2,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function googleKeyword(text_1, text_2, text_3) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[5],
                    form: {
                         'text_1': text_1,
                         'text_2': text_2,
                         'text_3': text_3,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function pubg(text_1, text_2) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[6],
                    form: {
                         'text_1': text_1,
                         'text_2': text_2,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function battlefield(text_1, text_2) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[7],
                    form: {
                         'text_1': text_1,
                         'text_2': text_2,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function coffee(text_1) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[8],
                    form: {
                         'text_1': text_1,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function horrorHouse(text_1) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[9],
                    form: {
                         'text_1': text_1,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function harryPotter(text_1) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[10],
                    form: {
                         'text_1': text_1,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function semok(text_1) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[0],
                    form: {
                         'text_1': text_1,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function burningFire(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[11],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function drawing(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[12],
                    form: {
                         'image_1': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function underwater(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[13],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function iphone(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[14],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function brokeCard(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[15],
                    form: {
                         'image_1': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function shadow(text_1) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[16],
                    form: {
                         'text_1': text_1,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function beachFrame(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[17],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function summerFrame(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[18],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function natureFrame(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[19],
                    form: {
                         'image_1': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function glitch(text_1, text_2) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[20],
                    form: {
                         'text_1': text_1,
                         'text_2': text_2,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function rain(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[21],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function sea(text_1) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[22],
                    form: {
                         'text_1': text_1,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function neon(text_1) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[23],
                    form: {
                         'text_0': text_1,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function stars(text_1) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[24],
                    form: {
                         'text_1': text_1,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function wood(text_1) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[25],
                    form: {
                         'text_1': text_1,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function darklogo(text) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[26],
                    form: {
                         'optionNumber_0': (Math.floor(Math.random() * 30)).toString(),
                         'text_2': text,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function nightsea(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[27],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function photoglitch(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[28],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}



function anaglyph(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[29],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function balloon(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[30],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}

function typographic(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[31],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function photosky(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[32],
                    form: {
                         'image_1': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function wanted(path_file, name, price) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[33],
                    form: {
                         'image_1': buff,
                         'text_3': name,
                         'text_4': price,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function fireworkvideo(path_file) {
     return new Promise((resolve, reject) => {
          try {
               const img = fs.readFileSync(path_file)
               const buff = Buffer.from(img).toString('base64')
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[34],
                    form: {
                         'image_0': buff,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }
     })
}


function cooldesign(text) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[35],
                    form: {
                         'optionNumber_0': '0',
                         'text_1': text,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }

     })
}


function colorfuldesign(text) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[35],
                    form: {
                         'optionNumber_0': '3',
                         'text_1': text,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }

     })
}


function armydesign(text) {
     return new Promise((resolve, reject) => {
          try {
               const opt = {
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    jar: true,
                    method: 'POST',
                    url: baseUrl + path[35],
                    form: {
                         'optionNumber_0': '4',
                         'text_1': text,
                         'login': 'OK'
                    }
               }
               request.post(opt, (err, response, body) => {
                    const $ = cheerio.load(body)
                    const result = {
                         result: $('div.btn-group > a').attr('href')
                    }
                    resolve(result)
               })
          } catch (error) {
               reject(error)
          }

     })
}


module.exports.brokeCard = brokeCard
module.exports.iphone = iphone
module.exports.underwater = underwater
module.exports.drawing = drawing
module.exports.burningFire = burningFire
module.exports.semok = semok
module.exports.harryPotter = harryPotter
module.exports.horrorHouse = horrorHouse
module.exports.coffee = coffee
module.exports.battlefield = battlefield
module.exports.googleKeyword = googleKeyword
module.exports.gunBanner = gunBanner
module.exports.gtaV = gtaV
module.exports.dota = dota
module.exports.shadow = shadow
module.exports.beachFrame = beachFrame
module.exports.summerFrame = summerFrame
module.exports.natureFrame = natureFrame
module.exports.glitch = glitch
module.exports.rain = rain
module.exports.sea = sea
module.exports.neon = neon
module.exports.stars = stars
module.exports.wood = wood
module.exports.darklogo = darklogo
module.exports.nightsea = nightsea
module.exports.photoglitch = photoglitch
module.exports.anaglyph = anaglyph
module.exports.balloon = balloon
module.exports.typographic = typographic
module.exports.photosky = photosky
module.exports.wanted = wanted
module.exports.fireworkvideo = fireworkvideo
module.exports.cooldesign = cooldesign
module.exports.colorfuldesign = colorfuldesign
module.exports.armydesign = armydesign

glitch('test','test1').then(console.log).catch(console.log)