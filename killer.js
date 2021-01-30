// function pidIsRunning(pid) {
//      try {
//           process.kill(pid);
//           return true;
//      } catch (e) {
//           return false;
//      }
// }

// console.log(pidIsRunning(9428))

// process.kill(6872)

console.log(process.argv.slice(2).join('-'))