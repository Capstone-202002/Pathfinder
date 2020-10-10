const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { Hidden } = require('@material-ui/core')
const sqlite = require('sqlite3').verbose()
let db = new sqlite.Database(':memory:', (err) => {
    if (err) {
        return console.error("연결 불가")
    }
    console.log("데이터베이스 연결성공")
})


let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width : 1366,
        height : 768,
        minHeight : 600,
        minWidth : 940,
        transparent : true,
        frame:false,
        titleBarStyle : 'hidden',

        webPreferences: {
            nodeIntegration: true
        }
    });
    if (isDev) {
        // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
        mainWindow.loadURL('http://localhost:3000');
        //mainWindow.webContents.openDevTools();
    } else {
        // 프로덕션 환경에서는 패키지 내부 리소스에 접근
        mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
    }


    if (isDev) {
        // Open the DevTools.
        // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>')
        // mainWindow.webContents.openDevTools()
    }
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

ipcMain.on('test', (event, arg) => {
    console.log("전송이 되었음!")
    console.log(arg)
})