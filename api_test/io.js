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
            var size = recursive.getFileSizeofDirectory(file_path)
        }
        else {
            var size = stat.size
        }

        fileinfolist.push({
            name: element,
            is_dir: is_dir,
            size: size,
            extension: path.extname(element),
        })
    });
    return fileinfolist
}



// TEST

var a = getFileList("C:\\Users\\Jun\\Documents\\Heroes of the Storm")

console.log(a)