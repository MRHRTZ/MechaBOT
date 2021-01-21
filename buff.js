const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')
const { default: Axios } = require('axios')



const url = 'http://dl144.y2mate.com/?file=M3R4SUNiN3JsOHJ6WWQ2a3NQS1Y5ZGlxVlZIOCtyZ1B2ZjRiOURrTFNveHBpcXdmL05IcmJvSjZBSUE2aHMvd1NmMTd3eHZxT3ZLeWV6MnNrYkVTWXppazFQNGMvRzJXdllNd0NvOTNYeHI5cFBhaWdqa3J6RlhUWjlmWUFhMVVhRElwaFUxemdHUEI2cWVSNnpQaDRYQ3NzMGpOYnlzSCtYWkFOdkRiOEl4QjNWYk1hdnZsdzVzUWtqT1I1WTkyMmYrTHNSUEp3YXNCcXRseVYxQjFUSlZlMFp2Szhlbk5vWEE4cnBFbTNYenFwUEwxUUpzdERLeU1mQ041TXlkVXVMbS9CRWxPbTNOR3JDcXQvN1Vnc3pOZUlmZ2x1ekx5NnVTMGRTbkw%3D'

Axios
  .get(url, {
    responseType: 'arraybuffer'
  })
  .then(response => {
    const buffer = Buffer.from(response.data, 'base64');
    console.log(buffer)
  })
  .catch(ex => {
    console.error(ex);
  });