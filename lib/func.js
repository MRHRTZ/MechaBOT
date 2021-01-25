const { default: Axios } = require('axios');
const fs = require('fs')

function getFilesize(filename) {
     const stats = fs.statSync(filename);
     let bytes = stats.size;
     if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
     else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
     else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
     else if (bytes > 1) { bytes = bytes + " bytes"; }
     else if (bytes == 1) { bytes = bytes + " byte"; }
     else { bytes = "0 bytes"; }
     return bytes;
}

async function lirik(text) {
     const { data } = await Axios.get('https://scrap.terhambar.com/lirik?word=' + text)
     return data
}

module.exports.lirik = lirik
module.exports.getFilesize = getFilesize