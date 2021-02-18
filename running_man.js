const cp = require('child_process');
const chalk = require('chalk')

// cp.exec('start ./src/mecha.exe /K node runner.js', (err, stdout, stderr) => {
//      console.log(stdout)
//      process.exit(1)
// })

const sou = cp.spawn('node', [
     'runner.js'
])

sou.stdout.on('data', function (chunk) {
     console.log(chunk.toString())// output will be here in chunks
});

sou.stderr.on('data', function (data) {
     console.log('stderr: ' + data.toString());
});

console.log(sou.pid)

sou.on('exit', function (code) {
     console.log(chalk.green('[ Proses berhasil diakhiri dengan kode : ' + code.toString() + ' ]'));
});

// const bod = 'Node cinta.js -aku -suka kamu.exe'
// const arg = bod.split(' ')
// const arr = "'" + arg.slice(2).join("','") + "'"
// console.log(arr)
