const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );
    //Open DevTools
    //mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
};

app.on('ready', createWindow)

app.on('window-all-closed', function(){
  if(mainWindow === null) createWindow()
})