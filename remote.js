var remote = require('remote-file-size')
var url = 'http://registry.npmjs.org/argsplit/-/argsplit-1.0.2.tgz'
// let data = ''

    remote(url, (e, o) => {
        console.log(o)
    })

// console.log(data)