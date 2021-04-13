const { default: Axios } = require('axios');
const cheerio = require('cheerio');

function pixaVideo(query) {
     return new Promise((resolve, reject) => {
          Axios.get(`http://images.google.com/search?q=${query}`, { 
               headers: {
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
               }
          })
          .then(({ data }) => {
               resolve(data)
          })
          .catch(e => reject(e.response.data))
     })
}

pixaVideo('cats')
.then(console.log)
.catch(console.log)