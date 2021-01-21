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
     '/art-effects/broke-a-card-298.html'
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


const BaseUrlTextPro = 'https://textpro.me'
let pathTextPro = [
     '/advanced-glow-text-effect-873.html',
     '/create-a-futuristic-technology-neon-light-text-effect-1006.html',
     '/create-a-cloud-text-effect-on-the-sky-online-1004.html',
     '/create-blackpink-logo-style-online-1001.html',
     '/sand-engraved-3d-text-effect-989.html',
     '/sci-fi-text-effect-855.html',
     '/dropwater-text-effect-872.html',
     '/green-neon-text-effect-874.html',
     '/bokeh-text-effect-876.html',
     '/neon-text-effect-online-879.html',
     '/thunder-text-effect-online-881.html',
     '/horror-blood-text-effect-online-883.html',
     '/firework-sparkle-text-effect-930.html',
     '/blood-text-on-the-frosted-glass-941.html',
     '/neon-light-text-effect-with-galaxy-style-981.html',
     '/create-logo-style-marvel-studios-online-971.html',
     '/pornhub-style-logo-online-generator-free-977.html',
     '/create-glitch-text-effect-style-tik-tok-983.html'
]

function advancedglow(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[0]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[0],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}

function futuristic(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[1]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[1],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}

function cloud(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[2]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[2],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}


function blackpink(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[3]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[3],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}


function sand(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[4]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[4],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}


function scifi(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[5]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[5],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}

function dropwater(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[6]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[6],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}


function codmw(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[7]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[7],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}

function bokeh(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[8]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[8],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}

function neon(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[9]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[9],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}

function thunder(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[10]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[10],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}


function horrorblood(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[11]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[11],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}


function firework(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[12]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[12],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}

function bloodglass(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[13]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[13],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}


function neonlight(text) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[14]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[14],
                    formData: {
                         'text[]': text,
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}


function marvel(text_1, text_2) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[15]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[15],
                    formData: {
                         'text[]': [
                              text_1,
                              text_2
                         ],
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}


function phub(text_1, text_2) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[16]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[16],
                    formData: {
                         'text[]': [
                              text_1,
                              text_2
                         ],
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}


function glitch(text_1, text_2) {
     return new Promise((resolve, reject) => {
          const opt = {
               jar: true,
               method: 'GET',
               url: BaseUrlTextPro + pathTextPro[17]
          }
          request.get(opt, (err, response, body) => {
               if (err) {
                    reject(err)
                    console.log(err)
                    return
               }
               const $ = cheerio.load(body)
               const token = $('#token').attr('value')
               const opts = {
                    jar: true,
                    method: 'POST',
                    url: BaseUrlTextPro + pathTextPro[17],
                    formData: {
                         'text[]': [
                              text_1,
                              text_2
                         ],
                         'submit': 'Go',
                         'token': token
                    }
               }
               request.post(opts, (err, response, body) => {
                    if (err) {
                         reject(err)
                         console.log(err)
                         return
                    }
                    const $ = cheerio.load(body)
                    const save = BaseUrlTextPro + $('div.btn-group > a').attr('href')
                    const result = {
                         result: save
                    }
                    resolve(result)
               })
          }) 
     })
}


module.exports.advancedglow = advancedglow
module.exports.futuristic = futuristic
module.exports.cloud = cloud
module.exports.blackpink = blackpink
module.exports.sand = sand
module.exports.scifi = scifi
module.exports.dropwater = dropwater
module.exports.codmw = codmw
module.exports.bokeh = bokeh
module.exports.neon = neon
module.exports.thunder = thunder
module.exports.horrorblood = horrorblood
module.exports.firework = firework
module.exports.bloodglass = bloodglass
module.exports.neonlight = neonlight
module.exports.marvel = marvel
module.exports.phub = phub
module.exports.glitch = glitch
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