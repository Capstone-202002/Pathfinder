/* 
DB 관련 입/출력을 래핑함.
ipc를 통해 쿼리를 입력받아, 렌더러 프로세스로 결과를 전달함.
*/
const path = require('path')
const Database = require('better-sqlite3')

const dbPath = `C:\\Users\\Jun\\Desktop\\Temp\\캡스톤짤`

// DB 인스턴스 시작
const db = new Database(path.join(dbPath, 'data'), { verbose: console.log })

const create_history_tables = db.prepare(`CREATE TABLE IF NOT EXISTS "dl_history" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"Filename"	TEXT,
	"URL"	TEXT,
	"Extension"	TEXT,
	"Place"	TEXT
);`)

const create_vdirectory_tables = db.prepare(`CREATE TABLE IF NOT EXISTS "vdirectory" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"VDir"	TEXT,
	"FileName"	TEXT,
	"RealPath"	TEXT,
	"Extension"	TEXT,
	"Size" TEXT
);`)

const create_autodist_tables = db.prepare(`CREATE TABLE IF NOT EXISTS "auto_dist" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"Type"	TEXT,
	"Name"	TEXT,
	"Date"	DATE,
	"Source"	TEXT,
	"Target" TEXT,
	"Filter" TEXT
);`)

console.log("DB 시작")
create_history_tables.run()
create_vdirectory_tables.run()
create_autodist_tables.run()


function SelectDlHistoryAll(callback) {
    let select_all = db.prepare(`SELECT * FROM dl_history`)
    var result = select_all.all()
    callback(result)
}

function SelectDlHistory(url, callback) {
    let select_all = db.prepare(`SELECT * FROM dl_history WHERE URL='${url}'`)
    var result = select_all.all()
    callback(result)
}

function addVDirectory(kwargs) {
    // kwargs는 vDir, FileName, RealPath, Extension, Size를 갖고 있어야 함.
    let vDir = kwargs['VDir']
    let FileName = kwargs['FileName']
    let RealPath = kwargs['RealPath']
    let Extension = kwargs['Extension']
    let Size = kwargs['Size']

    let query = db.prepare(`INSERT INTO vdirectory (VDir, FileName, RealPath, Extension, Size) 
                            VALUES('${vDir}', '${FileName}', '${RealPath}', '${Extension}', '${Size}')`)
    let result = query.run()
    console.log(result)
}

function selectVdir(callback) {
    let select_all = db.prepare(`SELECT * FROM vdirectory`)
    var result = select_all.all()
    callback(result)
}

function deleteVdir(vdir, filename) {
    // 콜백 없어도 될 듯?
    let del = db.prepare(`DELETE FROM vdirectory WHERE VDir = '${vdir}' AND FileName = '${filename}'`)
    var result = del.run()
}

function selectAutodistAll(callback) {
    let selectall = db.prepare(`SELECT * FROM auto_dist`)
    var result = selectall.all()
    callback(result)
}

function createAutodist(type, name, source = '', target = '', filter = '') {
    let today = new Date()

    let query = db.prepare(`INSERT INTO auto_dist (Type, Name, Date, Source, Target, Filter) 
    VALUES('${type}', '${name}', '${today.toLocaleDateString('ko-KR')}', '${source}', '${target}', '${filter}')`)
    let result = query.run()
}

function deleteAutodist(id) {
    let del = db.prepare(`DELETE FROM auto_dist WHERE id = '${id}'`)
    var result = del.run()
}


// TEST_DATA = {
//     VDir: '가상 디렉토리',
//     FileName: '파일 이름',
//     RealPath: '실제 저장경로',
//     Extension: '확장자',
//     Size: '크기'
// }


// addVDirectory(TEST_DATA)

// selectVdir((result) => {
//     console.log(result)
// })

// 로컬 테스트용

exports.SelectDlHistory = SelectDlHistory