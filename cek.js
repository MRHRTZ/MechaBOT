const axios = require('axios')

const cheerio = require('cheerio')

async function cersx() {
     const data = await axios.get('http://162.213.249.120/')
     // Load the web page source code into a cheerio instance
     const $ = cheerio.load(data.data)
     var d = '', c;
     $('.post-title A').each((i, el) => {
          d += $(el).attr('href') + "\n";
     });
     c = d.split("\n");
     var url = c[Math.floor(Math.random() * c.length)];
     const hasil = await axios.get(url)
     const $$ = cheerio.load(hasil.data)
     return { result: $$('.post-content').text().replace(/“/g, '').replace(/  /g, ' ').replace(" ", '') }
}

cersx()
     .then(a => {
          console.log(a)
          bocchi.reply(from, a.result, id)
     })


