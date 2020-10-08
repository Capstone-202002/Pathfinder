const fs = require('fs')
const path = require('path')


function getFileList(baseurl) {
    var filelist = fs.readdirSync(baseurl)
    var fileinfolist = []
    filelist.forEach(element => {
        var file_path = path.join(baseurl, element)
        try {
            var is_dir = fs.statSync(file_path).isDirectory()
        } catch (err) {
            // 접근 거부 에러 발생
            var is_dir = "접근 거부됨"
        }

        fileinfolist.push({
            name: element,
            is_dir: is_dir
        })
    });
    return fileinfolist
}



// TEST

var a = getFileList("C:\\Program Files")

console.log(a)