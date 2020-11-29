const chokidar = require('chokidar');
const fs = require('fs')
const os = require('os')
const path = require('path')
const { app, ipcMain } = require('electron')
const { db } = require('./DB')


// 다운로드 폴더를 우선 상수로 고정
var username = os.userInfo().username
DL_URL = "C:\\" + path.join("Users", username, "Downloads")
const ads_suffix = "Zone.Identifier"

function trimURLData(rawdata) {

    if (rawdata == 'about:blank') {
        return ''
    }

    var re = /(ReferrerUrl=).*/
    var arr = re.exec(rawdata)

    let domain = (new URL(arr[0].substring(12)))
    domain = domain.hostname;

    return domain
}


const initDlWatcher = function (mainWindow) {
    const dlwatcher = chokidar.watch(DL_URL, {
        ignoreInitial: true,
        ignored: '**/*.tmp',
        awaitWriteFinish: true
    })

    console.log("다운로드와쳐 실행됨!")

    dlwatcher.on("add", (filepath, stats) => {
        var result = fs.readFileSync(`${filepath}:${ads_suffix}`, { encoding: 'utf-8' })
        // URL 정리

        var url = trimURLData(result)
        var extenstion = path.extname(filepath)
        var filename = path.basename(filepath)

        let insert_history = db.prepare(`INSERT INTO dl_history (Path, Filename, URL, Extension, Place) 
        VALUES ('${filepath}','${filename}', '${url}', '${extenstion}', '어딘가')`)
        let id = insert_history.run()

        // 데이터 전송
        let payload = {
            id: id.lastInsertRowid,
            path: filepath,
            filename: filename,
            URL: url,
            extension: extenstion,
            place: '어딘가'
        }
        mainWindow.webContents.send('download-request', payload)
    })
}


exports.dlwatcher = initDlWatcher