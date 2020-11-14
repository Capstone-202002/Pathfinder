const {
    app,
    BrowserWindow,
    Tray,
    Menu
} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { Hidden } = require('@material-ui/core')

let mainWindow
let tray

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        minHeight: 600,
        minWidth: 940,
        transparent: true,
        frame: false,
        titleBarStyle: 'hidden',

        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
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

    // System Tray에 아이콘 생성
    tray = new Tray(path.join(__dirname, '../src/Component/UI/Asset/img/pathfinder_icon.ico'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '열기', click: () => {
                mainWindow.show()
            }
        },
        {
            label: '종료', click: () => {
                app.quit()
            }
        },
    ])
    tray.setToolTip('Pathfinder')
    tray.setContextMenu(contextMenu)


    mainWindow.on('closed', (event) => {
        event.preventDefault()
        mainWindow.hide()
    })

    mainWindow.on('minimize', (event) => {
        event.preventDefault();
        mainWindow.hide();
    });
}

app.on('ready', createWindow)

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})