const { default: Axios } = require('axios')
let settings = JSON.parse(require('fs').readFileSync('./src/settings.json'))

if (settings.saweria['user-id'] == '') {
     getAuth()
          .then((data) => {
               console.log(require('chalk').greenBright('[ MECHABOT ]  ') + require('moment')(new Date()).format('DD/MM HH:mm:ss'), require('chalk').greenBright(`Berhasil login akun saweria dengan username ${require('chalk').blueBright(data.result.data.username)}`))
          })
          .catch(() => { })
}

function getAuth() {
     return new Promise((resolve, reject) => {
          Axios({
               method: 'POST',
               url: 'https://api.saweria.co/auth/login',
               headers: {
                    'content-type': 'application/json'
               },
               data: {
                    email: settings.saweria.email,
                    password: settings.saweria.password
               }
          })
               .then((data) => {
                    settings.saweria['user-id'] = data.data.data.id
                    require('fs').writeFileSync('./src/settings.json', JSON.stringify(settings, null, 5))
                    resolve({ status: true, auth: data.headers.authorization, result: data.data })
               })
               .catch(e => reject({ status: false, message: e.message }))
     })
}

function checkPay(id) {
     return new Promise((resolve, reject) => {
          getAuth()
               .then(myauth => {
                    // console.log(myauth);
                    Axios.get('https://api.saweria.co/donations/replay/' + id, {
                         headers: {
                              'authorization': myauth.auth,
                              'origin': 'https://saweria.co',
                              'referer': 'https://saweria.co/'
                         }
                    }).then(({ data }) => {
                         resolve(data)
                    })
                         .catch(({ response }) => {
                              reject(response.data)
                         })
               })
               .catch(console.log)
     })
}


function requestPay(name, phone, amount, email, message = 'pay auto', payment = 'ovo' | 'gopay' | 'dana' | 'linkaja' | 'qris') {
     return new Promise((resolve, reject) => {
          if (typeof amount === 'string') return reject({ status: false, message: 'Amount is not a number!' })
          let pembayaran = payment == 'ovo' ? amount + amount * 7 / 100 : amount + amount * 6 / 100
          let dataPost = {
               agree: true,
               message: message,
               amount: pembayaran,
               payment_type: payment,
               vote: "",
               customer_info: {
                    first_name: name,
                    email: email,
                    phone: phone
               }
          }
          Axios({
               method: 'POST',
               url: 'https://api.saweria.co/donations/' + settings.saweria['user-id'],
               headers: {
                    'Content-Type': 'application/json'
               },
               data: dataPost
          }).then(({ data }) => {
               resolve(data)
          }).catch(({ response }) => {
               reject(response.data)
          })
     })
}

// getAuth()
// checkPay('be4c4e36-5f9b-4a3c-8e6a-98e9a754902a')
// requestPay('asdasd', '085559038021', 10000, 'hanifsyauqi61@gmail.com', 'Yea', 'dana')
// .then(console.log)
// .catch(console.log)

module.exports = { checkPay, requestPay }
