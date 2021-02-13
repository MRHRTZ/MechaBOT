const { default: Axios } = require('axios')
const cheerio = require('cheerio')


function nhentai(code) {
     return new Promise((resolve, reject) => {
          Axios.get('https://us12.proxysite.com/process.php?d=Hl8h%2FsoIV6j5KDYsXHU5kg%3D%3D&b=1&f=norefer')
          .then(({ data }) => {
               console.log(data)
          })      
     })
}

// nhentai('67233')
// .then(console.log)
// .catch(console.log)

console.log(decodeURIComponent('https://us12.proxysite.com/process.php?d=Hl8h%2FsoIV6j5KDYsXHU5kg%3D%3D&b=1&f=norefer'))