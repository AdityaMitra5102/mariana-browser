const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  // Set system-wide proxy (for this session only)
  session.defaultSession.setProxy({
    proxyRules: 'http=localhost:8000;',
  }).then(() => {
    win.loadURL('http://local.mariana');
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
