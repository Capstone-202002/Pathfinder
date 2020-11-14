const chokidar = require('chokidar');
const fs = require('fs')
const os = require('os')
const path = require('path')

// 다운로드 폴더를 우선 상수로 고정
var username = os.userInfo().username
DL_URL = "C:\\" + path.join("Users", username, "Downloads")

console.log("다운로드와쳐 실행됨!")

const dlwatcher = chokidar.watch(DL_URL, {
    ignoreInitial: true,
    ignored: '*.tmp',
    awaitWriteFinish: true
})

dlwatcher.on("all", (event, path) => {
    console.log(event)
    console.log(path)

    // fs.stat(path, (err, stat) => {
    //     // console.log(Date.now())
    //     console.log(err)
    //     console.dir(stat)
    // })

})
