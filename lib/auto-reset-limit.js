require('../myHandler')
const fs = require('fs')
const moment = require('moment')
settings = JSON.parse(fs.readFileSync('./src/settings.json'))
const time = moment().format('DD/MM HH:mm:ss')
function INFOLOG(info) {
     console.log('\x1b[1;34m~\x1b[1;37m>>', '<\x1b[1;33mINF\x1b[1;37m>', time, color(info))
}
function pushing(obj) {
     fs.writeFileSync('./lib/database/limit.json', JSON.stringify(obj, null, 2))
}
async function resetAllLimit(amount) {
     amount = Number(amount)
     let obj = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
     for (let i in obj) {
          if (obj[i].limit < amount) {
               obj[i].Status = true
               obj[i].limit = amount
          }
     }
     pushing(obj)
     return { status: true, limit: Number(amount) }
}
// Set the date we're counting down to
var countDownDate = settings.Reset_Time 

// console.log(new Date("2 19, 2021 13:46:00").getTime())

// Update the count down every 1 second
var x = setInterval(function () {

     // Get today's date and time
     var now = new Date().getTime();

     // Find the distance between now and the count down date
     var distance = countDownDate - now;

     // Time calculations for days, hours, minutes and seconds
     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

     // Display the result in the element with id="demo"
     const countReset = days + "d " + hours + "h "
          + minutes + "m " + seconds + "s ";

     // If the count down is finished, write some text
     if (distance < 0) {
          clearInterval(x);
          INFOLOG('Waktunya Reset!');
          resetAllLimit(settings.Limit)
               .then(() => {
                    const newCountReset = moment(settings.Reset_Time).add('24', 'hours').valueOf()
                    settings.Reset_Time = newCountReset
                    settings.Reset_Status = true
                    fs.writeFileSync('./src/settings.json', JSON.stringify(settings, null, 2))
               })
     }
}, 1000);