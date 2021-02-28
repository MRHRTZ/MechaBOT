const mongoose = require('mongoose');
const { Schema } = mongoose

mongoose.connect('mongodb://localhost:27017/db_testing', {
     useNewUrlParser: true,
     useUnifiedTopology: true
})
     .then((c) => {
          console.log('Connected ')
          // a = JSON.stringify(c, null, 2)
          // console.log(c.connections[0])
     })
     .catch((e) => {
          console.log('Refused', e)
     })

const db = mongoose.model('mytable', new Schema({ id: Number, name: String, age: Number }));

console.log(db.findOne({ id: 12 }))