const { TidalAPI } = require('tidalapi-ts')

const api = new TidalAPI({
     username: 'roberterichgi@gmail.com',
     password: 'akungratis',
     quality: 'LOSSLESS'
})


function StreamGet(query) {
     return new Promise((resolve, reject) => {
          api.getStreamUrl(query)
          .then(resolve)
          .catch(reject)
     })
}

function TrackInfo(query) {
     return new Promise((resolve, reject) => {
          api.getTrackInfo(query)
          .then(resolve)
          .catch(reject)
     })
}

function Search(query) {
     return new Promise((resolve, reject) => {
          api.search({types: 'tracks', query: query})
          .then(search => {
               resolve(search.tracks);
          }) 
          .catch(reject)
     })
}

function getAutoMusic(query) {
     return new Promise((resolve, reject) => {
          Search(query)
          .then(res => {
               if (res.items.length < 1) return reject('Not found')
               StreamGet(res.items[0].id)
               .then(got => {
                    const result = {
                         metadata: res.items[0],
                         audiodata: got
                    }
                    resolve(result)
               })
               .catch(reject)
          })
          .catch(reject)
     })
}

// getAutoMusic('crawling')

// StreamGet('234806')
// TrackInfo('234806')
// Search('numb')
// .then(console.log)
// .catch(console.log)

module.exports.getAutoMusic = getAutoMusic
module.exports.TrackInfo = TrackInfo
module.exports.Search = Search
module.exports.StreamGet = StreamGet