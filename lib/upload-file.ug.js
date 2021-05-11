const { default: Axios } = require('axios')
const FormData = require('form-data')
const fs = require('fs')

const upload_file = (path) => new Promise((resolve, reject) => {
     const fd = new FormData()
     fd.append('sampleFile', fs.createReadStream(path))
     Axios({
          method: 'POST',
          url: 'https://api-self.herokuapp.com/upload',
          data: fd,
          headers: {
               'user-agent': 'MRHRTZ-ZONE :D',
               'content-type': `multipart/form-data; boundary=${fd._boundary}`
          }
     }).then(({ data }) => resolve(data)).catch(reject)
})

upload_file('../src/Nisaa.ttf')
     .then(console.log)
     .catch(console.log)

