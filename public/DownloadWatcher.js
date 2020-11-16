const chokidar = require('chokidar');
const fs = require('fs')
const os = require('os')
const path = require('path')
const { app } = require('electron')
const { db } = require('./DB')


// 다운로드 폴더를 우선 상수로 고정
var username = os.userInfo().username
DL_URL = "C:\\" + path.join("Users", username, "Downloads")



const initDlWatcher = function () {
    const dlwatcher = chokidar.watch(DL_URL, {
        ignoreInitial: true,
        ignored: '**/*.tmp',
        awaitWriteFinish: true
    })

    console.log("다운로드와쳐 실행됨!")

    dlwatcher.on("all", (event, path) => {
        console.log(event)
        console.log(path)

        let insert_history = db.prepare(`INSERT INTO dl_history (Filename, URL, Extension, Place) 
        VALUES ('${path}', 'TEST', '.test', '어딘가')`)
        insert_history.run()

        // let select_all = db.prepare(`SELECT * FROM dl_history`)
        // var result = select_all.all()
        // console.log(result)
    })
}


exports.dlwatcher = initDlWatcher