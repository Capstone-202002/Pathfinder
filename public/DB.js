const os = require('os')
const path = require('path')
const { app } = require('electron')
const Database = require('better-sqlite3')
const dbPath = app.getPath('userData')


// DB 인스턴스 시작
const db = new Database(path.join(dbPath, 'data.db'), { verbose: console.log })

const create_tables = db.prepare(`CREATE TABLE IF NOT EXISTS "dl_history" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"FIlename"	TEXT,
	"URL"	TEXT,
	"Extension"	TEXT,
	"Place"	TEXT
);`)

console.log("DB 시작")
create_tables.run()


exports.db = db



