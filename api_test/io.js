const fs = require('fs')
const path = require('path')
const recursive = require('./recursiveSearch')


function getFileList(baseurl) {
    var filelist = fs.readdirSync(baseurl)
    var fileinfolist = []

    filelist.forEach(element => {
        var file_path = path.join(baseurl, element)
        try {
            var stat = fs.statSync(file_path)
        } catch (err) {
            // 접근 거부 에러 발생
            stat = null
        }
        var is_dir = stat.isDirectory()
        if (is_dir) {
            var _directoryData = recursive.getFileDataofDirectory(file_path)
            var size = _directoryData.totalSize
            var numOfFiles = _directoryData.totalFileNum
        }
        else {
            var size = stat.size
            var numOfFiles = 0
        }

        fileinfolist.push({
            name: element,
            is_dir: is_dir,
            size: size,
            numOfFiles: numOfFiles,
            absPath: path.join(baseurl, element),
            extension: path.extname(element),
        })
    });
    return fileinfolist
}

function changeFileName(dir, oldname, newname, callback) {
    fs.rename(path.join(dir, oldname), path.join(dir, newname), (err) => {
        callback(err)
    })
}

function changeFileDirectory(olddir, newdir, callback) {
    fs.rename(path.join(dir, oldname), path.join(dir, newname), (err) => {
        callback(err)
    })
}

// TEST

changeFileName("C:\\Users\\Jun\\Desktop\\Temp", "Release", "Release2", (err) => {
    if (err) {
        console.log(err)
        console.log("파일 이름을 바꾸는 중 에러가 발생했습니다. io.js를 확인하세요.")
    }
    else {
        console.log("성공")
        console.log(err)
    }
})