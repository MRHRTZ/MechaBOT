// const axios = require('axios')

// const cheerio = require('cheerio')

// async function cersx() {
//      const data = await axios.get('http://162.213.249.120/')
//      // Load the web page source code into a cheerio instance
//      const $ = cheerio.load(data.data)
//      var d = '', c;
//      $('.post-title A').each((i, el) => {
//           d += $(el).attr('href') + "\n";
//      });
//      c = d.split("\n");
//      var url = c[Math.floor(Math.random() * c.length)];
//      const hasil = await axios.get(url)
//      const $$ = cheerio.load(hasil.data)
//      return { result: $$('.post-content').text().replace(/“/g, '').replace(/  /g, ' ').replace(" ", '') }
// }

// cersx()
//      .then(a => {
//           console.log(a)
//           bocchi.reply(from, a.result, id)
//      })
const { getFilesizeFromBytes } = require('./lib/func')
const remote = require('remote-file-size')
url = 'https://scontent-frx5-1.xx.fbcdn.net/v/t66.36240-6/10000000_428338541814779_2692945235567700701_n.mp4?_nc_cat=110&ccb=3&_nc_sid=985c63&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=CrszD7Hn0EYAX-t12wZ&_nc_ht=scontent-frx5-1.xx&oh=d48e9b91bf3e67e58d91fe124b1c03bb&oe=604EA4F2'
remote(url, (e, o) => {
     console.log(getFilesizeFromBytes(o))
})
