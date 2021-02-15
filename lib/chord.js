const cheerio = require('cheerio')
const { default: Axios} = require('axios')

function chord(query) {
     return new Promise((resolve, reject) => {
          Axios.get(`http://app.chordindonesia.com/?json=get_search_results&exclude=date,modified,attachments,comment_count,comment_status,thumbnail,thumbnail_images,author,excerpt,content,categories,tags,comments,custom_fields&search=${query}`)
          .then(({ data }) => {
               // console.log(data)
               Axios.get(`http://app.chordindonesia.com/?json=get_post&id=${data.posts[0].id}`)
               .then(({ data }) => {
                    const result = data.post.content
                    const $ = cheerio.load(result)
                    resolve({ result: true, title: data.post.title, chord: $('pre').text() })
               })
               .catch(reject)
          })
          .catch(reject)
     })
}

// chord('numb').then(console.log)
module.exports.chord = chord