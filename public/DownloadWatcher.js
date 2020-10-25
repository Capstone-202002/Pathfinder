const fs = require('fs')
const os = require('os')
const path = require('path')

// 다운로드 폴더를 우선 상수로 고정
var username = os.userInfo().username
DL_URL = "C:\\" + path.join("Users", username, "Downloads")

console.log("다운로드와쳐 실행됨!")

fs.watch(DL_URL, (eventType, filename) => {
    console.log(eventType)
    console.log(filename)
    if (eventType == "change") {
        fs.stat(path.join(DL_URL, filename), (err, stat) => {
            console.log(Date.now())
            console.log(stat.mtimeMs)
        })
    }

    // ipcMain 같은걸로 여기서 렌더러로 감지된 거 보내면 됨!
})