const { default: Axios } = require('axios')

Axios.get('https://komikcast.com/', {
     headers: {
          'authority': 'komikcast.com',
          'path': '/',
          'scheme': 'https',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'id,en;q=0.9',
          'cache-control': 'max-age=0',
          'cookie': 'cf_clearance=27378cbef31ba576af7f004b6148f1d87f563f0c-1620966317-0-150; HstCfa3653987=1620966325925; HstCmu3653987=1620966325925; HstCnv3653987=1; HstCns3653987=1; _ga=GA1.2.464584927.1620966326; _gid=GA1.2.1633616927.1620966326; __cf_bm=133677abb35c276f815834ef460503119c48eddc-1620966329-1800-AWBVTNoKmkCB6LYnPT6bcuGQh+xwmHJqi3wM2SLSDS0XIksJZwA3CsxzNUCPRgWE+cmhzeaRgH0TwJTYB/1H1cDHnl3UlQAOH/CSP5s4kTSUKIgjShaROg9HXij5lUNVsQ==; popundr1=1; HstCla3653987=1620966542017; HstPn3653987=3; HstPt3653987=3',
          'if-modified-since': 'Fri, 14 May 2021 04:27:11 GMT',
          'referer': 'http://komikcast.com/',
          'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
          'sec-ch-ua-mobile': '?0',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
     }
})
     .then(({ data }) => {
          console.log(data);
     }).catch(console.log)