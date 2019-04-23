import { app, session, shell, nativeImage, ipcMain, BrowserWindow, Tray } from 'electron';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

const BASE_URL = 'https://una.io/'; // 'http://hihi.una.io/'; 
const TEMPLATE = 'protean';

let tray;
let win;

function createWindow () {  

    // set user agent
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
      details.requestHeaders['User-Agent'] = 'UNAMobileApp/Desktop (' + process.platform + ')';
      callback({ cancel: false, requestHeaders: details.requestHeaders });
    });
    
    // create window
    win = new BrowserWindow({ 
        width: 800, 
        minWidth: 320, 
        height: 600, 
        minHeight: 480,
        icon: __dirname + '/../res/AppIcon.png', // for win and linux only
    });

    // make external links to open in default browser
    win.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        shell.openExternal(url);
    });
    
    win.loadURL(`${BASE_URL}?skin=${TEMPLATE}`);
    // win.webContents.openDevTools();

	tray = new Tray(__dirname + '/../res/tray.png');
	tray.setTitle('UNA.IO Messenger');
	tray.setToolTip('UNA.IO Messenger (double-click - hide, click - focus)');
	tray.on('double-click', () => {
		win.isVisible() ? win.hide() : win.show()
	});
	tray.on('click', () => {
		if (win.isVisible()) {
			win.focus();
		} 
		else {
			win.show();
			win.focus();
		}
	});
}

ipcMain.on('message', (event, msg) => {    
    if (msg.bubbles && msg.bubbles['notifications-messenger'] && parseInt(msg.bubbles['notifications-messenger']) > 0) {
		let n = parseInt(msg.bubbles['notifications-messenger']);
        app.setBadgeCount(n);
		tray.setImage(__dirname + (n > 0 && n <= 3 ? '/../res/tray-' + n + '.png' : '/../res/tray-new.png'));
    } else {
        app.setBadgeCount(0);
		tray.setImage(__dirname + '/../res/tray.png');
    }
});

app.on('ready', createWindow);
