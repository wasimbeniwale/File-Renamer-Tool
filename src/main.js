'use strict';

// simple commit

var electron = require('electron');
var windowProperties = {
    width: 800,
    height: 600,
    icon:'www/icon/logo.png'
};

electron.app.on('ready', function () {
    var mainWindow = new electron.BrowserWindow(windowProperties);
    mainWindow.setMenu(null);
    // mainWindow.webContents.openDevTools();
    mainWindow.loadURL('file://' + __dirname + '/www/index.html');
});