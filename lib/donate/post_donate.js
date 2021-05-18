const { default: Axios } = require('axios')

function requestPay(name, phone, amount, email, message = 'pay auto', payment = 'ovo' | 'gopay' | 'dana' | 'linkaja' | 'qris') {
     return new Promise((resolve, reject) => {
          if (typeof amount === 'string') return reject({ status: false, message: 'Amount is not a number!' })
          let pembayaran = payment == 'ovo' ? amount + amount * 6 / 100 : amount + amount * 5 / 100
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
               url: 'https://api.saweria.co/donations/30ccae6e-2940-495c-9eb8-f16e8231fc22',
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


// requestPay('MRHRTZ', '085559038021', 15000, 'hanifsyauqi61@gmail.com', 'Hi', 'dana')
//      .then(a => console.log('t', a))
//      .catch(e => console.log('e', e))

module.exports = { requestPay }