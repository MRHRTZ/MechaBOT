const crypto = require("crypto");

function generateStr() {
     const id1 = crypto.randomBytes(2).toString('hex').toUpperCase();
     const id2 = crypto.randomBytes(2).toString('hex').toUpperCase();
     const id3 = crypto.randomBytes(2).toString('hex').toUpperCase();
     const id4 = crypto.randomBytes(2).toString('hex').toUpperCase();
     return `${id1}-${id2}-${id3}-${id4}`
}

module.exports.generateStr = generateStr