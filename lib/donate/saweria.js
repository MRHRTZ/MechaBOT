const SaweriaClient = require("saweria");

const client = new SaweriaClient();

client.setStreamKey('1462528f970c70ef0018b32877068763')

client.on("login", (user) => {
     console.log("Logged in as: ", user.username);
});

client.on("donations", (donations) => {
     console.log(donations);
});

client.on('error', (e) => console.log(e))
// client.login("hanifsyauqi61@gmail.com", "Redrexfarcry4456!");
// or with otp
// client.login("hanifsyauqi61@gmail.com", "Redrexfarcry4456!", "439736");


// client.getStreamKey().then(console.log)