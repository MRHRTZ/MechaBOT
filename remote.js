const { exec, spawn } = require('child_process');

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
    return new Promise(async () => {
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


function saveContact(name, number) {
    return new Promise((resolve, reject) => {
        const namakontak = name || ''
        const nomerkontak = number || null
        try {
            const _exe = 'C:/adb/adb.exe'
            const cmd0 = `shell input keyevent 26`
            const cmd1 = `shell input keyevent KEYCODE_WAKEUP`
            const cmd2 = `shell input swipe 500 1000 300 300`
            const cmd3 = `shell input text 4415662`
            const cmd4 = `shell input keyevent 66`
            const cmd5 = `shell am force-stop com.android.contacts`
            const cmd6 = `shell am start -a android.intent.action.INSERT -t vnd.android.cursor.dir/contact -e name '${namakontak}' -e phone ${nomerkontak}`
            const cmd7 = `shell input keyevent 5`
            const cmd8 = `shell am force-stop com.android.contacts`
            exec(`${_exe} ${cmd0}`, () => {
                exec(`${_exe} ${cmd1}`, () => {
                    exec(`${_exe} ${cmd2}`, () => {
                        exec(`${_exe} ${cmd3}`, () => {
                            exec(`${_exe} ${cmd4}`, () => {
                                exec(`${_exe} ${cmd5}`, () => {
                                    exec(`${_exe} ${cmd6}`, () => {
                                        exec(`${_exe} ${cmd7}`, () => {
                                            exec(`${_exe} ${cmd8}`, () => {
                                                resolve(true)
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}



saveContact('BERHASIL', 222).then((a) => {
    if (a) {
        console.info('KONTAK TERSIMPAN!')
    }
}).catch(console.log)