/**
 * uncache if there is file change
 * @param {string} module module name or path
 * @param {function} cb when module updated <optional> 
 */
function nocache(module, cb = () => { }) {
     console.log('Module', `'${module}'`, 'is now being watched for changes')
     require('fs').watchFile(require.resolve(module), async () => {
          await uncache(require.resolve(module))
          cb(module)
     })
}

/**
 * uncache a module
 * @param {string} module module name or path
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

module.exports.nocache = nocache
module.exports.uncache = uncache