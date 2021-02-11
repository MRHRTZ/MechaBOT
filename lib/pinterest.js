const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

async function pinterest(query){
     return new Promise((resolve, reject) => {
          (async () => {
               let url = ['https://id.pinterest.com/search/pins/?q=' + query]
          const browser = await puppeteer.launch({
               headless: true,
               executablePath: 'C://Program Files//Google//Chrome//Application//chrome.exe',
               defaultViewport: null
             });
          const page = await browser.newPage();
          await page.goto(url[0]);          
          const bodyHandle = await page.$('body')  
          const html = await page.evaluate(body => body.innerHTML, bodyHandle);
          await bodyHandle.dispose();
          const $ = cheerio.load(html)
          const img = '#__PWS_ROOT__ > div > div > div > div > div > section > div > div > div > div > div > div > div > div > a > img'
          let images = []
          $(img).get().map((rest) => {
               images.push($(rest).attr('src'))
          })
          await browser.close();
          resolve(images)
          })()
     })
}

// pinterest('handsome boy')
// .then(console.log)
// .catch(console.log)

module.exports.pinterest = pinterest