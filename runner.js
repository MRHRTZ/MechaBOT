const fs = require('fs')
const moment = require('moment')
const color = require('./lib/color')
const time = moment().format('DD/MM HH:mm:ss')
function INFOLOG(info) {
     return console.log('\x1b[1;35m>>\x1b[1;37m>', '[\x1b[1;33mINF\x1b[1;37m]', time, color(info))
}


let sessions = ['tester']


for (let i = 0; i < sessions.length; i++) {
     require('./' + sessions[0])
     nocache('./' + sessions[0], module => {
          INFOLOG(`Module ${module} telah diupdate.`)
     })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
     console.log('Module', `'${module}'`, 'is now being watched for changes')
     require('fs').watchFile(require.resolve(module), async () => {
         await uncache(require.resolve(module))
         cb(module)
     })
 }
 
 /**
  * Uncache a module
  * @param {string} module Module name or path
  */
 function uncache(module = '.') {
     return new Promise((resolve, reject) => {
         try {
             delete require.cache[require.resolve(module)]
             resolve()
         } catch (e) {
             reject(e)
         }
     })
 }