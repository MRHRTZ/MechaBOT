var fs = require('fs');
var crypto = require('crypto');


function cryptor(key, input_file, output_file) {
     if ((fs.statSync(input_file)).isDirectory()) return
     var cipher = crypto.createCipher('aes-256-cbc', key);
     var input = fs.createReadStream(input_file);
     var output = fs.createWriteStream(output_file);
     input.pipe(cipher).pipe(output);
     output.on('finish', function () {
          console.log(input_file + ' Successfully decrypted!');
     });
}

function decryptor(key, input_file, output_file) {
     if ((fs.statSync(input_file)).isDirectory()) return
     var cipher = crypto.createDecipher('aes-256-cbc', key);
     var input = fs.createReadStream(input_file);
     var output = fs.createWriteStream(output_file);
     input.pipe(cipher).pipe(output);
     output.on('finish', function () {
          console.log(input_file + ' Encrypted!');
     });
}

const dir = './.crypt'
const value = fs.readdirSync(dir)
for (let isi of value) { 
     decryptor('Merha', './.crypt/' + isi, './.crypt/' + isi + '.enc')
     fs.unlinkSync('./.crypt/' + isi)
}
console.log(value)
// decryptor('merha', './.crypt/d', './.crypt/a')
console.log()