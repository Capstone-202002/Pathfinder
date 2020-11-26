const os = require('os')
const path = require('path')
const { app } = require('electron')
const Database = require('better-sqlite3')
const dbPath = app.getPath('userData')


// DB 인스턴스 시작
const db = new Database(path.join(dbPath, 'data'), { verbose: console.log })

const create_history_tables = db.prepare(`CREATE TABLE IF NOT EXISTS "dl_history" (
	"ID"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"FIlename"	TEXT,
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

console.log("DB 시작")
create_history_tables.run()
create_vdirectory_tables.run()


exports.db = db



