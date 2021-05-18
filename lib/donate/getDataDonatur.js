const { default: Axios } = require('axios')

//https://api.saweria.co/transactions?page=1&page_size=100
function checkPay(id) {
     return new Promise((resolve, reject) => {
          Axios.get('https://api.saweria.co/donations/replay/' + id, {
               headers: {
                    'authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMwY2NhZTZlLTI5NDAtNDk1Yy05ZWI4LWYxNmU4MjMxZmMyMiIsImVtYWlsIjoiaGFuaWZzeWF1cWk2MUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Ik1SSFJUWiIsImRlc2NyaXB0aW9uIjoiSGFsbyBkdWt1bmcgc2F5YSB1bnR1ayBtZW5qYWRpIHByb2dyYW1tZXIgeWFuZyBsZWJpaCBiYWlrOilcblxuU2VkYW5nIG1lbmdlbWJhbmdrYW4gQm90IFdoYXRzQXBwXHVkODNkXHVkZTA5IiwiZG9uYXRpb25fdGVtcGxhdGUiOiJET05BU0kge30iLCJ0aWVyX2tleSI6IkJBU0lDIiwiaXNzIjoic2F3ZXJpYS1sb2dpbiIsImV4cCI6MTYyMTQ2NDc1Nn0.G8hvUGrvQ3iebzVnR3lRcj8EHs-d0nrC7izu5DXNLHM',
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
}

// checkPay('724b24e2-a4d6-4416-8ab6-136a8ef228c5')
//      .then(t => console.log('t', t))
//      .catch(e => console.log('e', e))

module.exports = { checkPay }