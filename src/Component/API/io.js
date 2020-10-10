const fs = window.require('fs')
const path = window.require('path')
const recursive = require('./recursiveSearch')

export function getFileList(baseurl) {
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
            extension: path.extname(element),
        })
    });
    return fileinfolist
}



// TEST

// var a = getFileList("C:\\Users\\Jun\\Documents\\Heroes of the Storm")
// console.log(a)