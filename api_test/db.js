const path = require('path')
var Datastore = require('nedb')
const { app } = require('electron')

// db initialize
var dbPath = path.join(app.getPath('userData'), 'data.db')
var db = new Datastore({ filename: dbPath, autoload: true });

// DB 테스트
db.insert({ name: 'test' }, (err, newrec) => {
    console.log(err)
    console.log(newrec)
})