const fs = require('fs')
const path = require('path')

function getFileSizeofDirectory(baseurl) {
    var filelist = fs.readdirSync(baseurl)
    var totalsize = 0
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
            totalsize += getFileSizeofDirectory(file_path)
        }

        else {
            totalsize += stat.size
        }

    });

    return totalsize
}

exports.getFileSizeofDirectory = getFileSizeofDirectory
// TEST

// var a = getFileSizeofDirectory("C:\\Users\\Jun\\Documents\\Heroes of the Storm")
