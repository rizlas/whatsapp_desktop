'use strict';

const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

const USER_AGENT =
  'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:149.0) Gecko/20100101 Firefox/149.0';

// Italian locale for Chromium
app.commandLine.appendSwitch('lang', 'it');

// Enforce single instance
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  process.exit(0);
}

function createWindow() {
  // extraResources puts icon.png at resources/icon.png (outside the asar).
  const iconPath = app.isPackaged
    ? path.join(process.resourcesPath, 'icon.png')
    : path.join(__dirname, '..', 'custom', 'icon.png');

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: iconPath,
    title: 'WhatsApp',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      spellcheck: true,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // ── Session-interaction IPC (spellchecker) ──────────────────────────────────
  ipcMain.on('session-interaction', (event, request) => {
    const ses = event.sender.session;
    const reply = { id: request.id };

    try {
      switch (request.id) {
        case 'isSpellCheckerEnabled':
          reply.value = ses.spellCheckerEnabled;
          break;
        case 'setSpellCheckerEnabled':
          ses.spellCheckerEnabled = request.propertyValue;
          reply.value = ses.spellCheckerEnabled;
          break;
        case 'availableSpellCheckerLanguages':
          reply.value = ses.availableSpellCheckerLanguages;
          break;
        case 'setSpellCheckerLanguages':
          ses.setSpellCheckerLanguages(request.funcArgs[0]);
          reply.value = true;
          break;
        default:
          console.warn('[main] Unknown session-interaction id:', request.id);
          reply.error = `Unknown id: ${request.id}`;
      }
    } catch (err) {
      console.error('[main] session-interaction error:', err.message);
      reply.error = err.message;
    }

    event.reply('session-interaction-reply', reply);
  });

  // ── Permissions ─────────────────────────────────────────────────────────────
  win.webContents.session.setPermissionRequestHandler((_wc, permission, callback) => {
    callback(permission === 'notifications');
  });

  // ── User-agent ───────────────────────────────────────────────────────────────
  win.webContents.session.setUserAgent(USER_AGENT);

  // ── Navigation guard ─────────────────────────────────────────────────────────
  win.webContents.on('will-navigate', (event, url) => {
    const allowed = ['https://web.whatsapp.com/', 'https://www.whatsapp.com/'];
    if (!allowed.some((prefix) => url.startsWith(prefix))) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.loadURL('https://web.whatsapp.com/', { userAgent: USER_AGENT });

  return win;
}

app.whenReady().then(() => {
  const win = createWindow();

  app.on('second-instance', () => {
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
