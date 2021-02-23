const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

function download(url, path) {
     return new Promise((resolve, reject) => {
          const file = fs.createWriteStream(path);
          https.get(url, function (response) {
               response.pipe(file);
               resolve({ result: path })
          });
     })
}

module.exports.download = download