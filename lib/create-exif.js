/*
    Credit: cwke#0001 (Original Creator)
*/
const {
    writeFile
} = require("fs");

const stickerPackID = "com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2"; //not sure what this does
const googleLink = "https://play.google.com/store/apps/details?id=com.marsconstd.stickermakerforwhatsapp";
const appleLink = "https://itunes.apple.com/app/sticker-maker-studio/id1443326857";

function createExif(packname, author) {
    const json = {
        "sticker-pack-id": stickerPackID,
        "sticker-pack-name": packname,
        "sticker-pack-publisher": author,
        "android-app-store-link": googleLink,
        "ios-app-store-link": appleLink
    };

    let length = JSON.stringify(json).length;
    const f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
    const code = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00];
    if (length > 256) {
        length = length - 256;
        code.unshift(0x01);
    } else {
        code.unshift(0x00);
    }
    const fff = Buffer.from(code);
    const ffff = Buffer.from(JSON.stringify(json));

    if (length < 16) {
        length = length.toString(16);
        length = "0" + length;
    } else {
        length = length.toString(16);
    }

    const ff = Buffer.from(length, "hex");
    const buffer = Buffer.concat([f, ff, fff, ffff]);
    writeFile('./media/sticker/data.exif', buffer, function (err) {
        if (err) return console.error(err);
    });
}

module.exports.createExif = createExif;