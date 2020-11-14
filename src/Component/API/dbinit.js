const path = require('path')
const { app } = require('electron')
const storage = require('electron-json-storage')

// db initialize
// var dbPath = path.join(app.getPath('userData'), 'data.db')

const dataPath = storage.getDataPath();
console.log(dataPath);


