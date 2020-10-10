const fs = window.require('fs')
const path = window.require('path')
function getFileDataofDirectory(baseurl) {
    var filelist = fs.readdirSync(baseurl)
    var totalSize = 0
    var totalFileNum = 0
    filelist.forEach(element => {
        var file_path = path.join(baseurl, element)
        try {
            var stat = fs.statSync(file_path)
        } catch (err) {
            // 접근 거부 에러 발생
            // 파일 사이즈 계산 안하고(=0으로 간주) 바로 진행.
            return
        }

        if (stat.isDirectory()) {
            var _fileData = getFileDataofDirectory(file_path)
            totalSize += _fileData.totalSize
            totalFileNum += _fileData.totalFileNum
        }

        else {
            totalSize += stat.size
            totalFileNum += 1
        }

    });

    return {
        totalSize: totalSize,
        totalFileNum: totalFileNum
    }
}

exports.getFileDataofDirectory = getFileDataofDirectory
// TEST

// var a = getFileSizeofDirectory("C:\\Users\\Jun\\Documents\\Heroes of the Storm")
