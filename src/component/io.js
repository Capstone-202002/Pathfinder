const fs = window.require('fs')
const path = window.require('path')


export function getFileList(baseurl) {
    var filelist = fs.readdirSync(baseurl)
    var fileinfolist = []
    filelist.forEach(element => {
        var file_path = path.join(baseurl, element)
        var is_dir = fs.Stats(file_path).isDirectory()
        fileinfolist.push({
            name: element,
            is_dir: is_dir
        })
    });
    return fileinfolist
}
