const speedTest = require('speedtest-net');

(async () => {
     try {
          const a = await speedTest({
               acceptLicense: true,
          })
          console.log(a);
     } catch (err) {
          console.log(err.message);
     } finally {
          process.exit(0);
     }
})();