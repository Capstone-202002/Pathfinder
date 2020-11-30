const {
    app,
    BrowserWindow,
    Tray,
    Menu,
    nativeImage
} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { Hidden } = require('@material-ui/core')
const { dlwatcher } = require('./DownloadWatcher')

let mainWindow
let tray = null
let isQuit

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        minHeight: 600,
        minWidth: 940,
        transparent: true,
        frame: false,
        titleBarStyle: 'hidden',
        // icon: path.join(__dirname, '../src/Component/Visualization/Asset/img/pathfinder_icon.ico'),
        icon: path.join(__dirname, 'pathfinder_icon.ico'),

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

    // System Tray에 아이콘 생성
    const iconPath = path.join(__dirname, 'pathfinder_icon.png');
    tray = new Tray(nativeImage.createFromPath(iconPath))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '열기', click: () => {
                mainWindow.show()
            }
        },
        {
            label: '종료', click: () => {
                isQuit = true
                app.quit()
            }
        },
    ])
    tray.setToolTip('Pathfinder')
    tray.setContextMenu(contextMenu)

    dlwatcher(mainWindow)


    mainWindow.on('closed', (event) => {
        if (!isQuit) {
            event.preventDefault();
            window.hide();
            event.returnValue = false;
        }
    })

    mainWindow.on('minimize', (event) => {
        event.preventDefault();
        mainWindow.hide();
    });
}

app.on("before-quit", () => {
    isQuit = true
})

app.on('ready', createWindow)
process.noAsar = true
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