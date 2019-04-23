import { app, session, shell, nativeImage, ipcMain, BrowserWindow } from 'electron';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

const BASE_URL = 'https://una.io/'; // 'http://hihi.una.io/'; 
const TEMPLATE = 'protean';

function createWindow () {  

    // set user agent
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
      details.requestHeaders['User-Agent'] = 'UNAMobileApp/Desktop (' + process.platform + ')';
      callback({ cancel: false, requestHeaders: details.requestHeaders });
    });
    
    // create window
    let win = new BrowserWindow({ 
        width: 800, 
        minWidth: 320, 
        height: 600, 
        minHeight: 480,
        icon: __dirname + '/res/AppIcon.png', // for win and linux only
    });

    // make external links to open in default browser
    win.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        shell.openExternal(url);
    });
    
    win.loadURL(`${BASE_URL}?skin=${TEMPLATE}`);
    //win.webContents.openDevTools();
}

ipcMain.on('message', (event, msg) => {    
    if (msg.bubbles && msg.bubbles['notifications-messenger']) {
        app.setBadgeCount(parseInt(msg.bubbles['notifications-messenger']));
    } else {
        app.setBadgeCount(0);
    }
});

app.on('ready', createWindow);
