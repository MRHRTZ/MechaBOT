const spawn = require('child_process').spawn;

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

/**
 *  ADDING CONTACTS TO YOUR PHONE FUNCTION BY MRHRTZ
 * @param {String} name Name of contact you want to add
 * @param {number} number Number of contact
 */
function addContact(name, number) {
    return new Promise(async() => {
        const namakontak = name
        const nomerkontak = number
        const cmd0 = `shell input keyevent 26`
        spawn('C:/adb/adb.exe', cmd0.split(' '));
        await sleep(1000)
        const command1 = `shell input keyevent KEYCODE_WAKEUP`
        spawn('C:/adb/adb.exe', command1.split(' '));
        await sleep(2000)
        const command2 = `shell input swipe 500 1000 300 300`
        spawn('C:/adb/adb.exe', command2.split(' '));
        await sleep(1000)
        const command3 = `shell input text 4415662`
        spawn('C:/adb/adb.exe', command3.split(' '));
        const command4 = `shell input keyevent 66`
        spawn('C:/adb/adb.exe', command4.split(' '));
        await sleep(1000)
        const commande = `shell am force-stop com.android.contacts`
        spawn('C:/adb/adb.exe', commande.split(' '));
        await sleep(1000)
        const command5 = `shell am start -a android.intent.action.INSERT -t vnd.android.cursor.dir/contact -e name '${namakontak}' -e phone ${nomerkontak}`
        spawn('C:/adb/adb.exe', command5.split(' '));
        await sleep(1000)
        const command6 = `shell input keyevent 5`
        spawn('C:/adb/adb.exe', command6.split(' '));
        await sleep(2000)
        const command7 = `shell am force-stop com.android.contacts`
        spawn('C:/adb/adb.exe', command7.split(' '));
    })
}

module.exports.addContact = addContact